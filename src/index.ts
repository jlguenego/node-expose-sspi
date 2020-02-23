import { auth } from './auth';
import { connect } from './connect';
import { getDefaultDomain } from './getDefaultDomain';
import { config, hexDump } from './misc';
import { SSO } from './SSO';
import './express';

// In CommonJS, default export must be written as 'export ='
export = {
  config,
  hexDump,
  auth,
  connect,
  SSO,
  getDefaultDomain
};
