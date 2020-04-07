[node-expose-sspi](../README.md) › ["src/connect"](_src_connect_.md)

# Module: "src/connect"

## Index

### Functions

* [connect](_src_connect_.md#connect)

## Functions

###  connect

▸ **connect**(`userCredential`: [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md)): *Promise‹[SSO](../classes/_src_sso_.sso.md)›*

*Defined in [src/connect.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/src/connect.ts#L22)*

Retrieves SSO information from an explicit credential (login/password and domain).
The SSO information will be retrieved only if the credential
matches a local account or a domain account.

**Parameters:**

Name | Type |
------ | ------ |
`userCredential` | [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md) |

**Returns:** *Promise‹[SSO](../classes/_src_sso_.sso.md)›*

the SSO object or undefined.
