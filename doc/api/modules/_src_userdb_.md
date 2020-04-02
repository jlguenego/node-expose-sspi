[node-expose-sspi](../README.md) › ["src/userdb"](_src_userdb_.md)

# Module: "src/userdb"

## Index

### Functions

* [authIsReady](_src_userdb_.md#authisready)
* [getDistinguishedName](_src_userdb_.md#getdistinguishedname)
* [getUser](_src_userdb_.md#getuser)
* [getUsers](_src_userdb_.md#getusers)
* [init](_src_userdb_.md#init)

### Object literals

* [database](_src_userdb_.md#const-database)

## Functions

###  authIsReady

▸ **authIsReady**(): *Promise‹void›*

*Defined in [src/userdb.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L26)*

Waits until authentication middleware is ready.

When on domain, the sso.auth() function may takes time to init properly.
You should use authIsReady to wait for sso.auth() is completely ready.

**`export`** 

**Returns:** *Promise‹void›*

___

###  getDistinguishedName

▸ **getDistinguishedName**(): *Promise‹string›*

*Defined in [src/userdb.ts:139](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L139)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

*Defined in [src/userdb.ts:64](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

*Defined in [src/userdb.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L99)*

**Returns:** *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/userdb.ts:49](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L49)*

This function is recommanded to be called before starting a server.

Purpose is to cache all Active Directory (AD) users for
performance during authentication, just for increasing performance.

Useless if you do not use AD.

**`export`** 

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/userdb.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L13)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/userdb.ts:14](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/src/userdb.ts#L14)*
