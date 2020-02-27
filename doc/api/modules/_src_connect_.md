[node-expose-sspi](../README.md) › ["src/connect"](_src_connect_.md)

# External module: "src/connect"

## Index

### Functions

* [connect](_src_connect_.md#connect)

## Functions

###  connect

▸ **connect**(`userCredential`: [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md)): *[SSO](../classes/_src_sso_.sso.md)*

*Defined in [src/connect.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/src/connect.ts#L13)*

Retrieves SSO information from an explicit credential (login/password and domain).
The SSO information will be retrieved only if the credential
matches a local account or a domain account.

**Parameters:**

Name | Type |
------ | ------ |
`userCredential` | [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md) |

**Returns:** *[SSO](../classes/_src_sso_.sso.md)*

the SSO object or undefined.
