import { Request, RequestHandler } from "express";

declare global {
  namespace Express {
    interface Request {
      /**
       * SSO object provided by ssoAuth middleware.
       *
       * @type {*}
       * @memberof Request
       */
      sso: SSO.Object;
    }
  }

  namespace SSO {
    interface Object {
      user: User;
      owner: User;
    }

    interface User {
      name: string;
      sid: string;
      displayName: string;
      domain: string;
      groups: string[];
    }

    interface UserCredential {
      user: string;
      password: string;
      domain: string;
    }
  }

  namespace SSPI {
    interface CtxtHandle {}

    interface SecPkgInfo {
      fCapabilities: number;
      wVersion: number;
      wRPCID: number;
      cbMaxToken: number;
      Name: string;
      Comment: string;
    }

    type CredHandle = string;
    type HANDLE = string;
    type Token = HANDLE;
    type InformationClass = string;

    interface CredentialWithExpiry {
      credential: SSPI.CredHandle;
      tsExpiry: Date;
    }

    interface SecurityContext {
      contextHandle: CtxtHandle;
      SECURITY_STATUS: string;
      SecBufferDesc: any;
    }

    interface SidObject {
      sid: string;
      domain: string;
    }
  }
}

declare namespace nodeExposeSspi {
  interface Options {
    [key: string]: any;
  }

  function ssoAuth(options?: nodeExposeSspi.Options): RequestHandler;
  function connect(userCredential: SSO.UserCredential): SSO.Object;
  function createSSO(serverContextHandle: SSPI.CtxtHandle): SSO.Object;
  function getDefaultDomain(): string;

  // SSPI C++ Addon
  function hello(): string;
  function EnumerateSecurityPackages(): SSPI.SecPkgInfo[];
  function QuerySecurityPackageInfo(packageName: string): SSPI.SecPkgInfo;
  function AcquireCredentialsHandle(input: {
    packageName: string;
    authData?: SSO.UserCredential;
  }): SSPI.CredentialWithExpiry;
  function InitializeSecurityContext(input: {
    credential: SSPI.CredHandle;
    targetName: string;
    cbMaxToken?: number;
    serverSecurityContext?: SSPI.SecurityContext;
    contextHandle?: SSPI.CtxtHandle;
  }): SSPI.SecurityContext;
  function AcceptSecurityContext(input: {
    credential: SSPI.CredHandle;
    clientSecurityContext: SSPI.SecurityContext;
    contextHandle?: SSPI.CtxtHandle;
  }): SSPI.SecurityContext;
  function FreeCredentialsHandle(credentials: string): void;
  function ImpersonateSecurityContext(handle: SSPI.CtxtHandle): void;
  function RevertSecurityContext(handle: SSPI.CtxtHandle): void;
  function GetUserName(): string;
  function GetUserNameEx(extendedNameFormat: string): string;
  function OpenThreadToken(flags: string[]): SSPI.Token;
  function OpenProcessToken(flags: string[]): SSPI.Token;
  function GetTokenInformation(token: SSPI.Token, infoClass: SSPI.InformationClass): void;
  function CloseHandle(handle: SSPI.HANDLE): void;
  function LookupAccountName(username: string): SSPI.SidObject;
  function QueryCredentialsAttributes(credentials: string, attribute: string): any;
  function QueryContextAttributes(ctxtHandle: SSPI.CtxtHandle, attribute: string): any;
  function QuerySecurityContextToken(ctxtHandle: SSPI.CtxtHandle): SSPI.Token;
  function DeleteSecurityContext(ctxtHandle: SSPI.CtxtHandle): void;
}

export = nodeExposeSspi;
