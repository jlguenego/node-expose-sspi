import { auth } from './auth';
import { connect } from './connect';
import { getDefaultDomain } from './getDefaultDomain';
import { config } from './misc';
import { SSO } from './SSO';
import './express';

// In CommonJS, default export must be written as 'export ='
export = {
  config,
  auth,
  connect,
  SSO,
  getDefaultDomain
};
