import { createSSO } from "./createSSO";
import { auth } from "./auth";
import { connect } from "./connect";
import { getDefaultDomain } from "./getDefaultDomain";

// In CommonJS, default export must be written as 'export ='
export = {
  auth,
  connect,
  createSSO,
  getDefaultDomain
};
