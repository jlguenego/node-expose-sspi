[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/NegotiateHandler"](../modules/_src_sso_client_negotiatehandler_.md) › [NegotiateHandler](_src_sso_client_negotiatehandler_.negotiatehandler.md)

# Class: NegotiateHandler

## Hierarchy

* [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md)

  ↳ **NegotiateHandler**

## Index

### Constructors

* [constructor](_src_sso_client_negotiatehandler_.negotiatehandler.md#constructor)

### Methods

* [handle](_src_sso_client_negotiatehandler_.negotiatehandler.md#handle)

## Constructors

###  constructor

\+ **new NegotiateHandler**(`authenticationType`: string): *[NegotiateHandler](_src_sso_client_negotiatehandler_.negotiatehandler.md)*

*Defined in [src/sso/client/NegotiateHandler.ts:18](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/client/NegotiateHandler.ts#L18)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`authenticationType` | string | "Negotiate" |

**Returns:** *[NegotiateHandler](_src_sso_client_negotiatehandler_.negotiatehandler.md)*

## Methods

###  handle

▸ **handle**(`clientInfo`: [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md), `clientCookie`: [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md), `response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Overrides [AbstractHandler](_src_sso_client_abstracthandler_.abstracthandler.md).[handle](_src_sso_client_abstracthandler_.abstracthandler.md#abstract-handle)*

*Defined in [src/sso/client/NegotiateHandler.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/client/NegotiateHandler.ts#L23)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clientInfo` | [ClientInfo](_src_sso_client_clientinfo_.clientinfo.md) | - |
`clientCookie` | [ClientCookie](_src_sso_client_clientcookie_.clientcookie.md) | - |
`response` | Response | - |
`resource` | string | - |
`init` | RequestInit | {} |

**Returns:** *Promise‹Response›*
