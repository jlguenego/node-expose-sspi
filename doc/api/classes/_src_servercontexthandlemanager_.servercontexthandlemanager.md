[node-expose-sspi](../README.md) › ["src/ServerContextHandleManager"](../modules/_src_servercontexthandlemanager_.md) › [ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)

# Class: ServerContextHandleManager

## Hierarchy

* **ServerContextHandleManager**

## Index

### Constructors

* [constructor](_src_servercontexthandlemanager_.servercontexthandlemanager.md#constructor)

### Methods

* [getServerContextHandle](_src_servercontexthandlemanager_.servercontexthandlemanager.md#getservercontexthandle)
* [release](_src_servercontexthandlemanager_.servercontexthandlemanager.md#release)
* [set](_src_servercontexthandlemanager_.servercontexthandlemanager.md#set)
* [setCookieMode](_src_servercontexthandlemanager_.servercontexthandlemanager.md#setcookiemode)
* [tooLate](_src_servercontexthandlemanager_.servercontexthandlemanager.md#toolate)
* [waitForReleased](_src_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/ServerContextHandleManager.ts:28](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L28)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getServerContextHandle

▸ **getServerContextHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/ServerContextHandleManager.ts:82](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L82)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  release

▸ **release**(): *void*

*Defined in [src/ServerContextHandleManager.ts:93](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L93)*

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/ServerContextHandleManager.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  setCookieMode

▸ **setCookieMode**(`req`: IncomingMessage, `res`: OutgoingMessage): *void*

*Defined in [src/ServerContextHandleManager.ts:32](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | OutgoingMessage |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/ServerContextHandleManager.ts:123](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L123)*

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

▸ **waitForReleased**(): *Promise‹unknown›*

*Defined in [src/ServerContextHandleManager.ts:41](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/ServerContextHandleManager.ts#L41)*

**Returns:** *Promise‹unknown›*
