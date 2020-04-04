import fetch, { RequestInit, Response } from 'node-fetch';
import { sspi, InitializeSecurityContextInput } from '../lib/api';
import { encode, decode } from 'base64-arraybuffer';
import dbg from 'debug';
import { CookieList } from './interfaces';

const debug = dbg('node-expose-sspi:client');

export class Client {
  private cookieList: CookieList = {};

  saveCookies(response: Response): void {
    response.headers.forEach((value, name) => {
      if (name !== 'Set-Cookie'.toLowerCase()) {
        return;
      }
      // parse something like <key>=<val>[; Expires=xxxxx;]
      const [key, val] = value.split(/[=;]/g);
      debug('val: ', val);
      debug('key: ', key);
      this.cookieList[key] = val;
    });
    debug('cookieList: ', this.cookieList);
  }

  restituteCookies(requestInit: RequestInit): void {
    const cookieStr = Object.keys(this.cookieList)
      .map((key) => key + '=' + this.cookieList[key])
      .join('; ');
    Object.assign(requestInit.headers, { cookie: cookieStr });
  }

  async fetch(resource: string, init?: RequestInit): Promise<Response> {
    const response = await fetch(resource, init);
    const result = await this.handleAuth(response, resource, init);
    return result;
  }

  async handleAuth(
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('handleAuth: start. headers', response.headers);

    // has cookies ?
    this.saveCookies(response);

    if (!response.headers.has('www-authenticate')) {
      debug('no header www-authenticate');
      return response;
    }
    if (!response.headers.get('www-authenticate').startsWith('Negotiate')) {
      debug(
        'no header www-authenticate with Negotiate:',
        response.headers.get('www-authenticate')
      );
      return response;
    }
    if (response.status !== 401) {
      debug('no status 401');
      return response;
    }

    debug('starting negotiate auth');

    const clientCred = sspi.AcquireCredentialsHandle({
      packageName: 'Negotiate',
      credentialUse: 'SECPKG_CRED_OUTBOUND',
    });
    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    let input: InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName: 'kiki',
      cbMaxToken: packageInfo.cbMaxToken,
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    let clientSecurityContext = sspi.InitializeSecurityContext(input);
    // encode to Base64 and send via HTTP
    let base64 = encode(clientSecurityContext.SecBufferDesc.buffers[0]);
    let requestInit: RequestInit = { ...init };
    requestInit.headers = {
      ...init.headers,
      Authorization: 'Negotiate ' + base64,
    };
    // cookies case
    this.restituteCookies(requestInit);
    response = await fetch(resource, requestInit);
    while (
      response.headers.has('www-authenticate') &&
      response.status === 401 &&
      response.headers.get('www-authenticate').startsWith('Negotiate ')
    ) {
      const buffer = decode(
        response.headers.get('www-authenticate').substring('Negotiate '.length)
      );
      input = {
        credential: clientCred.credential,
        targetName: 'kiki',
        cbMaxToken: packageInfo.cbMaxToken,
        serverSecurityContext: {
          SecBufferDesc: {
            ulVersion: 0,
            buffers: [buffer],
          },
        },
        contextHandle: clientSecurityContext.contextHandle,
        targetDataRep: 'SECURITY_NATIVE_DREP',
      };
      clientSecurityContext = sspi.InitializeSecurityContext(input);
      base64 = encode(clientSecurityContext.SecBufferDesc.buffers[0]);
      requestInit = { ...init };
      requestInit.headers = {
        ...init.headers,
        Authorization: 'Negotiate ' + base64,
      };
      this.restituteCookies(requestInit);
      response = await fetch(resource, requestInit);
    }
    debug('handleAuth: end');
    return response;
  }
}

