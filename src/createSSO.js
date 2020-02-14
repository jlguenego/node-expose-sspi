"use strict";
exports.__esModule = true;
var misc_1 = require("../src/misc");
var sspi = require("../lib/sspi");
exports.createSSO = function (serverContextHandle) {
    var sso = {};
    var names = sspi.QueryContextAttributes(serverContextHandle, "SECPKG_ATTR_NAMES");
    var _a = names.sUserName.split("\\"), domain = _a[0], name = _a[1];
    sso.user = { domain: domain, name: name };
    // impersonate to retrieve the userToken.
    sspi.ImpersonateSecurityContext(serverContextHandle);
    misc_1.trace("impersonate security context ok");
    var userToken = sspi.OpenThreadToken();
    misc_1.trace("userToken: ", userToken);
    try {
        sso.user.displayName = sspi.GetUserNameEx("NameDisplay");
    }
    catch (e) {
        sso.user.displayName = sso.user.name;
    }
    sspi.RevertSecurityContext(serverContextHandle);
    var groups = sspi.GetTokenInformation(userToken, "TokenGroups");
    misc_1.trace("groups: ", groups);
    sso.user.groups = groups;
    // free the userToken
    sspi.CloseHandle(userToken);
    var sid = sspi.LookupAccountName(names.sUserName).sid;
    sso.user.sid = sid;
    // owner info.
    var owner = sspi.GetUserName();
    misc_1.trace("owner: ", owner);
    sso.owner = { name: owner };
    try {
        sso.owner.displayName = sspi.GetUserNameEx("NameDisplay");
    }
    catch (e) {
        sso.owner.displayName = sso.owner.name;
    }
    var processToken = sspi.OpenProcessToken([
        "TOKEN_QUERY",
        "TOKEN_QUERY_SOURCE"
    ]);
    var ownerGroups = sspi.GetTokenInformation(processToken, "TokenGroups");
    misc_1.trace("ownerGroups: ", ownerGroups);
    sso.owner.groups = ownerGroups;
    sspi.CloseHandle(processToken);
    try {
        var _b = sspi.LookupAccountName(owner), sid_1 = _b.sid, domain_1 = _b.domain;
        sso.owner.sid = sid_1;
        sso.owner.domain = domain_1;
    }
    catch (e) { }
    return sso;
};
