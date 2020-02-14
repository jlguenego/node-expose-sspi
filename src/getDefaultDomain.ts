import sspi = require("../lib/sspi");

export const getDefaultDomain = () => {
  const str = sspi.GetUserNameEx("NameSamCompatible");
  const domain = str.split("\\")[0];
  return domain;
};

