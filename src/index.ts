import { auth } from './auth';
import { connect } from './connect';
import { getDefaultDomain, isOnDomain } from './domain';
import { config, hexDump } from './misc';
import { SSO } from './SSO';
import './express';
import { client } from './client';
import { init, database } from './userdb';

export const sso = {
  config,
  hexDump,
  auth,
  connect,
  SSO,
  getDefaultDomain,
  isOnDomain,
  client,
  init,
  database,
};
