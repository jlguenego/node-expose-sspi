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

export const sso = {
  hexDump,
  auth,
  connect,
  SSO,
  getDefaultDomain,
  isOnDomain,
  isActiveDirectoryReachable,
  Client,
  getSPNFromURI,
  init,
  database,
  sleep,
  getUsers,
  getUser,
  Mutex,
  openADConnection,
  closeADConnection
};
