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
* [waitForReleased](_src_servercontexthandlemanager_.servercontexthandlemanager.md#waitforreleased)

## Constructors

###  constructor

\+ **new ServerContextHandleManager**(`delayMax`: number): *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

*Defined in [src/ServerContextHandleManager.ts:7](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/ServerContextHandleManager.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[ServerContextHandleManager](_src_servercontexthandlemanager_.servercontexthandlemanager.md)*

## Methods

###  getServerContextHandle

▸ **getServerContextHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/ServerContextHandleManager.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/ServerContextHandleManager.ts#L29)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  release

▸ **release**(): *void*

*Defined in [src/ServerContextHandleManager.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/ServerContextHandleManager.ts#L33)*

**Returns:** *void*

___

###  set

▸ **set**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/ServerContextHandleManager.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/ServerContextHandleManager.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  waitForReleased

▸ **waitForReleased**(): *Promise‹unknown›*

*Defined in [src/ServerContextHandleManager.ts:11](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/ServerContextHandleManager.ts#L11)*

**Returns:** *Promise‹unknown›*
