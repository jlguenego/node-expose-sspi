import { sso } from '../src/sso';

console.log('domain: ', sso.isOnDomain());
console.log('domain name: ', sso.getDefaultDomain());
if (sso.isOnDomain()) {
  console.log('controller reachable: ', sso.isActiveDirectoryReachable());
}
