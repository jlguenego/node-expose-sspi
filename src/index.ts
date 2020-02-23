import { createSSO } from "./createSSO";
import { auth } from "./auth";
import { connect } from "./connect";
import { getDefaultDomain } from "./getDefaultDomain";
import { config } from "./misc";
import "./SSO";

const sso = {
  config,
  auth,
  connect,
  createSSO,
  getDefaultDomain
};

// In CommonJS, default export must be written as 'export ='
export = sso;
