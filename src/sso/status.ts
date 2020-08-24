import { sso } from './index';

export function getStatusInfo(): any {
  const result = {
    adminPrivileges: sso.hasAdminPrivileges(),
    isOnDomain: sso.isOnDomain(),
    domain: sso.getDefaultDomain(),
  } as any;
  if (sso.isOnDomain()) {
    result.isActiveDirectoryReachable = sso.isActiveDirectoryReachable();
  }
  return result;
}
