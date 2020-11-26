import { sso } from './index';
import { Props } from './interfaces';

export function getStatusInfo() {
  try {
    const result = {
      adminPrivileges: sso.hasAdminPrivileges(),
      isOnDomain: sso.isOnDomain(),
      domain: sso.getDefaultDomain(),
    } as Props;
    if (sso.isOnDomain()) {
      result.isActiveDirectoryReachable = sso.isActiveDirectoryReachable();
    }
    return result;
  } catch (e) {
    return {
      error: e,
    };
  }
}
