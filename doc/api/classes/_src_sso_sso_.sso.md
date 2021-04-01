[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/SSO"](../modules/_src_sso_sso_.md) › [SSO](_src_sso_sso_.sso.md)

# Class: SSO

## Hierarchy

* **SSO**

## Index

### Constructors

* [constructor](_src_sso_sso_.sso.md#constructor)

### Properties

* [method](_src_sso_sso_.sso.md#method)
* [owner](_src_sso_sso_.sso.md#owner)
* [user](_src_sso_sso_.sso.md#user)

### Methods

* [getJSON](_src_sso_sso_.sso.md#getjson)
* [load](_src_sso_sso_.sso.md#load)
* [setOptions](_src_sso_sso_.sso.md#setoptions)

## Constructors

###  constructor

\+ **new SSO**(`serverContextHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `method`: [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)): *[SSO](_src_sso_sso_.sso.md)*

*Defined in [src/sso/SSO.ts:18](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`serverContextHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`method` | [SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod) |

**Returns:** *[SSO](_src_sso_sso_.sso.md)*

## Properties

###  method

• **method**: *[SSOMethod](../modules/_src_sso_interfaces_.md#ssomethod)*

*Defined in [src/sso/SSO.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L22)*

___

###  owner

• **owner**: *[User](../interfaces/_src_sso_interfaces_.user.md)*

*Defined in [src/sso/SSO.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L12)*

___

###  user

• **user**: *[User](../interfaces/_src_sso_interfaces_.user.md)*

*Defined in [src/sso/SSO.ts:11](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L11)*

## Methods

###  getJSON

▸ **getJSON**(): *[SSOObject](../interfaces/_src_sso_interfaces_.ssoobject.md)*

*Defined in [src/sso/SSO.ts:134](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L134)*

**Returns:** *[SSOObject](../interfaces/_src_sso_interfaces_.ssoobject.md)*

___

###  load

▸ **load**(): *Promise‹void›*

*Defined in [src/sso/SSO.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L25)*

**Returns:** *Promise‹void›*

___

###  setOptions

▸ **setOptions**(`options`: Partial‹[SSOOptions](../interfaces/_src_sso_interfaces_.ssooptions.md)›): *void*

*Defined in [src/sso/SSO.ts:145](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/SSO.ts#L145)*

**Parameters:**

Name | Type |
------ | ------ |
`options` | Partial‹[SSOOptions](../interfaces/_src_sso_interfaces_.ssooptions.md)› |

**Returns:** *void*
