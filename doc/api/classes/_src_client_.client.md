[node-expose-sspi](../README.md) › ["src/client"](../modules/_src_client_.md) › [Client](_src_client_.client.md)

# Class: Client

## Hierarchy

* **Client**

## Index

### Methods

* [fetch](_src_client_.client.md#fetch)
* [handleAuth](_src_client_.client.md#handleauth)
* [restituteCookies](_src_client_.client.md#restitutecookies)
* [saveCookies](_src_client_.client.md#savecookies)

## Methods

###  fetch

▸ **fetch**(`resource`: string, `init?`: RequestInit): *Promise‹Response›*

*Defined in [src/client.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/client.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`resource` | string |
`init?` | RequestInit |

**Returns:** *Promise‹Response›*

___

###  handleAuth

▸ **handleAuth**(`response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Defined in [src/client.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/client.ts#L39)*

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

*Defined in [src/client.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/client.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`requestInit` | RequestInit |

**Returns:** *void*

___

###  saveCookies

▸ **saveCookies**(`response`: Response): *void*

*Defined in [src/client.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/client.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | Response |

**Returns:** *void*
