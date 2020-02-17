import { AscReqFlag } from "./flags/AscReqFlag";
import { IscReqFlag } from "./flags/IscReqFlag";
import { AscRetFlag } from "./flags/AscRetFlag";
import { ExtendedNameFormatFlag } from "./flags/ExtendedNameFormatFlag";
import { AccessTokenFlag } from "./flags/AccessTokenFlag";
import { TargetDataRepMapFlag } from "./flags/TargetDataRepMapFlag";
import { CredentialUseFlag } from "./flags/CredentialUseFlag";

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

interface CredHandle {}
interface HANDLE {}
interface Token {}
type InformationClass = "TokenGroups";

interface CredentialWithExpiry {
  credential: CredHandle;
  tsExpiry: Date;
}

interface SecurityContext {
  readonly contextHandle?: CtxtHandle;
  readonly SECURITY_STATUS?: string;
  readonly SecBufferDesc?: any;
}

interface ServerSecurityContext extends SecurityContext {
  contextAttr: AscRetFlag[];
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
  contextReq?: IscReqFlag[];
}

interface AcceptSecurityContextInput {
  credential: CredHandle;
  clientSecurityContext: SecurityContext;
  contextHandle?: CtxtHandle;
  contextReq?: AscReqFlag[];
  targetDataRep?: TargetDataRepMapFlag;
}

export function hello(): string;
export function EnumerateSecurityPackages(): SecPkgInfo[];
export function QuerySecurityPackageInfo(packageName: string): SSPI.SecPkgInfo;
export function AcquireCredentialsHandle(input: {
  packageName: string;
  authData?: UserCredential;
  credentialUse?: CredentialUseFlag;
}): CredentialWithExpiry;
export function InitializeSecurityContext(
  input: InitializeSecurityContextInput
): SecurityContext;
export function AcceptSecurityContext(
  input: AcceptSecurityContextInput
): ServerSecurityContext;
export function FreeCredentialsHandle(credential: CredHandle): void;
export function ImpersonateSecurityContext(handle: CtxtHandle): void;
export function RevertSecurityContext(handle: CtxtHandle): void;
export function GetUserName(): string;
export function GetUserNameEx(
  extendedNameFormat: ExtendedNameFormatFlag
): string;
export function OpenThreadToken(flags?: AccessTokenFlag[]): Token;
export function OpenProcessToken(flags?: AccessTokenFlag[]): Token;
export function GetTokenInformation(
  token: Token,
  infoClass: InformationClass
): any;
export function CloseHandle(handle: HANDLE): void;
export function LookupAccountName(username: string): SidObject;
export function QueryCredentialsAttributes(
  credential: CredHandle,
  attribute: string
): any;
export function QueryContextAttributes(
  ctxtHandle: CtxtHandle,
  attribute: string
): any;
export function QuerySecurityContextToken(ctxtHandle: CtxtHandle): Token;
export function DeleteSecurityContext(ctxtHandle: CtxtHandle): void;
