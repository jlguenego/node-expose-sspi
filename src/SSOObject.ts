import { printHexDump, trace } from "./misc";
import sspi = require("../lib/sspi");

export interface User {
  name?: string;
  sid?: string;
  displayName?: string;
  domain?: string;
  groups?: string[];
}

export type SSOMethod = "NTLM" | "Kerberos";

export class SSOObject {
  user: User;
  owner: User;

  constructor(serverContextHandle: sspi.CtxtHandle, public method?: SSOMethod) {
    const names = sspi.QueryContextAttributes(
      serverContextHandle,
      "SECPKG_ATTR_NAMES"
    );
    const [domain, name] = names.sUserName.split("\\");
    this.user = { domain, name };
  
    // impersonate to retrieve the userToken.
    sspi.ImpersonateSecurityContext(serverContextHandle);
    trace("impersonate security context ok");
    const userToken = sspi.OpenThreadToken();
    trace("userToken: ", userToken);
    try {
      this.user.displayName = sspi.GetUserNameEx("NameDisplay");
    } catch (e) {
      this.user.displayName = this.user.name;
    }
    sspi.RevertSecurityContext(serverContextHandle);
  
    const groups = sspi.GetTokenInformation(userToken, "TokenGroups");
    trace("groups: ", groups);
    this.user.groups = groups;
  
    // free the userToken
    sspi.CloseHandle(userToken);
  
    const { sid } = sspi.LookupAccountName(names.sUserName);
    this.user.sid = sid;
  
    // owner info.
    const owner = sspi.GetUserName();
    trace("owner: ", owner);
    this.owner = { name: owner };
    try {
      this.owner.displayName = sspi.GetUserNameEx("NameDisplay");
    } catch (e) {
      this.owner.displayName = this.owner.name;
    }
  
    const processToken = sspi.OpenProcessToken([
      "TOKEN_QUERY",
      "TOKEN_QUERY_SOURCE"
    ]);
    const ownerGroups = sspi.GetTokenInformation(processToken, "TokenGroups");
    trace("ownerGroups: ", ownerGroups);
    this.owner.groups = ownerGroups;
    sspi.CloseHandle(processToken);
  
    try {
      const { sid, domain } = sspi.LookupAccountName(owner);
      this.owner.sid = sid;
      this.owner.domain = domain;
    } catch (e) {}
  }
}

