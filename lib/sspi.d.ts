import {
  AscReqFlag,
  IscReqFlag,
  AscRetFlag,
  ExtendedNameFormatFlag,
  AccessTokenFlag,
  TargetDataRepMapFlag,
  CredentialUseFlag,
} from './flags';
import { AccessToken, TokenPrivileges } from './user';

export type SecuritySupportProvider = 'NTLM' | 'Kerberos' | 'Negotiate';

/**
 * SecPkgInfo is the interface returned by EnumerateSecurityPackages and QuerySecurityPackageInfo
 * for having info about SSP providers.
 *
 * When doing SSO, you need to use a SSP provider (ex: Negotiate SSP provider).
 *
 * @interface SecPkgInfo
 */
interface SecPkgInfo {
  fCapabilities: number;
  wVersion: number;
  wRPCID: number;
  cbMaxToken: number;
  Name: SecuritySupportProvider;
  Comment: string;
}

/**
 * Context Handle
 *
 * A context handle is created with InitializeSecurityContext and AcceptSecurityContext
 * function while establishing secure authentication.
 * It is useful to use ImpersonateSecurityContext function
 *
 * @interface CtxtHandle
 */
export interface CtxtHandle {}

/**
 * CredHandle is returned by AcquireCredentialsHandle.
 *
 * It is needed for using InitializeSecurityContext and AcceptSecurityContext.
 * It represents the credential of a client or server user.
 *
 * @interface CredHandle
 */
export interface CredHandle {}

/**
 * A HANDLE representing something. Technically it is a pointer reference on something.
 *
 * @interface HANDLE
 */
export interface HANDLE {}

/**
 * A pointer to an Sid (to be freed).
 *
 * @type SidPointer
 */
export type SidPointer = string;

export type InformationClass = 'TokenGroups' | 'TokenPrivileges';

/**
 * Credential with expiry date.
 *
 * @interface CredentialWithExpiry
 */
export interface CredentialWithExpiry {
  credential: CredHandle;
  tsExpiry: Date;
}

/**
 * A security context is the common output of InitializeSecurityContext and AcceptSecurityContext.
 * It contains the security buffers exchanged between the client and the server.
 *
 * @interface SecurityContext
 */
export interface SecurityContext {
  readonly contextHandle: CtxtHandle;
  readonly SECURITY_STATUS: SecurityStatus;
  readonly SecBufferDesc: SecBufferDesc;
}

export type SecurityStatus =
  | 'SEC_E_OK'
  | 'SEC_I_COMPLETE_AND_CONTINUE'
  | 'SEC_I_COMPLETE_NEEDED'
  | 'SEC_I_CONTINUE_NEEDED';

/**
 * Same as Microsoft SecBufferDesc: The SecBufferDesc structure describes
 * an array of SecBuffer structures to pass from a transport application
 * to a security package.
 *
 * @export
 * @interface SecBufferDesc
 */
export interface SecBufferDesc {
  ulVersion: number;
  buffers: ArrayBuffer[];
}

/**
 * ServerSecurityContext is the SecurityContext, specific to the server.
 * It is the output of AcceptSecurityContext, and used in the input of InitializeSecurityContext.
 * When the server want to send to the client authentication token input, this is done with this interface.
 *
 * @interface ServerSecurityContext
 * @extends {SecurityContext}
 */
export interface ServerSecurityContext {
  readonly SECURITY_STATUS: string;
  readonly contextHandle: CtxtHandle;
  readonly contextAttr: AscRetFlag[];
  readonly SecBufferDesc: SecBufferDesc;
}

/**
 * Wrapper containing a Microsoft windows domain name and a user sid.
 * sid = security id.
 *
 * @interface SidObject
 */
export interface SidObject {
  sid: string;
  domain: string;
}

/**
 * This is just a container for user login/password/domain.
 *
 * The domain is a Windows domain, or a computer name.
 *
 * @interface UserCredential
 */
export interface UserCredential {
  user: string;
  password: string;
  domain: string;
}

/**
 * Input of InitializeSecurityContext function.
 *
 * @interface InitializeSecurityContextInput
 */
export interface InitializeSecurityContextInput {
  credential: CredHandle;
  targetName: string;
  cbMaxToken?: number;
  SecBufferDesc?: SecBufferDesc;
  contextHandle?: CtxtHandle;
  contextReq?: IscReqFlag[];
  targetDataRep?: TargetDataRepMapFlag;
  isFirstCall?: boolean;
}

/**
 * Input of function AcquireCredentialsHandle
 *
 * @export
 * @interface AcquireCredHandleInput
 */
export interface AcquireCredHandleInput {
  packageName: SecuritySupportProvider;
  authData?: UserCredential;
  credentialUse?: CredentialUseFlag;
}

/**
 * Input of AcceptSecurityContext function.
 *
 * @interface AcceptSecurityContextInput
 */
export interface AcceptSecurityContextInput {
  credential: CredHandle;
  SecBufferDesc?: SecBufferDesc;
  contextHandle?: CtxtHandle;
  contextReq?: AscReqFlag[];
  targetDataRep?: TargetDataRepMapFlag;
}

export interface GetTokenInformationInput {
  accessToken: AccessToken;
  tokenInformationClass: InformationClass;
  filter?: string;
}

export type Groups = string[];

export interface Sspi {
  /**
   * Just a hello world function. Useless... ;)
   *
   * @returns {string}
   * @memberof Sspi
   */
  hello(): string;

  /**
   * EnumerateSecurityPackages get a list of SSP provider with some info.
   *
   * @returns {SecPkgInfo[]}
   * @memberof Sspi
   */
  EnumerateSecurityPackages(): SecPkgInfo[];

  /**
   * Get info about one SSP provider given its name.
   *
   * @param {SecuritySupportProvider} packageName
   * @returns {SecPkgInfo}
   * @memberof Sspi
   */
  QuerySecurityPackageInfo(packageName: SecuritySupportProvider): SecPkgInfo;

  /**
   * Get the credentials of a user, to be used with a specified SSP package.
   * The credentials will be used according the specified flags.
   *
   * FreeCredentialsHandle must be used to free the credentials pointer.
   *
   *
   * @param {AcquireCredHandleInput} input
   * @returns {CredentialWithExpiry}
   * @memberof Sspi
   */
  AcquireCredentialsHandle(input: AcquireCredHandleInput): CredentialWithExpiry;

  /**
   * This function must be used only by a client. Its purpose is to setup a client/server security context.
   *
   * @param {InitializeSecurityContextInput} input
   * @returns {SecurityContext}
   * @memberof Sspi
   */
  InitializeSecurityContext(
    input: InitializeSecurityContextInput
  ): SecurityContext;

  /**
   * AcceptSecurityContext must be used only on server side. Its purpose is to setup a client/server security context
   *
   * @param {AcceptSecurityContextInput} input
   * @returns {ServerSecurityContext}
   * @memberof Sspi
   */
  AcceptSecurityContext(
    input: AcceptSecurityContextInput
  ): ServerSecurityContext;

  /**
   * Free a allocated credential memory. Must be used after AcquireCredentialsHandle.
   *
   * @param {CredHandle} credential
   * @memberof Sspi
   */
  FreeCredentialsHandle(credential: CredHandle): void;

  /**
   * Must be used only on server side.
   *
   * Change the server user temporarely with the client user.
   * Allocated resource must be freed with RevertSecurityContext.
   *
   * @param {CtxtHandle} handle
   * @memberof Sspi
   */
  ImpersonateSecurityContext(handle: CtxtHandle): void;

  /**
   * Revert the server user back to its original. Must be used with ImpersonateSecurityContext.
   *
   * @param {CtxtHandle} handle
   * @memberof Sspi
   */
  RevertSecurityContext(handle: CtxtHandle): void;

  /**
   * Get the username of the current thread. (TODO: to be moved outside of SSPI)
   *
   * @returns {string}
   * @memberof Sspi
   */
  GetUserName(): string;

  /**
   * Get the username and much more of the current thread.
   *
   * @param {ExtendedNameFormatFlag} extendedNameFormat
   * @returns {string}
   * @memberof Sspi
   */
  GetUserNameEx(extendedNameFormat: ExtendedNameFormatFlag): string;

  /**
   * Get the user token associated with the current thread. Used with ImpersonateSecurityContext.
   *
   * Token must be freed with CloseHandle.
   *
   * @param {AccessTokenFlag[]} [flags]
   * @returns {AccessToken}
   * @memberof Sspi
   */
  OpenThreadToken(flags?: AccessTokenFlag[]): AccessToken;

  /**
   * Get the user token associated with the current process. You will get always
   * the user that has started the process, and never the impersonated user.
   *
   * CloseHandle must be used for freeing the token.
   *
   * @param {AccessTokenFlag[]} [flags]
   * @returns {AccessToken}
   * @memberof Sspi
   */
  OpenProcessToken(flags?: AccessTokenFlag[]): AccessToken;

  /**
   * Allocate an sid. Limitations: get only the NtAuthority sid
   * (for admin check use case)
   *
   * Note: the sid returned must be freed with `FreeSid()`.
   *
   * @returns {SidPointer}
   * @memberof Sspi
   */
  AllocateAndInitializeSid(): SidPointer;

  /**
   * check if the sid belongs to the user thread/process token.
   *
   * @param {SidPointer} sid
   * @returns {boolean}
   * @memberof Sspi
   */
  CheckTokenMembership(sid: SidPointer): boolean;

  /**
   * Free the given sid.
   *
   * Warning: this function may crash the system if not used with a good sid.
   *
   * @param {SidPointer} sid
   * @memberof Sspi
   */
  FreeSid(sid: SidPointer): void;

  /**
   * Get information from a user token.
   *
   * @param {Token} token
   * @param {InformationClass} infoClass
   * @returns {string[]}
   * @memberof Sspi
   */
  GetTokenInformation(
    input: GetTokenInformationInput
  ): Groups | TokenPrivileges;

  /**
   * Free allocated memory referenced by the handle.
   *
   * @param {HANDLE} handle
   * @memberof Sspi
   */
  CloseHandle(handle: HANDLE): void;

  /**
   * Get the SID of username.
   *
   * @param {string} username
   * @returns {SidObject}
   * @memberof Sspi
   */
  LookupAccountName(username: string): SidObject;

  /**
   * Query what can be done with a given credential.
   *
   * @param {CredHandle} credential
   * @param {string} attribute
   * @returns {*}
   * @memberof Sspi
   */
  QueryCredentialsAttributes(credential: CredHandle, attribute: string): any;

  /**
   * Query what can be done with a given context handle.
   *
   * @param {CtxtHandle} ctxtHandle
   * @param {string} attribute
   * @returns {*}
   * @memberof Sspi
   */
  QueryContextAttributes(ctxtHandle: CtxtHandle, attribute: string): any;

  /**
   * Get a client user token.
   *
   * @param {CtxtHandle} ctxtHandle
   * @returns {AccessToken}
   * @memberof Sspi
   */
  QuerySecurityContextToken(ctxtHandle: CtxtHandle): AccessToken;

  /**
   * Free a context handle.
   *
   * @param {CtxtHandle} ctxtHandle
   * @memberof Sspi
   */
  DeleteSecurityContext(ctxtHandle: CtxtHandle): void;
}
