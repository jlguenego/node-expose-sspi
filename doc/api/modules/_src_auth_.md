[node-expose-sspi](../README.md) › ["src/auth"](_src_auth_.md)

# Module: "src/auth"

## Index

### Functions

* [auth](_src_auth_.md#auth)

## Functions

###  auth

▸ **auth**(): *RequestHandler*

*Defined in [src/auth.ts:15](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/auth.ts#L15)*

Tries to get SSO information from browser. If success, the SSO info
is stored under req.sso

**Returns:** *RequestHandler*

a middleware
