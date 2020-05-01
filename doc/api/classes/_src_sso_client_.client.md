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
* [setSSP](_src_sso_client_.client.md#setssp)
* [setTargetName](_src_sso_client_.client.md#settargetname)

## Methods

###  fetch

▸ **fetch**(`resource`: string, `init?`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client.ts:138](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L138)*

**Parameters:**

Name | Type |
------ | ------ |
`resource` | string |
`init?` | RequestInit |

**Returns:** *Promise‹Response›*

___

###  handleAuth

▸ **handleAuth**(`response`: Response, `resource`: string, `init`: RequestInit): *Promise‹Response›*

*Defined in [src/sso/client.ts:144](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L144)*

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

*Defined in [src/sso/client.ts:90](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`requestInit` | RequestInit |

**Returns:** *void*

___

###  saveCookies

▸ **saveCookies**(`response`: Response): *void*

*Defined in [src/sso/client.ts:76](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`response` | Response |

**Returns:** *void*

___

###  setCredentials

▸ **setCredentials**(`domain`: string, `user`: string, `password`: string): *void*

*Defined in [src/sso/client.ts:110](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L110)*

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

*Defined in [src/sso/client.ts:134](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L134)*

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

*Defined in [src/sso/client.ts:124](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/src/sso/client.ts#L124)*

Force the targetName to a value.

For Kerberos, the targetName is the SPN (Service Principal Name).

**`memberof`** Client

**Parameters:**

Name | Type |
------ | ------ |
`targetName` | string |

**Returns:** *void*
