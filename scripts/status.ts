import { sso } from '../src/sso';

console.log('Has admin privileges: ', sso.hasAdminPrivileges());
console.log('Is joined to a domain: ', sso.isOnDomain());
console.log('Domain name: ', sso.getDefaultDomain());
if (sso.isOnDomain()) {
  console.log('Controller reachable: ', sso.isActiveDirectoryReachable());
}
