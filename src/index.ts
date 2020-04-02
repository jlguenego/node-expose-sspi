import { auth } from './auth';
import { connect } from './connect';
import {
  getDefaultDomain,
  isOnDomain,
  isActiveDirectoryReachable,
} from './domain';
import { hexDump } from './misc';
import { SSO } from './SSO';
import './express';
import { client } from './client';
import { init, database, authIsReady, getUsers, getUser } from './userdb';

const sleep = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

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
  authIsReady,
  database,
  sleep,
  getUsers,
  getUser,
};
