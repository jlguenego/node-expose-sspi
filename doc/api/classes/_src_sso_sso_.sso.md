[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/SSO"](../modules/_src_sso_sso_.md) › [SSO](_src_sso_sso_.sso.md)

# Class: SSO

## Hierarchy

* **SSO**

## Index

### Constructors

* [constructor](_src_sso_sso_.sso.md#constructor)

### Properties

* [method](_src_sso_sso_.sso.md#optional-method)
* [owner](_src_sso_sso_.sso.md#owner)
* [user](_src_sso_sso_.sso.md#user)

### Methods

* [getJSON](_src_sso_sso_.sso.md#getjson)
* [load](_src_sso_sso_.sso.md#load)
* [setOptions](_src_sso_sso_.sso.md#setoptions)

## Constructors

###  constructor

\+ **new SSO**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `method?`: [SSOMethod](../modules/_src_sso_sso_.md#ssomethod)): *[SSO](_src_sso_sso_.sso.md)*

*Defined in [src/sso/SSO.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`method?` | [SSOMethod](../modules/_src_sso_sso_.md#ssomethod) |

**Returns:** *[SSO](_src_sso_sso_.sso.md)*

## Properties

### `Optional` method

• **method**? : *[SSOMethod](../modules/_src_sso_sso_.md#ssomethod)*

*Defined in [src/sso/SSO.ts:24](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L24)*

___

###  owner

• **owner**: *[User](../interfaces/_src_sso_interfaces_.user.md)*

*Defined in [src/sso/SSO.ts:14](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L14)*

___

###  user

• **user**: *[User](../interfaces/_src_sso_interfaces_.user.md)*

*Defined in [src/sso/SSO.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L13)*

## Methods

###  getJSON

▸ **getJSON**(): *[SSO](_src_sso_sso_.sso.md)*

*Defined in [src/sso/SSO.ts:113](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L113)*

**Returns:** *[SSO](_src_sso_sso_.sso.md)*

___

###  load

▸ **load**(): *Promise‹void›*

*Defined in [src/sso/SSO.ts:27](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L27)*

**Returns:** *Promise‹void›*

___

###  setOptions

▸ **setOptions**(`options`: [AuthOptions](../interfaces/_src_sso_interfaces_.authoptions.md)): *void*

*Defined in [src/sso/SSO.ts:120](https://github.com/jlguenego/node-expose-sspi/blob/c6cfc34/src/sso/SSO.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [AuthOptions](../interfaces/_src_sso_interfaces_.authoptions.md) |

**Returns:** *void*
