[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/schm/ServerContextHandleManager"](../modules/_src_sso_schm_servercontexthandlemanager_.md) › [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md)

# Class: ServerContextHandleManager

## Hierarchy

* **ServerContextHandleManager**

## Index

### Properties

* [cache](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#cache)

### Methods

* [get](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#get)
* [refresh](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#refresh)
* [release](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#release)
* [set](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#set)

## Properties

###  cache

• **cache**: *Item[]* = []

*Defined in [src/sso/schm/ServerContextHandleManager.ts:18](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/schm/ServerContextHandleManager.ts#L18)*

## Methods

###  get

▸ **get**(`req`: [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md)): *undefined | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/schm/ServerContextHandleManager.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md) |

**Returns:** *undefined | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)*

___

###  refresh

▸ **refresh**(): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:44](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/schm/ServerContextHandleManager.ts#L44)*

**Returns:** *void*

___

###  release

▸ **release**(`req`: [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md)): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/schm/ServerContextHandleManager.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md) |

**Returns:** *void*

___

###  set

▸ **set**(`req`: [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md), `handle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/schm/ServerContextHandleManager.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | [IncomingMessage](../interfaces/_src_sso_interfaces_._http_.incomingmessage.md) |
`handle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*
