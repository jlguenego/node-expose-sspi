[node-expose-sspi](../README.md) › ["src/userdb"](_src_userdb_.md)

# Module: "src/userdb"

## Index

### Functions

* [getDistinguishedName](_src_userdb_.md#getdistinguishedname)
* [getUser](_src_userdb_.md#getuser)
* [getUsers](_src_userdb_.md#getusers)
* [init](_src_userdb_.md#init)

### Object literals

* [database](_src_userdb_.md#const-database)

## Functions

###  getDistinguishedName

▸ **getDistinguishedName**(): *Promise‹string›*

*Defined in [src/userdb.ts:113](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L113)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

*Defined in [src/userdb.ts:38](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

*Defined in [src/userdb.ts:73](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L73)*

**Returns:** *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/userdb.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L25)*

This function is recommanded to be called before starting a server.

Purpose is to cache all Active Directory (AD) users for
performance during authentication, just for increasing performance.

Useless if you do not use AD.

**`export`** 

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/userdb.ts:9](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L9)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/userdb.ts:10](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/userdb.ts#L10)*
