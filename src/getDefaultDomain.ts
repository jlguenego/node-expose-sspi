import sspi = require("../lib/sspi");

/**
 * Get the domain (Microsoft domain) or hostname (workgroup) of this machine.
 *
 * @returns {string} domain name
 */
export function getDefaultDomain(): string {
  const str = sspi.GetUserNameEx("NameSamCompatible");
  const domain = str.split("\\")[0];
  return domain;
};

