import fetch, { RequestInit, Response } from 'node-fetch';
import dbg from 'debug';

import { HandlerFactory } from './client/HandlerFactory';
import { ClientCookie } from './client/ClientCookie';
import { ClientInfo } from './client/ClientInfo';
import { SecuritySupportProvider } from '..';

const debug = dbg('node-expose-sspi:client');

/**
 * Allow to fetch url with a system that uses the negotiate protocol.
 * Cookies are managed if necessary during the process.
 *
 * @export
 * @class Client
 */
export class Client {
  clientCookie = new ClientCookie();
  clientInfo = new ClientInfo();

  /**
   * Set the credentials for running the client as another user.
   *
   * By default, the credentials are the logged windows account.
   *
   * @param {string} domain
   * @param {string} user
   * @param {string} password
   * @memberof Client
   */
  setCredentials(domain: string, user: string, password: string): void {
    this.clientInfo.domain = domain;
    this.clientInfo.user = user;
    this.clientInfo.password = password;
  }

  /**
   * Force the targetName to a value.
   *
   * For Kerberos, the targetName is the SPN (Service Principal Name).
   *
   * @param {string} targetName
   * @memberof Client
   */
  setTargetName(targetName: string): void {
    this.clientInfo.targetName = targetName;
  }

  /**
   * Set the Security Support Provider (NTLM, Kerberos, Negotiate)
   *
   * @param {SecuritySupportProvider} ssp
   * @memberof Client
   */
  setSSP(ssp: SecuritySupportProvider): void {
    this.clientInfo.ssp = ssp;
  }

  /**
   * Works as the fetch function of node-fetch node module.
   * This function can handle the negotiate protocol with SPNEGO tokens.
   *
   * @param {string} resource - the URL to fetch
   * @param {RequestInit} [init] - the options (headers, body, etc.)
   * @returns {Promise<Response>} a promise with the HTTP response.
   * @memberof Client
   */
  async fetch(resource: string, init?: RequestInit): Promise<Response> {
    const response = await fetch(resource, init);
    const result = await this.handleAuth(response, resource, init);
    return result;
  }

  /**
   * The authentication negotiate protocol is handled by this function.
   * It is called by `Client.fetch`.
   *
   * @private
   * @param {Response} response
   * @param {string} resource
   * @param {RequestInit} [init={}]
   * @returns {Promise<Response>}
   * @memberof Client
   */
  private async handleAuth(
    response: Response,
    resource: string,
    init: RequestInit = {}
  ): Promise<Response> {
    debug('start response.headers', response.headers);
    debug('response.status', response.status);

    // has cookies ?
    this.clientCookie.saveCookies(response);

    if (response.status !== 401) {
      debug('no status 401');
      return response;
    }

    const authHeader = response.headers.get('www-authenticate');
    if (authHeader === null) {
      debug('no header www-authenticate');
      return response;
    }

    const authMethod = authHeader.split(/[, ]/)[0];
    const handler = HandlerFactory.instantiate(authMethod);
    return await handler.handle(
      this.clientInfo,
      this.clientCookie,
      response,
      resource,
      init
    );
  }
}
