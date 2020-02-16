import { AscReqFlag } from "./AscReqFlag";
import { ExtendedNameFormatFlag } from "./ExtendedNameFormatFlag";
import { AccessTokenFlag } from "./AccessTokenFlag";

export as namespace SSPI;

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
  contextHandle?: CtxtHandle;
  SECURITY_STATUS?: string;
  SecBufferDesc?: any;
}

interface SidObject {
  sid: string;
  domain: string;
}

interface UserCredential {
  user: string;
  password: string;
  domain: string;
}

interface InitializeSecurityContextInput {
  credential: CredHandle;
  targetName: string;
  cbMaxToken?: number;
  serverSecurityContext?: SecurityContext;
  contextHandle?: CtxtHandle;
}

interface AcceptSecurityContextInput {
  credential: CredHandle;
  clientSecurityContext: SecurityContext;
  contextHandle?: CtxtHandle;
  contextReq?: AscReqFlag[];
}

export function hello(): string;
export function EnumerateSecurityPackages(): SSPI.SecPkgInfo[];
export function QuerySecurityPackageInfo(packageName: string): SSPI.SecPkgInfo;
export function AcquireCredentialsHandle(input: {
  packageName: string;
  authData?: UserCredential;
}): SSPI.CredentialWithExpiry;
export function InitializeSecurityContext(
  input: InitializeSecurityContextInput
): SSPI.SecurityContext;
export function AcceptSecurityContext(
  input: AcceptSecurityContextInput
): SSPI.SecurityContext;
export function FreeCredentialsHandle(credentials: string): void;
export function ImpersonateSecurityContext(handle: SSPI.CtxtHandle): void;
export function RevertSecurityContext(handle: SSPI.CtxtHandle): void;
export function GetUserName(): string;
export function GetUserNameEx(extendedNameFormat: ExtendedNameFormatFlag): string;
export function OpenThreadToken(flags?: AccessTokenFlag[]): Token;
export function OpenProcessToken(flags?: AccessTokenFlag[]): Token;
export function GetTokenInformation(
  token: SSPI.Token,
  infoClass: InformationClass
): any;
export function CloseHandle(handle: SSPI.HANDLE): void;
export function LookupAccountName(username: string): SSPI.SidObject;
export function QueryCredentialsAttributes(
  credentials: string,
  attribute: string
): any;
export function QueryContextAttributes(
  ctxtHandle: SSPI.CtxtHandle,
  attribute: string
): any;
export function QuerySecurityContextToken(
  ctxtHandle: SSPI.CtxtHandle
): SSPI.Token;
export function DeleteSecurityContext(ctxtHandle: SSPI.CtxtHandle): void;
