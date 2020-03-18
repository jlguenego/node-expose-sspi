import fetch from 'node-fetch';
import sspi from '../lib/sspi'

class Client {
  async fetch(url: string) {
    console.log('starting get', url);
    const response = await fetch(url);
    console.log('response: ', response);
    // response.headers.forEach((value, name) => console.log(name, value));
    if (response.headers.has('www-authenticate')) {
      if (response.status === 401 && response.headers.get('www-authenticate').startsWith('Negotiate')) {
        console.log('Negotiate protocol starts');
        const clientCred = sspi.AcquireCredentialsHandle({
          packageName: "Negotiate",
          credentialUse: "SECPKG_CRED_OUTBOUND"
        });
        console.log('clientCred: ', clientCred);
      }
    }
    return response;
  }
}

export const client = new Client();
