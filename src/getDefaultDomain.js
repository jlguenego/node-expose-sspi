"use strict";
exports.__esModule = true;
var sspi = require("../lib/sspi");
exports.getDefaultDomain = function () {
    var str = sspi.GetUserNameEx("NameSamCompatible");
    var domain = str.split("\\")[0];
    return domain;
};
