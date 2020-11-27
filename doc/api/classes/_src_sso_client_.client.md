[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client"](../modules/_src_sso_client_.md) › [Client](_src_sso_client_.client.md)

# Class: Client

Allow to fetch url with a system that uses the negotiate protocol.
Cookies are managed if necessary during the process.

**`export`** 

## Hierarchy

* **Client**

## Index

### Properties

* [agent](_src_sso_client_.client.md#agent)
* [clientCookie](_src_sso_client_.client.md#clientcookie)
* [clientInfo](_src_sso_client_.client.md#clientinfo)

### Methods

* [fetch](_src_sso_client_.client.md#fetch)
* [setCredentials](_src_sso_client_.client.md#setcredentials)
* [setSSP](_src_sso_client_.client.md#setssp)
* [setTargetName](_src_sso_client_.client.md#settargetname)

## Properties

###  agent

• **agent**: *agent* = agent

*Defined in [src/sso/client.ts:34](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L34)*

___

###  clientCookie

• **clientCookie**: *[ClientCookie](_src_sso_client_clientcookie_.clientcookie.md)‹›* = new ClientCookie()

*Defined in [src/sso/client.ts:32](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L32)*

___

###  clientInfo

• **clientInfo**: *[ClientInfo](_src_sso_client_clientinfo_.clientinfo.md)‹›* = new ClientInfo()

*Defined in [src/sso/client.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L33)*

## Methods

###  fetch

▸ **fetch**(`resource`: string, `init?`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client.ts:83](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L83)*

Works as the fetch function of node-fetch node module.
This function can handle the negotiate protocol with SPNEGO tokens.

**`memberof`** Client

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`resource` | string | the URL to fetch |
`init?` | RequestInit | - |

**Returns:** *Promise‹Response›*

a promise with the HTTP response.

___

###  setCredentials

▸ **setCredentials**(`domain`: string, `user`: string, `password`: string): *void*

*Defined in [src/sso/client.ts:46](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L46)*

Set the credentials for running the client as another user.

By default, the credentials are the logged windows account.

**`memberof`** Client

**Parameters:**

Name | Type |
------ | ------ |
`domain` | string |
`user` | string |
`password` | string |

**Returns:** *void*

___

###  setSSP

▸ **setSSP**(`ssp`: [SecuritySupportProvider](../modules/_lib_sspi_d_.md#securitysupportprovider)): *void*

*Defined in [src/sso/client.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L70)*

Set the Security Support Provider (NTLM, Kerberos, Negotiate)

**`memberof`** Client

**Parameters:**

Name | Type |
------ | ------ |
`ssp` | [SecuritySupportProvider](../modules/_lib_sspi_d_.md#securitysupportprovider) |

**Returns:** *void*

___

###  setTargetName

▸ **setTargetName**(`targetName`: string): *void*

*Defined in [src/sso/client.ts:60](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client.ts#L60)*

Force the targetName to a value.

For Kerberos, the targetName is the SPN (Service Principal Name).

**`memberof`** Client

**Parameters:**

Name | Type |
------ | ------ |
`targetName` | string |

**Returns:** *void*
