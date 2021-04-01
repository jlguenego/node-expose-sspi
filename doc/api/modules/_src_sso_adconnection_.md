[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/adConnection"](_src_sso_adconnection_.md)

# Module: "src/sso/adConnection"

## Index

### Functions

* [closeADConnection](_src_sso_adconnection_.md#closeadconnection)
* [openADConnection](_src_sso_adconnection_.md#openadconnection)

## Functions

###  closeADConnection

▸ **closeADConnection**(): *void*

*Defined in [src/sso/adConnection.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/adConnection.ts#L30)*

Close an Active Directory connection only if nobodyelse still use a connection.

**`export`** 

**Returns:** *void*

___

###  openADConnection

▸ **openADConnection**(): *void*

*Defined in [src/sso/adConnection.ts:14](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/adConnection.ts#L14)*

Open an Active Directory connection only if no connection is already open.

**`export`** 

**Returns:** *void*
