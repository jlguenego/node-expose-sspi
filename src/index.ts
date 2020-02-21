import { createSSO } from "./createSSO";
import { auth } from "./auth";
import { connect } from "./connect";
import { getDefaultDomain } from "./getDefaultDomain";
import { config } from "./misc";
import "./SSO";

// In CommonJS, default export must be written as 'export ='
export = {
  config,
  auth,
  connect,
  createSSO,
  getDefaultDomain
};
