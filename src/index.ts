import { SSO, createSSO } from "./createSSO";
import { auth } from "./auth";
import { connect } from "./connect";
import { getDefaultDomain } from "./getDefaultDomain";

export const sso = {
  auth,
  connect,
  createSSO,
  getDefaultDomain
};
