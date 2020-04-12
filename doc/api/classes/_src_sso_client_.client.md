[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client"](../modules/_src_sso_client_.md) › [Client](_src_sso_client_.client.md)

# Class: Client

## Hierarchy

* **Client**

## Index

### Methods

* [fetch](_src_sso_client_.client.md#fetch)
* [handleAuth](_src_sso_client_.client.md#handleauth)
* [restituteCookies](_src_sso_client_.client.md#restitutecookies)
* [saveCookies](_src_sso_client_.client.md#savecookies)
* [setCredentials](_src_sso_client_.client.md#setcredentials)

## Methods

###  fetch

▸ **fetch**(`resource`: string, `init?`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/client.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`resource` | string |
`init?` | RequestInit |

**Returns:** *Promise‹Response›*

___

###  handleAuth

▸ **handleAuth**(`response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client.ts:105](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/client.ts#L105)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`response` | Response | - |
`resource` | string | - |
`init` | RequestInit | {} |

**Returns:** *Promise‹Response›*

___

###  restituteCookies

▸ **restituteCookies**(`requestInit`: RequestInit): *void*

*Defined in [src/sso/client.ts:83](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/client.ts#L83)*

**Parameters:**

Name | Type |
------ | ------ |
`requestInit` | RequestInit |

**Returns:** *void*

___

###  saveCookies

▸ **saveCookies**(`response`: Response): *void*

*Defined in [src/sso/client.ts:69](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/client.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | Response |

**Returns:** *void*

___

###  setCredentials

▸ **setCredentials**(`domain`: string, `user`: string, `password`: string): *void*

*Defined in [src/sso/client.ts:93](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/src/sso/client.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`domain` | string |
`user` | string |
`password` | string |

**Returns:** *void*
