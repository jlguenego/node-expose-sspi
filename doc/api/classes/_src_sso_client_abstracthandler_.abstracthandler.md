[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/AbstractHandler"](../modules/_src_sso_client_abstracthandler_.md) › [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md)

# Class: AbstractHandler

## Hierarchy

* **AbstractHandler**

  ↳ [BasicHandler](_src_sso_client_basichandler_.basichandler.md)

  ↳ [DigestHandler](_src_sso_client_digesthandler_.digesthandler.md)

  ↳ [NegotiateHandler](_src_sso_client_negotiatehandler_.negotiatehandler.md)

## Index

### Methods

* [handle](_src_sso_client_abstracthandler_.abstracthandler.md#abstract-handle)

## Methods

### `Abstract` handle

▸ **handle**(`clientInfo`: [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md), `clientCookie`: [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md), `response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client/AbstractHandler.ts:6](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/client/AbstractHandler.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`clientInfo` | [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md) |
`clientCookie` | [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md) |
`response` | Response |
`resource` | string |
`init` | RequestInit |

**Returns:** *Promise‹Response›*
