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
* [Flag](../interfaces/_src_sso_interfaces_.flag.md)
* [Props](../interfaces/_src_sso_interfaces_.props.md)
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

*Defined in [src/sso/interfaces.ts:177](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L177)*

___

###  CookieToken

Ƭ **CookieToken**: *string*

*Defined in [src/sso/interfaces.ts:49](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L49)*

___

###  MessageType

Ƭ **MessageType**: *"Unknown" | "NTLM_NEGOTIATE_01" | "NTLM_CHALLENGE_02" | "NTLM_AUTHENTICATE_03" | "Kerberos_1" | "Kerberos_N"*

*Defined in [src/sso/interfaces.ts:51](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L51)*

___

###  Middleware

Ƭ **Middleware**: *function*

*Defined in [src/sso/interfaces.ts:43](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L43)*

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

*Defined in [src/sso/interfaces.ts:59](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L59)*

#### Type declaration:

▸ (`error?`: Error): *void | Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error |

___

###  SSOMethod

Ƭ **SSOMethod**: *"NTLM" | "Kerberos" | undefined*

*Defined in [src/sso/interfaces.ts:183](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/interfaces.ts#L183)*
