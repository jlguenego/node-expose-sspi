import { printHexDump, trace } from "./misc";
import sspi = require("../lib/sspi");
import { SSO } from "./SSO";

export const createSSO = (serverContextHandle: sspi.CtxtHandle) => {
  const sso: SSO = {};
  const names = sspi.QueryContextAttributes(
    serverContextHandle,
    "SECPKG_ATTR_NAMES"
  );
  const [domain, name] = names.sUserName.split("\\");
  sso.user = { domain, name };

  // impersonate to retrieve the userToken.
  sspi.ImpersonateSecurityContext(serverContextHandle);
  trace("impersonate security context ok");
  const userToken = sspi.OpenThreadToken();
  trace("userToken: ", userToken);
  try {
    sso.user.displayName = sspi.GetUserNameEx("NameDisplay");
  } catch (e) {
    sso.user.displayName = sso.user.name;
  }
  sspi.RevertSecurityContext(serverContextHandle);

  const groups = sspi.GetTokenInformation(userToken, "TokenGroups");
  trace("groups: ", groups);
  sso.user.groups = groups;

  // free the userToken
  sspi.CloseHandle(userToken);

  const { sid } = sspi.LookupAccountName(names.sUserName);
  sso.user.sid = sid;

  // owner info.
  const owner = sspi.GetUserName();
  trace("owner: ", owner);
  sso.owner = { name: owner };
  try {
    sso.owner.displayName = sspi.GetUserNameEx("NameDisplay");
  } catch (e) {
    sso.owner.displayName = sso.owner.name;
  }

  const processToken = sspi.OpenProcessToken([
    "TOKEN_QUERY",
    "TOKEN_QUERY_SOURCE"
  ]);
  const ownerGroups = sspi.GetTokenInformation(processToken, "TokenGroups");
  trace("ownerGroups: ", ownerGroups);
  sso.owner.groups = ownerGroups;
  sspi.CloseHandle(processToken);

  try {
    const { sid, domain } = sspi.LookupAccountName(owner);
    sso.owner.sid = sid;
    sso.owner.domain = domain;
  } catch (e) {}
  return sso;
};
