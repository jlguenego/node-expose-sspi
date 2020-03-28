import { auth } from './auth';
import { connect } from './connect';
import { getDefaultDomain, isOnDomain, isActiveDirectoryReachable } from './domain';
import { hexDump } from './misc';
import { SSO } from './SSO';
import './express';
import { client } from './client';
import { init, database } from './userdb';

export const sso = {
  hexDump,
  auth,
  connect,
  SSO,
  getDefaultDomain,
  isOnDomain,
  isActiveDirectoryReachable,
  client,
  init,
  database,
};
