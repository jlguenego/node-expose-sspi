[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/NegotiateHandler"](../modules/_src_sso_client_negotiatehandler_.md) › [NegotiateHandler](_src_sso_client_negotiatehandler_.negotiatehandler.md)

# Class: NegotiateHandler

## Hierarchy

* [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md)

  ↳ **NegotiateHandler**

## Index

### Methods

* [handle](_src_sso_client_negotiatehandler_.negotiatehandler.md#handle)

## Methods

###  handle

▸ **handle**(`clientInfo`: [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md), `clientCookie`: [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md), `response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Overrides [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md).[handle](_src_sso_client_abstracthandler_.abstracthandler.md#abstract-handle)*

*Defined in [src/sso/client/NegotiateHandler.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/src/sso/client/NegotiateHandler.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientInfo` | [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md) | - |
`clientCookie` | [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md) | - |
`response` | Response | - |
`resource` | string | - |
`init` | RequestInit | {} |

**Returns:** *Promise‹Response›*
