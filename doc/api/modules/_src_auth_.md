[node-expose-sspi](../README.md) › ["src/auth"](_src_auth_.md)

# Module: "src/auth"

## Index

### Functions

* [auth](_src_auth_.md#auth)

## Functions

###  auth

▸ **auth**(`options`: [AuthOptions](../interfaces/_src_interfaces_.authoptions.md)): *RequestHandler*

*Defined in [src/auth.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/auth.ts#L20)*

Tries to get SSO information from browser. If success, the SSO info
is stored under req.sso

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | [AuthOptions](../interfaces/_src_interfaces_.authoptions.md) | {} |

**Returns:** *RequestHandler*

a middleware
