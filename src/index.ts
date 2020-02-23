import { auth } from './auth';
import { connect } from './connect';
import { getDefaultDomain } from './getDefaultDomain';
import { config } from './misc';
import { SSOObject } from './SSOObject';
import './express';

// In CommonJS, default export must be written as 'export ='
export = {
  config,
  auth,
  connect,
  SSOObject,
  getDefaultDomain
};
