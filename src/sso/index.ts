import { auth } from './auth';
import { connect } from './connect';
import {
  getDefaultDomain,
  isOnDomain,
  isActiveDirectoryReachable,
} from './domain';
import { hexDump } from './misc';
import { sleep } from './sleep';
import { SSO } from './SSO';
import './interfaces';
import { Client, getSPNFromURI } from './client';
import { Mutex } from './mutex';
import { init, database, getUsers, getUser } from './userdb';
import { openADConnection, closeADConnection } from './adConnection';
import { hasAdminPrivileges } from './uac';

/**
 * Wrapper object sso. Everything written in Typescript that is
 * exported from this module is accessible via the `sso` constant object.
 *
 * @export
 */
export const sso = {
  auth,
  closeADConnection,
  connect,
  database,
  Client,
  getDefaultDomain,
  getSPNFromURI,
  getUser,
  getUsers,
  hexDump,
  init,
  isOnDomain,
  isActiveDirectoryReachable,
  Mutex,
  openADConnection,
  SSO,
  sleep,
  hasAdminPrivileges
};
