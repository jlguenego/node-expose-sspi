import dbg from 'debug';
import fetch, { RequestInit, Response } from 'node-fetch';
import { URL } from 'url';
import { Props } from '../../../lib/api';

import { AbstractHandler } from './AbstractHandler';
import { ClientCookie } from './ClientCookie';
import { ClientInfo } from './ClientInfo';
import { md5 } from './misc';

interface DigestChallenge {
  realm: string;
  qop: string;
  nonce: string;
  opaque?: string;
  algorithm: string;
}

interface DigestAnswer {
  username: string;
  realm: string;
  nonce: string;
  uri: string;
  algorithm: string;
  qop: string;
  nc: string;
  cnonce: string;
  response: string;
  opaque?: string;
}

const debug = dbg('node-expose-sspi:client');

// https://tools.ietf.org/html/rfc7616

export class DigestHandler extends AbstractHandler {
  async handle(
    clientInfo: ClientInfo,
    clientCookie: ClientCookie,
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('digest handler');
    // get the info from the WWW-Authenticate header.
    const digestHeader = response.headers
      .get('www-authenticate')
      ?.substring('Digest '.length);
    if (!digestHeader) {
      return response;
    }

    debug('digestHeader: ', digestHeader);
    const digestChallenge = (digestHeader.split(/, */).reduce((acc, prop) => {
      const [key, value] = prop.split('=');
      acc[key] = value.replace(/^"?(.*?)"?$/, '$1');
      return acc;
    }, {} as Props) as unknown) as DigestChallenge;
    debug('digestChallenge: ', digestChallenge);

    const requestInit: RequestInit = { ...init };

    // client nonce.
    const cnonce = md5(Math.round(Math.random() * 1e10).toString(16)).substr(
      0,
      16
    );

    // HA1 = MD5(username:realm:password)
    const ha1 = getHA1(clientInfo, digestChallenge, cnonce);

    // HA2 = MD5(method:digestURI)
    const method = requestInit.method ?? 'GET';
    const entityBody = (requestInit.body as string) ?? '';
    const digestURI = new URL(resource).pathname;
    const ha2 = getHA2(digestChallenge.qop, method, digestURI, entityBody);

    // response = MD5(HA1:nonce:nonceCount:cnonce:qop:HA2)
    const nonceCount = '00000001';
    const qop = 'auth';
    const digestResponse = md5(
      `${ha1}:${digestChallenge.nonce}:${nonceCount}:${cnonce}:${qop}:${ha2}`
    );

    debug('digestChallenge.nonce: ', digestChallenge.nonce);

    const digestAnswer: DigestAnswer = {
      username: `"${clientInfo.user}"`,
      realm: `"${digestChallenge.realm}"`,
      nonce: `"${digestChallenge.nonce}"`,
      uri: `"${digestURI}"`,
      algorithm: digestChallenge.algorithm,
      response: `"${digestResponse}"`,
      qop: qop,
      nc: nonceCount,
      cnonce: `"${cnonce}"`,
    };
    if (digestChallenge.opaque) {
      digestAnswer.opaque = digestChallenge.opaque;
    }
    debug('digestAnswer: ', digestAnswer);
    requestInit.headers = {
      ...init.headers,
      Authorization:
        'Digest ' +
        Object.keys(digestAnswer)
          .map((k) => `${k}=${((digestAnswer as unknown) as Props)[k]}`)
          .join(', '),
    };
    clientCookie.restituteCookies(requestInit);
    debug('first requestInit.headers', requestInit.headers);
    response = await fetch(resource, requestInit);
    debug('first response.headers', response.headers);
    clientCookie.saveCookies(response);
    return response;
  }
}

function getHA1(
  clientInfo: ClientInfo,
  digest: DigestChallenge,
  cnonce: string
): string {
  if (!clientInfo.user) {
    throw new Error('needs a username');
  }
  if (!clientInfo.password) {
    throw new Error('needs a password');
  }
  const a1 = `${clientInfo.user}:${digest.realm}:${clientInfo.password}`;
  const ha1 = md5(a1);
  if (digest.algorithm === 'MD5-sess') {
    // MD5(MD5(username:realm:password):nonce:cnonce)
    const str2 = `${ha1}:${digest.nonce}:${cnonce}`;
    debug('str2: ', str2);
    return md5(str2);
  }
  return ha1;
}

function getHA2(
  qop: string,
  method: string,
  digestURI: string,
  entityBody: string
) {
  if (qop === 'auth-int') {
    // HA2 = MD5(method:digestURI:MD5(entityBody))
    const a2 = `${method}:${digestURI}:${md5(entityBody)}`;
    debug('a2: ', a2);
    return md5(a2);
  }
  const ha2 = md5(`${method}:${digestURI}`);
  return ha2;
}
