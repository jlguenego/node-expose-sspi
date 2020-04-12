import fetch, { RequestInit, Response } from 'node-fetch';
import dns from 'dns';
import {
  sysinfo,
  sspi,
  InitializeSecurityContextInput,
  AcquireCredHandleInput,
} from '../lib/api';
import {} from './domain';
import { encode, decode } from 'base64-arraybuffer';
import dbg from 'debug';
import { CookieList } from './interfaces';

const debug = dbg('node-expose-sspi:client');

// Thanks to :
// -
// -

/**
 * Get the SPN the same way Chrome/Firefox or IE does.
 *
 * Links:
 * - getting the domain name: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
 * - algo of IE : https://support.microsoft.com/en-us/help/4551934/kerberos-failures-in-internet-explorer
 *
 * @param {string} url
 * @returns {string}
 */
export async function getSPNFromURI(url: string): Promise<string> {
  const msDomainName = sysinfo.GetComputerNameEx('ComputerNameDnsDomain');
  if (msDomainName.length === 0) {
    debug('Client running on a host that is not part of a Microsoft domain');
    return 'whatever';
  }
  const matches = /^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i.exec(url);
  const urlDomain = matches && matches[1];
  debug('urlDomain: ', urlDomain);
  if (['localhost','127.0.0.1'].includes(urlDomain)) {
    return 'HTTP/localhost';
  }
  // needs urlFQDN for the DNS resolver.
  const urlFQDN = urlDomain.includes('.')
    ? urlDomain
    : urlDomain + '.' + msDomainName;
  let hostname = urlFQDN;
  try {
    const records = await dns.promises.resolve(urlFQDN, 'CNAME');
    if (records.length > 0) {
      hostname = records[0];
    }
  } catch (e) {
    debug('DNS error', e);
  }
  const result = 'HTTP/' + hostname;
  debug('result: ', result);
  return result;
}

export class Client {
  private cookieList: CookieList = {};
  private domain: string;
  private user: string;
  private password: string;

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
    if (cookieStr.length === 0) {
      return;
    }
    Object.assign(requestInit.headers, { cookie: cookieStr });
  }

  setCredentials(domain: string, user: string, password: string): void {
    this.domain = domain;
    this.user = user;
    this.password = password;
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
    debug('start response.headers', response.headers);

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
    const credInput = {
      packageName: 'Negotiate',
      credentialUse: 'SECPKG_CRED_OUTBOUND',
    } as AcquireCredHandleInput;
    if (this.user) {
      credInput.authData = {
        domain: this.domain,
        user: this.user,
        password: this.password,
      };
    }
    const clientCred = sspi.AcquireCredentialsHandle(credInput);

    const packageInfo = sspi.QuerySecurityPackageInfo('Negotiate');
    const targetName = await getSPNFromURI(resource);
    let input: InitializeSecurityContextInput = {
      credential: clientCred.credential,
      targetName,
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
    debug('first requestInit.headers', requestInit.headers);
    response = await fetch(resource, requestInit);
    debug('first response.headers', response.headers);
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
        targetName,
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
      debug('other requestInit.headers', requestInit.headers);
      response = await fetch(resource, requestInit);
      debug('other response.headers', response.headers);
    }
    debug('handleAuth: end');
    return response;
  }
}
