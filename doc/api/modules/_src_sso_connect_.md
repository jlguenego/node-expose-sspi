[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/connect"](_src_sso_connect_.md)

# Module: "src/sso/connect"

## Index

### Functions

* [connect](_src_sso_connect_.md#connect)

## Functions

###  connect

▸ **connect**(`userCredential`: [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md)): *Promise‹[SSO](../classes/_src_sso_sso_.sso.md)›*

*Defined in [src/sso/connect.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/connect.ts#L23)*

Retrieves SSO information from an explicit credential (login/password and domain).
The SSO information will be retrieved only if the credential
matches a local account or a domain account.

**Parameters:**

Name | Type |
------ | ------ |
`userCredential` | [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md) |

**Returns:** *Promise‹[SSO](../classes/_src_sso_sso_.sso.md)›*

the SSO object.
