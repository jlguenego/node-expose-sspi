import { sspi, CtxtHandle } from '../lib/api';
import { getUser } from './userdb';
import dbg from 'debug';
import { sso } from '.';
import os from 'os';
import { AuthOptions, User } from './interfaces';

const debug = dbg('node-expose-sspi:SSO');

export type SSOMethod = 'NTLM' | 'Kerberos';

export class SSO {
  user: User;
  owner: User;
  private options: AuthOptions = {
    useActiveDirectory: true,
    useGroups: true,
    useOwner: true,
  };

  constructor(
    private serverContextHandle: CtxtHandle,
    public method?: SSOMethod
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
      this.user.displayName = this.user.name;
    }
    sspi.RevertSecurityContext(this.serverContextHandle);

    if (this.options.useGroups) {
      const groups = sspi.GetTokenInformation(userToken, 'TokenGroups');
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
        this.owner.displayName = this.owner.name;
      }

      if (this.options.useGroups) {
        const processToken = sspi.OpenProcessToken([
          'TOKEN_QUERY',
          'TOKEN_QUERY_SOURCE',
        ]);
        const ownerGroups = sspi.GetTokenInformation(
          processToken,
          'TokenGroups'
        );
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

  getJSON(): SSO {
    const json = { ...this };
    delete json.options;
    delete json.serverContextHandle;
    return json;
  }

  setOptions(options: AuthOptions): void {
    Object.assign(this.options, options);
  }
}
