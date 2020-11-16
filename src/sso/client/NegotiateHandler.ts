import { encode, decode } from 'base64-arraybuffer';
import dbg from 'debug';
import fetch, { RequestInit, Response } from 'node-fetch';

import {
  sspi,
  InitializeSecurityContextInput,
  AcquireCredHandleInput,
} from '../../../lib/api';
import { getSPNFromURI } from './misc';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';
import { AbstractHandler } from './AbstractHandler';

const debug = dbg('node-expose-sspi:client');

export class NegotiateHandler extends AbstractHandler {
  async handle(
    clientInfo: ClientInfo,
    clientCookie: ClientCookie,
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('starting negotiate auth');
    const credInput = {
      packageName: clientInfo.ssp,
      credentialUse: 'SECPKG_CRED_OUTBOUND',
    } as AcquireCredHandleInput;
    if (clientInfo.user) {
      credInput.authData = {
        domain: clientInfo.domain,
        user: clientInfo.user,
        password: clientInfo.password,
      };
    }
    const clientCred = sspi.AcquireCredentialsHandle(credInput);

    const packageInfo = sspi.QuerySecurityPackageInfo(clientInfo.ssp);
    const targetName = clientInfo.targetName || (await getSPNFromURI(resource));
    let input: InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName,
      cbMaxToken: packageInfo.cbMaxToken,
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    debug('input: ', input);
    let clientSecurityContext = sspi.InitializeSecurityContext(input);
    // encode to Base64 and send via HTTP
    let base64 = encode(clientSecurityContext.SecBufferDesc.buffers[0]);
    let requestInit: RequestInit = { ...init };
    requestInit.headers = {
      ...init.headers,
      Authorization: clientInfo.ssp + ' ' + base64,
    };
    // cookies case
    clientCookie.restituteCookies(requestInit);
    debug('first requestInit.headers', requestInit.headers);
    response = await fetch(resource, requestInit);
    debug('first response.headers', response.headers);
    clientCookie.saveCookies(response);
    while (
      response.headers.has('www-authenticate') &&
      response.status === 401 &&
      response.headers.get('www-authenticate')?.startsWith('Negotiate ')
    ) {
      const buffer = decode(
        (response.headers.get('www-authenticate') as string).substring(
          'Negotiate '.length
        )
      );
      input = {
        credential: clientCred.credential,
        targetName,
        cbMaxToken: packageInfo.cbMaxToken,
        SecBufferDesc: {
          ulVersion: 0,
          buffers: [buffer],
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
      clientCookie.restituteCookies(requestInit);
      debug('other requestInit.headers', requestInit.headers);
      response = await fetch(resource, requestInit);
      debug('other response.headers', response.headers);
      clientCookie.saveCookies(response);
    }
    debug('handleAuth: end');
    return response;
  }
}
