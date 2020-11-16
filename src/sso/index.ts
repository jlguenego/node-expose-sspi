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
import { SPN } from './spn';
import './interfaces';
import { Client } from './client';
import { getSPNFromURI } from './client/misc';
import { Mutex } from './mutex';
import { init, database, getUsers, getUser } from './userdb';
import { openADConnection, closeADConnection } from './adConnection';
import { hasAdminPrivileges } from './uac';
import { getStatusInfo } from './status';
import { negotiateParse } from './msgParser';

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
  getStatusInfo,
  getUser,
  getUsers,
  hasAdminPrivileges,
  hexDump,
  init,
  isOnDomain,
  isActiveDirectoryReachable,
  Mutex,
  negotiateParse,
  openADConnection,
  SSO,
  sleep,
  SPN,
};
