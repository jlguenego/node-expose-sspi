import { sspi, sysinfo, adsi } from '../../lib/api';
import { IADsContainer, IDirectorySearch, IDispatch } from '../../lib/adsi';

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
  let gc: IADsContainer;
  let element: IDispatch;
  let ds: IDirectorySearch;

  try {
    adsi.CoInitialize();
    gc = adsi.ADsOpenObjectSync<IADsContainer>({
      binding: 'GC:',
      riid: 'IID_IADsContainer',
    });
    element = gc.Next();
    ds = element.QueryInterface('IID_IDirectorySearch');
  } catch (e) {
    return false;
  } finally {
    ds?.Release();
    element?.Release();
    gc?.Release();
    adsi.CoUninitialize();
  }
  return true;
}
