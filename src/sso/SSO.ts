import { sspi, CtxtHandle } from '../../lib/api';
import { getUser } from './userdb';
import dbg from 'debug';
import { sso } from '.';
import os from 'os';
import { AuthOptions, User, SSOMethod, SSOObject } from './interfaces';

const debug = dbg('node-expose-sspi:SSO');

export class SSO {
  user!: User;
  owner!: User;
  private options: AuthOptions = {
    useActiveDirectory: true,
    useGroups: true,
    useOwner: true,
    groupFilterRegex: '.*',
  };

  constructor(
    private serverContextHandle: CtxtHandle,
    public method: SSOMethod
  ) {}

  async load(): Promise<void> {
    const names = sspi.QueryContextAttributes(
      this.serverContextHandle,
      'SECPKG_ATTR_NAMES'
    );
    const [domain, name] = names.sUserName.split('\\');
    this.user = { domain, name };

    // impersonate to retrieve the userToken.
    sspi.ImpersonateSecurityContext(this.serverContextHandle);
    debug('impersonate security context ok');
    const userToken = sspi.OpenThreadToken();
    debug('userToken: ', userToken);
    try {
      this.user.displayName = sspi.GetUserNameEx('NameDisplay');
    } catch (e) {
      // exemple of error scenario: local user without displayname.
      this.user.displayName = this.user.name;
    }
    sspi.RevertSecurityContext(this.serverContextHandle);

    if (this.options.useGroups) {
      const groups = sspi.GetTokenInformation({
        accessToken: userToken,
        tokenInformationClass: 'TokenGroups',
        filter: this.options.groupFilterRegex,
      });
      groups.sort();
      debug('groups: ', groups);
      this.user.groups = groups;
    }

    // free the userToken
    sspi.CloseHandle(userToken);

    const { sid } = sspi.LookupAccountName(names.sUserName);
    this.user.sid = sid;

    try {
      if (
        sso.isOnDomain() &&
        sso.isActiveDirectoryReachable() &&
        os.hostname() !== domain &&
        this.options.useActiveDirectory
      ) {
        const adUser = await getUser(`(sAMAccountName=${name})`);
        this.user.adUser = adUser;
      }
    } catch (e) {
      debug('cannot getUser from AD. e: ', e);
    }

    // owner info.
    if (this.options.useOwner) {
      const owner = sspi.GetUserName();
      debug('owner: ', owner);
      this.owner = { name: owner };
      try {
        this.owner.displayName = sspi.GetUserNameEx('NameDisplay');
      } catch (e) {
        // exemple of error scenario: local user without displayname.
        this.owner.displayName = this.owner.name;
      }

      if (this.options.useGroups) {
        const processToken = sspi.OpenProcessToken([
          'TOKEN_QUERY',
          'TOKEN_QUERY_SOURCE',
        ]);
        const ownerGroups = sspi.GetTokenInformation({
          accessToken: processToken,
          tokenInformationClass: 'TokenGroups',
          filter: this.options.groupFilterRegex,
        });
        ownerGroups.sort();
        debug('ownerGroups: ', ownerGroups);
        this.owner.groups = ownerGroups;
        sspi.CloseHandle(processToken);
      }

      try {
        const o = sspi.LookupAccountName(owner);
        this.owner.sid = o.sid;
        this.owner.domain = o.domain;
      } catch (e) {}
    }
  }

  getJSON(): SSOObject {
    const json: SSOObject = { method: this.method };
    if (this.user) {
      json.user = this.user;
    }
    if (this.owner) {
      json.owner = this.owner;
    }
    return json;
  }

  setOptions(options: AuthOptions): void {
    Object.assign(this.options, options);
  }
}
