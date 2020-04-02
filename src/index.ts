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
import './express';
import { client } from './client';
import { init, database, getUsers, getUser } from './userdb';

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
  sleep,
  getUsers,
  getUser,
};
