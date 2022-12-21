import { sso } from './index';
import { SPNRecord } from './spn';

interface StatusInfo {
  adminPrivileges: boolean;
  isOnDomain: boolean;
  domain: string;
  isActiveDirectoryReachable: boolean;
  spns: SPNRecord[];
  error: string;
}

export async function getStatusInfo(context?: {
  kerberosMsg: string;
}): Promise<Partial<StatusInfo>> {
  try {
    const result = {
      adminPrivileges: sso.hasAdminPrivileges(),
      isOnDomain: sso.isOnDomain(),
      domain: sso.getDefaultDomain(),
    } as StatusInfo;
    if (!result.isOnDomain) {
      return result;
    }
    result.isActiveDirectoryReachable = sso.isActiveDirectoryReachable();
    if (!result.isActiveDirectoryReachable) {
      return result;
    }
    const ssoSPN = new sso.SPN();
    result.spns = await ssoSPN.getListAll();

    if (!context?.kerberosMsg) {
      return result;
    }
    // Get the SPN recorded in the kerberos message
    // const ClientSpn = getClientSPN(context?.kerberosMsg);
    // if (!allowedSpns.includes(spn)) {
    //   result.error = `spn (${spn}) not included in allowedSpn (${spns})`;
    // }
    return result;
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : (e as string);
    return {
      error: errorMsg,
    };
  }
}
