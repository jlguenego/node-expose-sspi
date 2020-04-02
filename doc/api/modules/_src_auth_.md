[node-expose-sspi](../README.md) › ["src/auth"](_src_auth_.md)

# Module: "src/auth"

## Index

### Functions

* [auth](_src_auth_.md#auth)

## Functions

###  auth

▸ **auth**(`options`: [AuthOptions](../interfaces/_src_interfaces_.authoptions.md)): *RequestHandler*

*Defined in [src/auth.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/src/auth.ts#L19)*

Tries to get SSO information from browser. If success, the SSO info
is stored under req.sso

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [AuthOptions](../interfaces/_src_interfaces_.authoptions.md) | {} |

**Returns:** *RequestHandler*

a middleware
