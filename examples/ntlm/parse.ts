import { encode } from 'base64-arraybuffer';
import {
  AcquireCredHandleInput,
  InitializeSecurityContextInput,
  sspi,
} from '../..';
import { hexDump } from '../../dist/sso/misc';
import { negotiateParse } from '../../src/sso/msgParser';

const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
console.log('packageInfo: ', packageInfo);

const credInput = {
  packageName: packageInfo.Name,
  credentialUse: 'SECPKG_CRED_OUTBOUND',
} as AcquireCredHandleInput;
credInput.authData = {
  domain: 'chouchou',
  user: 'jlouis',
  password: 'toto',
};
console.log('credInput: ', credInput);
const clientCred = sspi.AcquireCredentialsHandle(credInput);
console.log('clientCred: ', clientCred);

const input: InitializeSecurityContextInput = {
  credential: clientCred.credential,
  targetName: 'http/CHOUCHOU',
  contextReq: ['ISC_REQ_CONNECTION', 'ISC_REQ_CONFIDENTIALITY'],
  targetDataRep: 'SECURITY_NETWORK_DREP',
  cbMaxToken: packageInfo.cbMaxToken,
  isFirstCall: true,
};

console.log('input: ', input);
const clientSecurityContext = sspi.InitializeSecurityContext(input);
console.log('clientSecurityContext: ', clientSecurityContext);
console.log(hexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
const base64 = encode(clientSecurityContext.SecBufferDesc.buffers[0]);
console.log('base64: ', base64);
const debugObject = negotiateParse(base64);
console.log('debugObject: ', debugObject);
