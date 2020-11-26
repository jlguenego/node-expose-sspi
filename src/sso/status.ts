import { Props } from '../../lib/api';
import { sso } from './index';

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
