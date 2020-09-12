[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/schm/SCHMWithSync"](../modules/_src_sso_schm_schmwithsync_.md) › [SCHMWithSync](_src_sso_schm_schmwithsync_.schmwithsync.md)

# Class: SCHMWithSync

## Hierarchy

* [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md)

  ↳ **SCHMWithSync**

## Index

### Constructors

* [constructor](_src_sso_schm_schmwithsync_.schmwithsync.md#constructor)

### Properties

* [req](_src_sso_schm_schmwithsync_.schmwithsync.md#req)
* [res](_src_sso_schm_schmwithsync_.schmwithsync.md#res)

### Methods

* [getCookieToken](_src_sso_schm_schmwithsync_.schmwithsync.md#getcookietoken)
* [getHandle](_src_sso_schm_schmwithsync_.schmwithsync.md#gethandle)
* [getMethod](_src_sso_schm_schmwithsync_.schmwithsync.md#getmethod)
* [interrupt](_src_sso_schm_schmwithsync_.schmwithsync.md#interrupt)
* [release](_src_sso_schm_schmwithsync_.schmwithsync.md#release)
* [setHandle](_src_sso_schm_schmwithsync_.schmwithsync.md#sethandle)
* [setMethod](_src_sso_schm_schmwithsync_.schmwithsync.md#setmethod)
* [waitForReleased](_src_sso_schm_schmwithsync_.schmwithsync.md#waitforreleased)

## Constructors

###  constructor

\+ **new SCHMWithSync**(`delayMax`: number): *[SCHMWithSync](_src_sso_schm_schmwithsync_.schmwithsync.md)*

*Defined in [src/sso/schm/SCHMWithSync.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L39)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`delayMax` | number | 20000 |

**Returns:** *[SCHMWithSync](_src_sso_schm_schmwithsync_.schmwithsync.md)*

## Properties

###  req

• **req**: *IncomingMessage*

*Inherited from [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[req](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#req)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:6](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L6)*

___

###  res

• **res**: *ServerResponse*

*Inherited from [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[res](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#res)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:7](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L7)*

## Methods

###  getCookieToken

▸ **getCookieToken**(`req`: IncomingMessage, `res`: ServerResponse): *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

*Inherited from [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getCookieToken](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#getcookietoken)*

*Defined in [src/sso/schm/ServerContextHandleManager.ts:9](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/ServerContextHandleManager.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |

**Returns:** *[CookieToken](../modules/_src_sso_interfaces_.md#cookietoken)*

___

###  getHandle

▸ **getHandle**(): *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-gethandle)*

*Defined in [src/sso/schm/SCHMWithSync.ts:74](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L74)*

**Returns:** *[CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) | undefined*

___

###  getMethod

▸ **getMethod**(): *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[getMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-getmethod)*

*Defined in [src/sso/schm/SCHMWithSync.ts:66](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L66)*

**Returns:** *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

___

###  interrupt

▸ **interrupt**(): *void*

*Defined in [src/sso/schm/SCHMWithSync.ts:108](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L108)*

after timeout, all the queue is removed and rejected.
does not go to its final state before timeout.

**`memberof`** ServerContextHandleManager

**Returns:** *void*

___

###  release

▸ **release**(): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[release](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-release)*

*Defined in [src/sso/schm/SCHMWithSync.ts:82](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L82)*

**Returns:** *void*

___

###  setHandle

▸ **setHandle**(`contextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[setHandle](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-sethandle)*

*Defined in [src/sso/schm/SCHMWithSync.ts:78](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`contextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  setMethod

▸ **setMethod**(`ssoMethod`: [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)): *void*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[setMethod](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-setmethod)*

*Defined in [src/sso/schm/SCHMWithSync.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`ssoMethod` | [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod) |

**Returns:** *void*

___

###  waitForReleased

▸ **waitForReleased**(): *Promise‹void›*

*Overrides [ServerContextHandleManager](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md).[waitForReleased](_src_sso_schm_servercontexthandlemanager_.servercontexthandlemanager.md#abstract-waitforreleased)*

*Defined in [src/sso/schm/SCHMWithSync.ts:45](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/schm/SCHMWithSync.ts#L45)*

**Returns:** *Promise‹void›*
