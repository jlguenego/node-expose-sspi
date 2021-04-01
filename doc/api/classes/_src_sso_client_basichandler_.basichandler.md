[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/BasicHandler"](../modules/_src_sso_client_basichandler_.md) › [BasicHandler](_src_sso_client_basichandler_.basichandler.md)

# Class: BasicHandler

## Hierarchy

* [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md)

  ↳ **BasicHandler**

## Index

### Methods

* [handle](_src_sso_client_basichandler_.basichandler.md#handle)

## Methods

###  handle

▸ **handle**(`clientInfo`: [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md), `clientCookie`: [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md), `response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Overrides [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md).[handle](_src_sso_client_abstracthandler_.abstracthandler.md#abstract-handle)*

*Defined in [src/sso/client/BasicHandler.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/client/BasicHandler.ts#L12)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientInfo` | [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md) | - |
`clientCookie` | [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md) | - |
`response` | Response | - |
`resource` | string | - |
`init` | RequestInit | {} |

**Returns:** *Promise‹Response›*
