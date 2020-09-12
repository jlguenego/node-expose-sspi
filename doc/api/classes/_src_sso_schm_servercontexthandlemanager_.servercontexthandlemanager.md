[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/schm/ServerContextHandleManager"](../modules/_src_sso_schm_servercontexthandlemanager_.md) › [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md)

# Class: ServerContextHandleManager

## Hierarchy

* **ServerContextHandleManager**

  ↳ [SCHMWithCookies](_src_sso_schm_schmwithcookies_.schmwithcookies.md)

  ↳ [SCHMWithSync](_src_sso_schm_schmwithsync_.schmwithsync.md)

## Index

### Properties

* [req](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#req)
* [res](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#res)

### Methods

* [getCookieToken](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#getcookietoken)
* [getHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-gethandle)
* [getMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-getmethod)
* [release](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-release)
* [setHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-sethandle)
* [setMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-setmethod)
* [waitForReleased](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-waitforreleased)

## Properties

###  req

• **req**: *IncomingMessage*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:6](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L6)*

___

###  res

• **res**: *ServerResponse*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:7](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L7)*

## Methods

###  getCookieToken

▸ **getCookieToken**(`req`: IncomingMessage, `res`: ServerResponse): *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:9](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |

**Returns:** *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

___

### `Abstract` getHandle

▸ **getHandle**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:21](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

___

### `Abstract` getMethod

▸ **getMethod**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:17](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

___

### `Abstract` release

▸ **release**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:32](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L32)*

At the end of the negotiation this method MUST be called to release the context handle.

**`abstract`** 

**`memberof`** ServerContextHandleManager

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

### `Abstract` setHandle

▸ **setHandle**(`contextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L23)*

**Parameters:**

Name | Type |
------ | ------ |
`contextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

### `Abstract` setMethod

▸ **setMethod**(`ssoMethod`: [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`ssoMethod` | [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

### `Abstract` waitForReleased

▸ **waitForReleased**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *Promise‹void›*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:15](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *Promise‹void›*
