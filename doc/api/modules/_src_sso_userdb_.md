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

*Defined in [src/sso/userdb.ts:134](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L134)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_sso_interfaces_.aduser.md)›*

*Defined in [src/sso/userdb.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_sso_interfaces_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹[ADUsers](_src_sso_interfaces_.md#adusers)›*

*Defined in [src/sso/userdb.ts:84](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L84)*

**Returns:** *Promise‹[ADUsers](_src_sso_interfaces_.md#adusers)›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/sso/userdb.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L26)*

This function is recommanded to be called before starting a server.

Purpose is to cache all Active Directory (AD) users for
performance during authentication, just for increasing performance.

Useless if you do not use AD.

**`export`** 

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/sso/userdb.ts:10](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L10)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/sso/userdb.ts:11](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/userdb.ts#L11)*
