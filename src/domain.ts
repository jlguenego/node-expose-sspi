import { sspi, sysinfo, adsi } from '../lib/api';

/**
 * Get the domain (Microsoft domain) or hostname (workgroup) of this machine.
 *
 * @returns {string} domain name
 */
export function getDefaultDomain(): string {
  const str = sspi.GetUserNameEx('NameSamCompatible');
  const domain = str.split('\\')[0];
  return domain;
}

/**
 * Want to know if your computer has joined a Microsoft Windows domain ?
 *
 * @export
 * @returns {boolean} true if this computer joined a domain, false otherwise.
 */
export function isOnDomain(): boolean {
  return sysinfo.GetComputerNameEx('ComputerNameDnsDomain').length > 0;
}

export function isActiveDirectoryReachable(): boolean {
  try {
    adsi.ADsOpenObjectSync({
      binding: 'GC:',
      riid: 'IID_IADsContainer',
    });
  } catch (e) {
    return false;
  }
  return true;
}
