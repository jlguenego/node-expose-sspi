import { encode, decode } from 'base64-arraybuffer';
import dbg from 'debug';
import fetch, { RequestInit, Response } from 'node-fetch';
import { negotiateParse } from '../msgParser';

import {
  sspi,
  InitializeSecurityContextInput,
  AcquireCredHandleInput,
} from '../../../lib/api';
import { getSPNFromURI } from './misc';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';
import { AbstractHandler } from './AbstractHandler';
import { hexDump } from '../misc';

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
    const packageInfo = sspi.QuerySecurityPackageInfo(clientInfo.ssp);
    debug('packageInfo: ', packageInfo);

    const credInput = {
      packageName: packageInfo.Name,
      credentialUse: 'SECPKG_CRED_OUTBOUND',
    } as AcquireCredHandleInput;
    if (clientInfo.user) {
      credInput.authData = {
        domain: clientInfo.domain,
        user: clientInfo.user,
        password: clientInfo.password,
      };
    }
    debug('credInput: ', credInput);
    const clientCred = sspi.AcquireCredentialsHandle(credInput);

    const targetName =
      clientInfo.targetName === undefined
        ? await getSPNFromURI(resource)
        : clientInfo.targetName;
    debug('targetName: ', targetName);
    const input: InitializeSecurityContextInput = {
      isFirstCall: true,
      credential: clientCred.credential,
      targetName,
      contextReq: [
        'ISC_REQ_CONNECTION',
        'ISC_REQ_CONFIDENTIALITY',
        'ISC_REQ_MUTUAL_AUTH',
        'ISC_REQ_REPLAY_DETECT',
      ],
      cbMaxToken: packageInfo.cbMaxToken,
      targetDataRep: 'SECURITY_NATIVE_DREP',
    };
    let clientSecurityContext;
    while (
      response.headers.has('www-authenticate') &&
      response.status === 401 &&
      response.headers.get('www-authenticate')?.startsWith('Negotiate')
    ) {
      const wwwAuthenticateHeader = response.headers.get(
        'www-authenticate'
      ) as string;
      debug('wwwAuthenticateHeader: ', wwwAuthenticateHeader);
      if (clientSecurityContext) {
        if (!wwwAuthenticateHeader.startsWith('Negotiate ')) {
          break;
        }
        const bufferStr = wwwAuthenticateHeader
          .split(',')[0]
          .substr('Negotiate '.length);
        debug('bufferStr: ', bufferStr);
        const responseToken = negotiateParse(bufferStr);
        debug('responseToken: ', responseToken);
        const buffer = decode(bufferStr);
        input.SecBufferDesc = {
          ulVersion: 0,
          buffers: [buffer],
        };
        input.contextHandle = clientSecurityContext.contextHandle;
        input.isFirstCall = false;
      }

      debug('input: ', input);
      clientSecurityContext = sspi.InitializeSecurityContext(input);
      debug('clientSecurityContext: ', clientSecurityContext);
      debug(hexDump(clientSecurityContext.SecBufferDesc.buffers[0]));
      if (
        ['SEC_I_COMPLETE_NEEDED', 'SEC_I_COMPLETE_AND_CONTINUE'].includes(
          clientSecurityContext.SECURITY_STATUS
        )
      ) {
        debug('you should not see this');
      }
      const base64 = encode(clientSecurityContext.SecBufferDesc.buffers[0]);
      const debugObject = negotiateParse(base64);
      debug('debugObject: ', debugObject);
      const requestInit = { ...init };
      requestInit.headers = {
        ...init.headers,
        Authorization: 'Negotiate ' + base64,
      };
      clientCookie.restituteCookies(requestInit);
      debug('requestInit.headers', requestInit.headers);
      response = await fetch(resource, requestInit);
      debug('response.status', response.status);
      debug('response.headers', response.headers);
      clientCookie.saveCookies(response);
    }
    debug('handleAuth: end');
    return response;
  }
}
