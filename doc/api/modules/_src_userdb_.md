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

▸ **authIsReady**(): *Promise‹unknown›*

*Defined in [src/userdb.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L25)*

Waits until authentication middleware is ready.

When on domain, the sso.auth() function may takes time to init properly.
You should use authIsReady to wait for sso.auth() is completely ready.

**`export`** 

**Returns:** *Promise‹unknown›*

___

###  getDistinguishedName

▸ **getDistinguishedName**(): *Promise‹string›*

*Defined in [src/userdb.ts:123](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L123)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

*Defined in [src/userdb.ts:47](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_interfaces_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

*Defined in [src/userdb.ts:83](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L83)*

**Returns:** *Promise‹[ADUsers](_src_interfaces_.md#adusers)›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/userdb.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L33)*

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/userdb.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L12)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/userdb.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/userdb.ts#L13)*
