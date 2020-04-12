[node-expose-sspi](../README.md) › ["src/sso/ServerContextHandleManager"](../modules/_src_sso_servercontexthandlemanager_.md) › [ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)

# Class: ServerContextHandleManager

## Hierarchy

* **ServerContextHandleManager**

## Index

### Constructors

* [constructor](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#constructor)

### Methods

* [getServerContextHandle](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#getservercontexthandle)
* [release](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#release)
* [set](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#set)
* [setCookieMode](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#setcookiemode)
* [tooLate](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#toolate)
* [waitForReleased](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L26)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_sso_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getServerContextHandle

▸ **getServerContextHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/sso/ServerContextHandleManager.ts:80](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L80)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  release

▸ **release**(): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L91)*

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:68](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  setCookieMode

▸ **setCookieMode**(`req`: IncomingMessage, `res`: OutgoingMessage): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | OutgoingMessage |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/sso/ServerContextHandleManager.ts:121](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L121)*

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

*Defined in [src/sso/ServerContextHandleManager.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/e5fb53c/src/sso/ServerContextHandleManager.ts#L39)*

**Returns:** *Promise‹void›*
