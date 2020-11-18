import { AcquireCredHandleInput, sspi } from '../..';

const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
console.log('packageInfo: ', packageInfo);

const credInput = {
  packageName: packageInfo.Name,
  credentialUse: 'SECPKG_CRED_OUTBOUND',
} as AcquireCredHandleInput;
// credInput.authData = {
//   domain: 'CHOUCHOU',
//   user: 'jlouis',
//   password: 'toto',
// };
console.log('credInput: ', credInput);
const clientCred = sspi.AcquireCredentialsHandle(credInput);
console.log('clientCred: ', clientCred);
