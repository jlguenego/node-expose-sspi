[node-expose-sspi](../README.md) › ["src/userdb"](_src_userdb_.md)

# Module: "src/userdb"

## Index

### Interfaces

* [ADUser](../interfaces/_src_userdb_.aduser.md)

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

*Defined in [src/userdb.ts:108](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L108)*

**Returns:** *Promise‹string›*

___

###  getUser

▸ **getUser**(`ldapFilter`: string): *Promise‹[ADUser](../interfaces/_src_userdb_.aduser.md)›*

*Defined in [src/userdb.ts:36](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`ldapFilter` | string |

**Returns:** *Promise‹[ADUser](../interfaces/_src_userdb_.aduser.md)›*

___

###  getUsers

▸ **getUsers**(): *Promise‹ADUsers›*

*Defined in [src/userdb.ts:72](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L72)*

**Returns:** *Promise‹ADUsers›*

___

###  init

▸ **init**(): *Promise‹void›*

*Defined in [src/userdb.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L23)*

**Returns:** *Promise‹void›*

## Object literals

### `Const` database

### ▪ **database**: *object*

*Defined in [src/userdb.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L19)*

###  users

• **users**: *undefined[]* = []

*Defined in [src/userdb.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/userdb.ts#L20)*
