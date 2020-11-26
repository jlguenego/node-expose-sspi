[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/DigestHandler"](../modules/_src_sso_client_digesthandler_.md) › [DigestHandler](_src_sso_client_digesthandler_.digesthandler.md)

# Class: DigestHandler

## Hierarchy

* [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md)

  ↳ **DigestHandler**

## Index

### Methods

* [handle](_src_sso_client_digesthandler_.digesthandler.md#handle)

## Methods

###  handle

▸ **handle**(`clientInfo`: [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md), `clientCookie`: [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md), `response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Overrides [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md).[handle](_src_sso_client_abstracthandler_.abstracthandler.md#abstract-handle)*

*Defined in [src/sso/client/DigestHandler.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/client/DigestHandler.ts#L37)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientInfo` | [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md) | - |
`clientCookie` | [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md) | - |
`response` | Response | - |
`resource` | string | - |
`init` | RequestInit | {} |

**Returns:** *Promise‹Response›*
