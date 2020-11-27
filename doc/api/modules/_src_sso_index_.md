[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/index"](_src_sso_index_.md)

# Module: "src/sso/index"

## Index

### References

* [ADUser](_src_sso_index_.md#aduser)
* [ADUsers](_src_sso_index_.md#adusers)
* [AuthOptions](_src_sso_index_.md#authoptions)
* [CookieList](_src_sso_index_.md#cookielist)
* [CookieToken](_src_sso_index_.md#cookietoken)
* [Database](_src_sso_index_.md#database)
* [Flag](_src_sso_index_.md#flag)
* [MessageType](_src_sso_index_.md#messagetype)
* [Middleware](_src_sso_index_.md#middleware)
* [NextFunction](_src_sso_index_.md#nextfunction)
* [SSOMethod](_src_sso_index_.md#ssomethod)
* [SSOObject](_src_sso_index_.md#ssoobject)
* [SSOOptions](_src_sso_index_.md#ssooptions)
* [User](_src_sso_index_.md#user)

### Object literals

* [sso](_src_sso_index_.md#const-sso)

## References

###  ADUser

• **ADUser**:

___

###  ADUsers

• **ADUsers**:

___

###  AuthOptions

• **AuthOptions**:

___

###  CookieList

• **CookieList**:

___

###  CookieToken

• **CookieToken**:

___

###  Database

• **Database**:

___

###  Flag

• **Flag**:

___

###  MessageType

• **MessageType**:

___

###  Middleware

• **Middleware**:

___

###  NextFunction

• **NextFunction**:

___

###  SSOMethod

• **SSOMethod**:

___

###  SSOObject

• **SSOObject**:

___

###  SSOOptions

• **SSOOptions**:

___

###  User

• **User**:

## Object literals

### `Const` sso

### ▪ **sso**: *object*

*Defined in [src/sso/index.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L29)*

Wrapper object sso. Everything written in Typescript that is
exported from this module is accessible via the `sso` constant object.

**`export`** 

###  Client

• **Client**: *[Client](../classes/_src_sso_client_.client.md)*

*Defined in [src/sso/index.ts:34](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L34)*

###  Mutex

• **Mutex**: *[Mutex](../classes/_src_sso_mutex_.mutex.md)*

*Defined in [src/sso/index.ts:47](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L47)*

###  SPN

• **SPN**: *[SPN](../classes/_src_sso_spn_.spn.md)*

*Defined in [src/sso/index.ts:52](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L52)*

###  SSO

• **SSO**: *[SSO](../classes/_src_sso_sso_.sso.md)*

*Defined in [src/sso/index.ts:50](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L50)*

###  auth

• **auth**: *[auth](_src_sso_auth_.md#auth)*

*Defined in [src/sso/index.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L30)*

###  closeADConnection

• **closeADConnection**: *[closeADConnection](_src_sso_adconnection_.md#closeadconnection)*

*Defined in [src/sso/index.ts:31](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L31)*

###  connect

• **connect**: *[connect](_src_sso_connect_.md#connect)*

*Defined in [src/sso/index.ts:32](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L32)*

###  database

• **database**: *[Database](../interfaces/_src_sso_interfaces_.database.md)*

*Defined in [src/sso/index.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L33)*

###  decode

• **decode**: *[decode](_src_sso_misc_.md#decode)*

*Defined in [src/sso/index.ts:35](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L35)*

###  encode

• **encode**: *[encode](_src_sso_misc_.md#encode)*

*Defined in [src/sso/index.ts:36](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L36)*

###  getDefaultDomain

• **getDefaultDomain**: *[getDefaultDomain](_src_sso_domain_.md#getdefaultdomain)*

*Defined in [src/sso/index.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L37)*

###  getSPNFromURI

• **getSPNFromURI**: *[getSPNFromURI](_src_sso_client_misc_.md#getspnfromuri)*

*Defined in [src/sso/index.ts:38](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L38)*

###  getStatusInfo

• **getStatusInfo**: *[getStatusInfo](_src_sso_status_.md#getstatusinfo)*

*Defined in [src/sso/index.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L39)*

###  getUser

• **getUser**: *[getUser](_src_sso_userdb_.md#getuser)*

*Defined in [src/sso/index.ts:40](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L40)*

###  getUsers

• **getUsers**: *[getUsers](_src_sso_userdb_.md#getusers)*

*Defined in [src/sso/index.ts:41](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L41)*

###  hasAdminPrivileges

• **hasAdminPrivileges**: *[hasAdminPrivileges](_src_sso_uac_.md#hasadminprivileges)*

*Defined in [src/sso/index.ts:42](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L42)*

###  hexDump

• **hexDump**: *[hexDump](_src_sso_misc_.md#hexdump)*

*Defined in [src/sso/index.ts:43](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L43)*

###  init

• **init**: *[init](_src_sso_userdb_.md#init)*

*Defined in [src/sso/index.ts:44](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L44)*

###  isActiveDirectoryReachable

• **isActiveDirectoryReachable**: *[isActiveDirectoryReachable](_src_sso_domain_.md#isactivedirectoryreachable)*

*Defined in [src/sso/index.ts:46](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L46)*

###  isOnDomain

• **isOnDomain**: *[isOnDomain](_src_sso_domain_.md#isondomain)*

*Defined in [src/sso/index.ts:45](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L45)*

###  negotiateParse

• **negotiateParse**: *[negotiateParse](_src_sso_msgparser_.md#negotiateparse)*

*Defined in [src/sso/index.ts:48](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L48)*

###  openADConnection

• **openADConnection**: *[openADConnection](_src_sso_adconnection_.md#openadconnection)*

*Defined in [src/sso/index.ts:49](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L49)*

###  sleep

• **sleep**: *[sleep](_src_sso_sleep_.md#sleep)*

*Defined in [src/sso/index.ts:51](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/index.ts#L51)*
