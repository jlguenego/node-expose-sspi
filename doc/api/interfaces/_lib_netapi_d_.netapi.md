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

▸ **NetUserAdd**(`serverName`: string, `levelData`: number, `userInfo`: [UserInfo1](_lib_netapi_d_.userinfo1.md)): *void*

*Defined in [lib/netapi.d.ts:21](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/netapi.d.ts#L21)*

create a windows user account

**`memberof`** NetApi

**Parameters:**

Name | Type |
------ | ------ |
`serverName` | string |
`levelData` | number |
`userInfo` | [UserInfo1](_lib_netapi_d_.userinfo1.md) |

**Returns:** *void*

___

###  NetUserDel

▸ **NetUserDel**(`serverName`: string, `username`: string): *void*

*Defined in [lib/netapi.d.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/netapi.d.ts#L30)*

delete a windows user account

**`memberof`** NetApi

**Parameters:**

Name | Type |
------ | ------ |
`serverName` | string |
`username` | string |

**Returns:** *void*
