[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/ServerContextHandleManager"](../modules/_src_sso_servercontexthandlemanager_.md) › [ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)

# Class: ServerContextHandleManager

## Hierarchy

* **ServerContextHandleManager**

## Index

### Constructors

* [constructor](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#constructor)

### Methods

* [getMethod](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#getmethod)
* [getServerContextHandle](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#getservercontexthandle)
* [initCookie](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#initcookie)
* [release](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#release)
* [set](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#set)
* [setMethod](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#setmethod)
* [tooLate](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#toolate)
* [waitForReleased](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L33)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getMethod

▸ **getMethod**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

*Defined in [src/sso/ServerContextHandleManager.ts:148](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

___

###  getServerContextHandle

▸ **getServerContextHandle**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  initCookie

▸ **initCookie**(`req`: IncomingMessage, `res`: ServerResponse): *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

*Defined in [src/sso/ServerContextHandleManager.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |

**Returns:** *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

___

###  release

▸ **release**(`cookieToken?`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken?` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:82](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  setMethod

▸ **setMethod**(`method`: [SSOMethod](../modules/_src_sso_sso_.md#ssomethod), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:139](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L139)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [SSOMethod](../modules/_src_sso_sso_.md#ssomethod) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:129](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L129)*

Used only when a negotiate connection
does not go to its final state before timeout.

Note: Do not interfer with cookies.

**`memberof`** ServerContextHandleManager

**Parameters:**

Name | Type |
------ | ------ |
`authItem` | AuthItem |

**Returns:** *void*

___

###  waitForReleased

▸ **waitForReleased**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *Promise‹void›*

*Defined in [src/sso/ServerContextHandleManager.ts:54](https://github.com/jlguenego/node-expose-sspi/blob/cdfba3e/src/sso/ServerContextHandleManager.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *Promise‹void›*
