import { sspi, CtxtHandle, Groups } from '../../lib/api';
import { getUser } from './userdb';
import dbg from 'debug';
import { sso } from '.';
import os from 'os';
import { User, SSOMethod, SSOObject, SSOOptions } from './interfaces';
const { impersonateLoggedOnUser} = require('F:\\Apps\\ng\\angular-sso-example\\back\\build\\Release\\users.node');


const debug = dbg('node-expose-sspi:SSO');

export class SSO {
  user!: User;
  owner!: User;
  private options: SSOOptions = {
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
    ) as { sUserName: string };
    const [domain, name] = names.sUserName.split('\\');
    this.user = { domain, name };

    // impersonate to retrieve the used access token.
    sspi.ImpersonateSecurityContext(this.serverContextHandle);
    debug('impersonate security context ok');
    const userToken = sspi.OpenThreadToken();
    debug('userToken: ', userToken);
    try {
      debug('about to do GetUserNameEx');
      this.user.displayName = sspi.GetUserNameEx('NameDisplay')
    } catch (e) {
      // exemple of error scenario: local user without displayname.
      this.user.displayName = this.user.name;
	  
    }
    debug('userToken: ', userToken);
    /*try {
      debug('about to do impersonateLoggedOnUser');
	  impersonateLoggedOnUser(userToken);
    } catch (e) {
      // exemple of error scenario: local user without displayname.
      console.error('cannot impersonate %o', e);
	  
    }*/
    //debug('about to do RevertSecurityContext');
    //sspi.RevertSecurityContext(this.serverContextHandle);

    this.user.accessToken = userToken;
	(this.user as any).serverContextHandle = this.serverContextHandle;

    /*debug('this.options.useGroups: ', this.options.useGroups);
    if (this.options.useGroups) {
      debug('about to do GetTokenInformation');
      const groups = sspi.GetTokenInformation({
        accessToken: userToken,
        tokenInformationClass: 'TokenGroups',
        filter: this.options.groupFilterRegex,
      }) as Groups;
      groups.sort();
      debug('groups: ', groups);
      this.user.groups = groups;
    }*/

    // free the userToken
    // debug('about to do CloseHandle');
    // sspi.CloseHandle(userToken);

    debug('about to do LookupAccountName');
    const { sid } = sspi.LookupAccountName(names.sUserName);
    this.user.sid = sid;

    try {
      debug('about to do isOnDomain and isActiveDirectoryReachable');
      if (
        sso.isOnDomain() &&
        sso.isActiveDirectoryReachable() &&
        os.hostname() !== domain &&
        this.options.useActiveDirectory
      ) {
        debug('about to do getUser');
        const adUser = await getUser(`(sAMAccountName=${name})`);
        this.user.adUser = adUser;
      }
    } catch (e) {
      debug('cannot getUser from AD. e: ', e);
    }

    // owner info.
    debug('this.options.useOwner: ', this.options.useOwner);
    if (this.options.useOwner) {
      debug('about to do GetUserName');
      const owner = sspi.GetUserName();
      debug('owner: ', owner);
      this.owner = { name: owner };
      try {
        debug('about to do GetUserNameEx');
        this.owner.displayName = sspi.GetUserNameEx('NameDisplay');
      } catch (e) {
        // exemple of error scenario: local user without displayname.
        this.owner.displayName = this.owner.name;
      }

      debug('this.options.useGroups: ', this.options.useGroups);
      if (this.options.useGroups) {
        debug('about to do OpenProcessToken');
        const processToken = sspi.OpenProcessToken([
          'TOKEN_QUERY',
          'TOKEN_QUERY_SOURCE',
        ]);
        /*debug('about to do GetTokenInformation');
        const ownerGroups = sspi.GetTokenInformation({
          accessToken: processToken,
          tokenInformationClass: 'TokenGroups',
          filter: this.options.groupFilterRegex,
        }) as Groups;
        ownerGroups.sort();
        debug('ownerGroups: ', ownerGroups);
        this.owner.groups = ownerGroups;*/
        //debug('about to do CloseHandle');
        //sspi.CloseHandle(processToken);
      }

      try {
        debug('about to do LookupAccountName');
        const o = sspi.LookupAccountName(owner);
        this.owner.sid = o.sid;
        this.owner.domain = o.domain;
      } catch (e) {
        debug('error: ', e);
      }
      debug('SSO end.');
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

  setOptions(options: Partial<SSOOptions>): void {
    this.options = { ...this.options, ...options };
  }
}
