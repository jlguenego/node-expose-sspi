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

*Defined in [src/sso/ServerContextHandleManager.ts:35](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getMethod

▸ **getMethod**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

*Defined in [src/sso/ServerContextHandleManager.ts:147](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L147)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

___

###  getServerContextHandle

▸ **getServerContextHandle**(`cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:90](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  initCookie

▸ **initCookie**(`req`: IncomingMessage, `res`: ServerResponse): *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

*Defined in [src/sso/ServerContextHandleManager.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |

**Returns:** *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

___

###  release

▸ **release**(`cookieToken?`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:98](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken?` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:81](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  setMethod

▸ **setMethod**(`method`: [SSOMethod](../modules/_src_sso_sso_.md#ssomethod), `cookieToken`: [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:138](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [SSOMethod](../modules/_src_sso_sso_.md#ssomethod) |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:128](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L128)*

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

*Defined in [src/sso/ServerContextHandleManager.ts:57](https://github.com/jlguenego/node-expose-sspi/blob/1283254/src/sso/ServerContextHandleManager.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`cookieToken` | [CookieToken](../modules/_src_sso_interfaces_.md#cookietoken) |

**Returns:** *Promise‹void›*
