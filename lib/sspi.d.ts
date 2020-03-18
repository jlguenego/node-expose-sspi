import { AscReqFlag } from './flags/AscReqFlag';
import { IscReqFlag } from './flags/IscReqFlag';
import { AscRetFlag } from './flags/AscRetFlag';
import { ExtendedNameFormatFlag } from './flags/ExtendedNameFormatFlag';
import { AccessTokenFlag } from './flags/AccessTokenFlag';
import { TargetDataRepMapFlag } from './flags/TargetDataRepMapFlag';
import { CredentialUseFlag } from './flags/CredentialUseFlag';

export as namespace SSPI;

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
  Name: string;
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
interface CtxtHandle {}

/**
 * CredHandle is returned by AcquireCredentialsHandle.
 *
 * It is needed for using InitializeSecurityContext and AcceptSecurityContext.
 * It represents the credential of a client or server user.
 *
 * @interface CredHandle
 */
interface CredHandle {}

/**
 * A HANDLE representing something. Technically it is a pointer reference on something.
 *
 * @interface HANDLE
 */
interface HANDLE {}

/**
 * A Token is a pointer to some user information.
 *
 * @interface Token
 */
interface Token {}

type InformationClass = 'TokenGroups';

/**
 * Credential with expiry date.
 *
 * @interface CredentialWithExpiry
 */
interface CredentialWithExpiry {
  credential: CredHandle;
  tsExpiry: Date;
}

/**
 * A security context is the common output of InitializeSecurityContext and AcceptSecurityContext.
 * It contains the security buffers exchanged between the client and the server.
 *
 * @interface SecurityContext
 */
interface SecurityContext {
  readonly contextHandle?: CtxtHandle;
  readonly SECURITY_STATUS?: string;
  readonly SecBufferDesc?: any;
}

/**
 * ServerSecurityContext is the SecurityContext, specific to the server.
 * It is the output of AcceptSecurityContext, and used in the input of InitializeSecurityContext.
 * When the server want to send to the client authentication token input, this is done with this interface.
 *
 * @interface ServerSecurityContext
 * @extends {SecurityContext}
 */
interface ServerSecurityContext extends SecurityContext {
  contextAttr: AscRetFlag[];
}

/**
 * Wrapper containing a Microsoft windows domain name and a user sid.
 * sid = security id.
 *
 * @interface SidObject
 */
interface SidObject {
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
interface UserCredential {
  user: string;
  password: string;
  domain: string;
}

/**
 * Input of InitializeSecurityContext function.
 *
 * @interface InitializeSecurityContextInput
 */
interface InitializeSecurityContextInput {
  credential: CredHandle;
  targetName: string;
  cbMaxToken?: number;
  serverSecurityContext?: SecurityContext;
  contextHandle?: CtxtHandle;
  contextReq?: IscReqFlag[];
  targetDataRep?: TargetDataRepMapFlag;
}

/**
 * Input of AcceptSecurityContext function.
 *
 * @interface AcceptSecurityContextInput
 */
interface AcceptSecurityContextInput {
  credential: CredHandle;
  clientSecurityContext: SecurityContext;
  contextHandle?: CtxtHandle;
  contextReq?: AscReqFlag[];
  targetDataRep?: TargetDataRepMapFlag;
}

/**
 * Just a hello world function. Useless... ;)
 *
 * @export
 * @returns {string}
 */
export function hello(): string;

/**
 * EnumerateSecurityPackages get a list of SSP provider with some info.
 *
 * @export
 * @returns {SecPkgInfo[]}
 */
export function EnumerateSecurityPackages(): SecPkgInfo[];

/**
 * Get info about one SSP provider given its name.
 *
 * @export
 * @param {string} packageName
 * @returns {SecPkgInfo}
 */
export function QuerySecurityPackageInfo(packageName: string): SecPkgInfo;

/**
 * Get the credentials of a user, to be used with a specified SSP package.
 * The credentials will be used according the specified flags.
 *
 * Do not forget to free allocated memory with FreeCredentialsHandle.
 *
 * @export
 * @param {{
 *   packageName: string;
 *   authData?: UserCredential;
 *   credentialUse?: CredentialUseFlag;
 * }} input
 * @returns {CredentialWithExpiry}
 */
export function AcquireCredentialsHandle(input: {
  packageName: string;
  authData?: UserCredential;
  credentialUse?: CredentialUseFlag;
}): CredentialWithExpiry;

/**
 * This function must be used only by a client. Its purpose is to setup a client/server security context.
 *
 * @export
 * @param {InitializeSecurityContextInput} input
 * @returns {SecurityContext}
 */
export function InitializeSecurityContext(input: InitializeSecurityContextInput): SecurityContext;

/**
 * This function must be used only by a server. Its purpose is to setup a client/server security context
 *
 * @export
 * @param {AcceptSecurityContextInput} input
 * @returns {ServerSecurityContext}
 */
export function AcceptSecurityContext(input: AcceptSecurityContextInput): ServerSecurityContext;

/**
 * Free a allocated credential memory. Must be used after AcquireCredentialsHandle.
 *
 * @export
 * @param {CredHandle} credential
 */
export function FreeCredentialsHandle(credential: CredHandle): void;

/**
 * Must be used only on a server.
 *
 * Change the server user temporarely with the client user.
 * When over, use RevertSecurityContext.
 *
 * @export
 * @param {CtxtHandle} handle
 */
export function ImpersonateSecurityContext(handle: CtxtHandle): void;

/**
 * Revert the server user back to its original. Must be used with ImpersonateSecurityContext.
 *
 * @export
 * @param {CtxtHandle} handle
 */
export function RevertSecurityContext(handle: CtxtHandle): void;

/**
 * Get the username of the current thread.
 *
 * @export
 * @returns {string}
 */
export function GetUserName(): string;

/**
 * Get the username and much more of the current thread.
 *
 * @export
 * @param {ExtendedNameFormatFlag} extendedNameFormat
 * @returns {string}
 */
export function GetUserNameEx(extendedNameFormat: ExtendedNameFormatFlag): string;

/**
 * Get the user token associated with the current thread. Used with ImpersonateSecurityContext.
 * 
 * Token must be freed with CloseHandle.
 *
 * @export
 * @param {AccessTokenFlag[]} [flags]
 * @returns {Token}
 */
export function OpenThreadToken(flags?: AccessTokenFlag[]): Token;

/**
 * Get the user token associated with the current process. You will get always
 * the user that has started the process, and never the impersonated user.
 * 
 * CloseHandle must be used for freeing the token.
 *
 * @export
 * @param {AccessTokenFlag[]} [flags]
 * @returns {Token}
 */
export function OpenProcessToken(flags?: AccessTokenFlag[]): Token;

/**
 * Get information from a user token.
 *
 * @export
 * @param {Token} token
 * @param {InformationClass} infoClass
 * @returns {*}
 */
export function GetTokenInformation(token: Token, infoClass: InformationClass): any;

/**
 * Free allocated memory.
 *
 * @export
 * @param {HANDLE} handle
 */
export function CloseHandle(handle: HANDLE): void;

/**
 * Get the SID of username.
 *
 * @export
 * @param {string} username
 * @returns {SidObject}
 */
export function LookupAccountName(username: string): SidObject;

/**
 * Query what can be done with a given credential.
 *
 * @export
 * @param {CredHandle} credential
 * @param {string} attribute
 * @returns {*}
 */
export function QueryCredentialsAttributes(credential: CredHandle, attribute: string): any;

/**
 * Query what can be done with a given context handle.
 *
 * @export
 * @param {CtxtHandle} ctxtHandle
 * @param {string} attribute
 * @returns {*}
 */
export function QueryContextAttributes(ctxtHandle: CtxtHandle, attribute: string): any;

/**
 * Get a client user token.
 *
 * @export
 * @param {CtxtHandle} ctxtHandle
 * @returns {Token}
 */
export function QuerySecurityContextToken(ctxtHandle: CtxtHandle): Token;


/**
 * Free a context handle.
 *
 * @export
 * @param {CtxtHandle} ctxtHandle
 */
export function DeleteSecurityContext(ctxtHandle: CtxtHandle): void;
