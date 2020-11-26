[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/schm/SCHMWithCookies"](../modules/_src_sso_schm_schmwithcookies_.md) › [SCHMWithCookies](_src_sso_schm_schmwithcookies_.schmwithcookies.md)

# Class: SCHMWithCookies

## Hierarchy

* [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md)

  ↳ **SCHMWithCookies**

## Index

### Properties

* [req](_src_sso_schm_schmwithcookies_.schmwithcookies.md#req)
* [res](_src_sso_schm_schmwithcookies_.schmwithcookies.md#res)

### Methods

* [getCookieToken](_src_sso_schm_schmwithcookies_.schmwithcookies.md#getcookietoken)
* [getHandle](_src_sso_schm_schmwithcookies_.schmwithcookies.md#gethandle)
* [getMethod](_src_sso_schm_schmwithcookies_.schmwithcookies.md#getmethod)
* [release](_src_sso_schm_schmwithcookies_.schmwithcookies.md#release)
* [setHandle](_src_sso_schm_schmwithcookies_.schmwithcookies.md#sethandle)
* [setMethod](_src_sso_schm_schmwithcookies_.schmwithcookies.md#setmethod)
* [waitForReleased](_src_sso_schm_schmwithcookies_.schmwithcookies.md#waitforreleased)

## Properties

###  req

• **req**: *[IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md)*

*Inherited from [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[req](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#req)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:6](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/ServerContextHandleManager.ts#L6)*

___

###  res

• **res**: *ServerResponse*

*Inherited from [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[res](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#res)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:7](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/ServerContextHandleManager.ts#L7)*

## Methods

###  getCookieToken

▸ **getCookieToken**(`req`: [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md), `res`: ServerResponse): *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getCookieToken](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#getcookietoken)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md) |
`res` | ServerResponse |

**Returns:** *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

___

###  getHandle

▸ **getHandle**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-gethandle)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:60](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

___

###  getMethod

▸ **getMethod**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-getmethod)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:47](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

___

###  release

▸ **release**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[release](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-release)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:81](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L81)*

At the end of the negotiation this method MUST be called to release the context handle.

**`abstract`** 

**`memberof`** ServerContextHandleManager

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  setHandle

▸ **setHandle**(`contextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[setHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-sethandle)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:66](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`contextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  setMethod

▸ **setMethod**(`ssoMethod`: [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[setMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-setmethod)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:52](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`ssoMethod` | [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  waitForReleased

▸ **waitForReleased**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *Promise‹void›*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[waitForReleased](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-waitforreleased)*

*Defined in [src/sso/schm/SCHMWithCookies.ts:42](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/schm/SCHMWithCookies.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *Promise‹void›*
