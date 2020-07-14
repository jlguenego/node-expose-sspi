[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/uac"](_src_sso_uac_.md)

# Module: "src/sso/uac"

## Index

### Functions

* [hasAdminPrivileges](_src_sso_uac_.md#hasadminprivileges)

## Functions

###  hasAdminPrivileges

▸ **hasAdminPrivileges**(): *boolean*

*Defined in [src/sso/uac.ts:15](https://github.com/jlguenego/node-expose-sspi/blob/133c769/src/sso/uac.ts#L15)*

Test if the current user token has admin privileges.

If this function return false, it means that operations that
requires admin rights cannot be done, even if the account is
configured with admin right. Functions that require admin right
would return the error 5 (admin right required).

Example: `netapi.NetUserAdd` function can be called only
if the user token has admin privilege.

**`export`** 

**Returns:** *boolean*
