[node-expose-sspi](../README.md) › ["src/SSO"](../modules/_src_sso_.md) › [SSO](_src_sso_.sso.md)

# Class: SSO

## Hierarchy

* **SSO**

## Index

### Constructors

* [constructor](_src_sso_.sso.md#constructor)

### Properties

* [method](_src_sso_.sso.md#optional-method)
* [owner](_src_sso_.sso.md#owner)
* [user](_src_sso_.sso.md#user)

### Methods

* [getJSON](_src_sso_.sso.md#getjson)
* [load](_src_sso_.sso.md#load)
* [setOptions](_src_sso_.sso.md#setoptions)

## Constructors

###  constructor

\+ **new SSO**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `method?`: [SSOMethod](../modules/_src_sso_.md#ssomethod)): *[SSO](_src_sso_.sso.md)*

*Defined in [src/SSO.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`method?` | [SSOMethod](../modules/_src_sso_.md#ssomethod) |

**Returns:** *[SSO](_src_sso_.sso.md)*

## Properties

### `Optional` method

• **method**? : *[SSOMethod](../modules/_src_sso_.md#ssomethod)*

*Defined in [src/SSO.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L23)*

___

###  owner

• **owner**: *[User](../interfaces/_src_interfaces_.user.md)*

*Defined in [src/SSO.ts:14](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L14)*

___

###  user

• **user**: *[User](../interfaces/_src_interfaces_.user.md)*

*Defined in [src/SSO.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L13)*

## Methods

###  getJSON

▸ **getJSON**(): *this*

*Defined in [src/SSO.ts:105](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L105)*

**Returns:** *this*

___

###  load

▸ **load**(): *Promise‹void›*

*Defined in [src/SSO.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L26)*

**Returns:** *Promise‹void›*

___

###  setOptions

▸ **setOptions**(`options`: [AuthOptions](../interfaces/_src_interfaces_.authoptions.md)): *void*

*Defined in [src/SSO.ts:112](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/SSO.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | [AuthOptions](../interfaces/_src_interfaces_.authoptions.md) |

**Returns:** *void*
