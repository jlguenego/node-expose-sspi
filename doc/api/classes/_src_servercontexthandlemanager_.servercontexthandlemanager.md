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
* [tooLate](_src_servercontexthandlemanager_.servercontexthandlemanager.md#toolate)
* [waitForReleased](_src_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/ServerContextHandleManager.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getServerContextHandle

▸ **getServerContextHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/ServerContextHandleManager.ts:41](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L41)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  release

▸ **release**(): *void*

*Defined in [src/ServerContextHandleManager.ts:45](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L45)*

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/ServerContextHandleManager.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  tooLate

▸ **tooLate**(`authItem`: AuthItem): *void*

*Defined in [src/ServerContextHandleManager.ts:57](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`authItem` | AuthItem |

**Returns:** *void*

___

###  waitForReleased

▸ **waitForReleased**(): *Promise‹unknown›*

*Defined in [src/ServerContextHandleManager.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/ServerContextHandleManager.ts#L20)*

**Returns:** *Promise‹unknown›*
