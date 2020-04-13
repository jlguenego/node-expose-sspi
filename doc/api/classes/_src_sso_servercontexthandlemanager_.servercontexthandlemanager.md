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
* [release](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#release)
* [set](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#set)
* [setCookieMode](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#setcookiemode)
* [setMethod](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#setmethod)
* [tooLate](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#toolate)
* [waitForReleased](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L29)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getMethod

▸ **getMethod**(): *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

*Defined in [src/sso/ServerContextHandleManager.ts:138](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L138)*

**Returns:** *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

___

###  getServerContextHandle

▸ **getServerContextHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:83](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L83)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  release

▸ **release**(): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:94](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L94)*

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:71](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L71)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  setCookieMode

▸ **setCookieMode**(`req`: IncomingMessage, `res`: OutgoingMessage): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | OutgoingMessage |

**Returns:** *void*

___

###  setMethod

▸ **setMethod**(`method`: [SSOMethod](../modules/_src_sso_sso_.md#ssomethod)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:134](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L134)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | [SSOMethod](../modules/_src_sso_sso_.md#ssomethod) |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:124](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L124)*

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

▸ **waitForReleased**(): *Promise‹void›*

*Defined in [src/sso/ServerContextHandleManager.ts:42](https://github.com/jlguenego/node-expose-sspi/blob/c79000f/src/sso/ServerContextHandleManager.ts#L42)*

**Returns:** *Promise‹void›*
