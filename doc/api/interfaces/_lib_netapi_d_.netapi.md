[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/netapi.d"](../modules/_lib_netapi_d_.md) › [NetApi](_lib_netapi_d_.netapi.md)

# Interface: NetApi

## Hierarchy

* **NetApi**

## Index

### Methods

* [NetUserAdd](_lib_netapi_d_.netapi.md#netuseradd)
* [NetUserDel](_lib_netapi_d_.netapi.md#netuserdel)

## Methods

###  NetUserAdd

▸ **NetUserAdd**(`serverName`: string | undefined, `levelData`: number, `userInfo`: [UserInfo1](_lib_netapi_d_.userinfo1.md)): *void*

*Defined in [lib/netapi.d.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/netapi.d.ts#L25)*

create a windows user account.

By default userInfo flags is set to `['UF_SCRIPT']`.

**`memberof`** NetApi

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`serverName` | string &#124; undefined | if undefined, then create a local account. |
`levelData` | number | - |
`userInfo` | [UserInfo1](_lib_netapi_d_.userinfo1.md) | specify username and password. |

**Returns:** *void*

___

###  NetUserDel

▸ **NetUserDel**(`serverName`: string | undefined, `username`: string): *void*

*Defined in [lib/netapi.d.ts:38](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/netapi.d.ts#L38)*

delete a windows user account

**`memberof`** NetApi

**Parameters:**

Name | Type |
------ | ------ |
`serverName` | string &#124; undefined |
`username` | string |

**Returns:** *void*
