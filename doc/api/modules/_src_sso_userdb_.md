[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/userdb"](_src_sso_userdb_.md)

# Module: "src/sso/userdb"

## Index

### Functions

* [getDistinguishedName](_src_sso_userdb_.md#getdistinguishedname)
* [getUser](_src_sso_userdb_.md#getuser)
* [getUsers](_src_sso_userdb_.md#getusers)
* [init](_src_sso_userdb_.md#init)

### Object literals

* [database](_src_sso_userdb_.md#const-database)

## Functions

###  getDistinguishedName

▸ **getDistinguishedName**(): *Promise‹string›*

*Defined in [src/sso/userdb.ts:135](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L135)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_sso_interfaces_.aduser.md)›*

*Defined in [src/sso/userdb.ts:40](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_sso_interfaces_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹[ADUsers](_src_sso_interfaces_.md#adusers)›*

*Defined in [src/sso/userdb.ts:85](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L85)*

**Returns:** *Promise‹[ADUsers](_src_sso_interfaces_.md#adusers)›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/sso/userdb.ts:27](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L27)*

This function is recommanded to be called before starting a server.

Purpose is to cache all Active Directory (AD) users for
performance during authentication, just for increasing performance.

Useless if you do not use AD.

**`export`** 

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/sso/userdb.ts:11](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L11)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/sso/userdb.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/userdb.ts#L12)*
