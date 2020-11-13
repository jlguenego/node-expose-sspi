[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/interfaces"](_src_sso_interfaces_.md)

# Module: "src/sso/interfaces"

## Index

### Modules

* ["express-session"](_src_sso_interfaces_._express_session_.md)
* ["http"](_src_sso_interfaces_._http_.md)

### Interfaces

* [ADUser](../interfaces/_src_sso_interfaces_.aduser.md)
* [AuthOptions](../interfaces/_src_sso_interfaces_.authoptions.md)
* [CookieList](../interfaces/_src_sso_interfaces_.cookielist.md)
* [Database](../interfaces/_src_sso_interfaces_.database.md)
* [SSOObject](../interfaces/_src_sso_interfaces_.ssoobject.md)
* [User](../interfaces/_src_sso_interfaces_.user.md)

### Type aliases

* [ADUsers](_src_sso_interfaces_.md#adusers)
* [CookieToken](_src_sso_interfaces_.md#cookietoken)
* [MessageType](_src_sso_interfaces_.md#messagetype)
* [Middleware](_src_sso_interfaces_.md#middleware)
* [NextFunction](_src_sso_interfaces_.md#nextfunction)
* [SSOMethod](_src_sso_interfaces_.md#ssomethod)

## Type aliases

###  ADUsers

Ƭ **ADUsers**: *[ADUser](../interfaces/_src_sso_interfaces_.aduser.md)[]*

*Defined in [src/sso/interfaces.ts:168](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L168)*

___

###  CookieToken

Ƭ **CookieToken**: *string*

*Defined in [src/sso/interfaces.ts:40](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L40)*

___

###  MessageType

Ƭ **MessageType**: *"Unknown" | "NTLM_NEGOTIATE_01" | "NTLM_CHALLENGE_02" | "NTLM_AUTHENTICATE_03" | "Kerberos_1" | "Kerberos_N"*

*Defined in [src/sso/interfaces.ts:42](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L42)*

___

###  Middleware

Ƭ **Middleware**: *function*

*Defined in [src/sso/interfaces.ts:34](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L34)*

#### Type declaration:

▸ (`req`: [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md), `res`: ServerResponse, `next`: [NextFunction](_src_sso_interfaces_.md#nextfunction)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md) |
`res` | ServerResponse |
`next` | [NextFunction](_src_sso_interfaces_.md#nextfunction) |

___

###  NextFunction

Ƭ **NextFunction**: *function*

*Defined in [src/sso/interfaces.ts:50](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L50)*

#### Type declaration:

▸ (`error?`: Error): *void | Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error |

___

###  SSOMethod

Ƭ **SSOMethod**: *"NTLM" | "Kerberos" | undefined*

*Defined in [src/sso/interfaces.ts:174](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/src/sso/interfaces.ts#L174)*
