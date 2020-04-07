import { SSO } from './SSO';
import { IncomingMessage, ServerResponse } from 'http';

declare module 'http' {
  interface IncomingMessage {
    /**
     * Contains the SSO object.
     *
     * @type {SSO}
     * @memberof Request
     */
    sso: SSO;
  }
}

export type AsyncMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: NextFunction
) => Promise<void>;

export type NextFunction = (error?: Error) => void | Promise<void>;

/**
 * options to provide to sso.auth() and SSO.setOptions().
 *
 * @export
 * @interface AuthOptions
 */
export interface AuthOptions {
  /**
   * Brings back the groups the user belongs to.
   *
   * @default true
   *
   * @type {boolean}
   * @memberof AuthOptions
   */
  useGroups?: boolean;

  /**
   * Brings back the Active Directory user information
   *
   * Note 1: only if we can reach Active Directory of the Domain Controller
   *
   * @default true
   *
   * @type {boolean}
   * @memberof AuthOptions
   */
  useActiveDirectory?: boolean;

  /**
   * Brings back the server process owner info.
   *
   * @default false
   *
   * @type {boolean}
   * @memberof AuthOptions
   */
  useOwner?: boolean;

  /**
   * Manage authentication with cookie.
   * Useful for performance when many users try to connect at the same time.
   *
   * Note: useCookies will be rewritten to false automatically if useActiveDirectory is set to true.
   * (Because of Windows parallelism issues with COM interfaces. See Issues #4)
   *
   * @default false
   *
   * @type {boolean}
   * @memberof AuthOptions
   */
  useCookies?: boolean;
}

export interface User {
  name?: string;
  sid?: string;
  displayName?: string;
  domain?: string;
  groups?: string[];
  adUser?: ADUser;
}

export interface Database {
  users: ADUsers;
}

export interface ADUser {
  sn?: string;
  givenName?: string;
  cn?: string;
  [key: string]: any;
}

export type ADUsers = ADUser[];

export interface CookieList {
  [name: string]: string;
}
