[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/user.d"](../modules/_lib_user_d_.md) › [User](_lib_user_d_.user.md)

# Interface: User

## Hierarchy

* **User**

## Index

### Methods

* [AdjustTokenPrivileges](_lib_user_d_.user.md#adjusttokenprivileges)
* [ExitWindows](_lib_user_d_.user.md#exitwindows)
* [ExitWindowsEx](_lib_user_d_.user.md#exitwindowsex)
* [LookupPrivilegeValue](_lib_user_d_.user.md#lookupprivilegevalue)

## Methods

###  AdjustTokenPrivileges

▸ **AdjustTokenPrivileges**(`input`: object): *void*

*Defined in [lib/user.d.ts:24](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/user.d.ts#L24)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`accessToken` | [AccessToken](../modules/_lib_user_d_.md#accesstoken) |
`disableAllPrivileges` | boolean |
`newState?` | [TokenPrivileges](_lib_user_d_.tokenprivileges.md) |

**Returns:** *void*

___

###  ExitWindows

▸ **ExitWindows**(): *void*

*Defined in [lib/user.d.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/user.d.ts#L33)*

**Returns:** *void*

___

###  ExitWindowsEx

▸ **ExitWindowsEx**(`input`: object): *void*

*Defined in [lib/user.d.ts:34](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/user.d.ts#L34)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`flag` | [EwxFlag](../modules/_lib_flags_index_d_.md#ewxflag) |
`reason` | [ShutdownReasonFlag](../modules/_lib_flags_index_d_.md#shutdownreasonflag)[] |

**Returns:** *void*

___

###  LookupPrivilegeValue

▸ **LookupPrivilegeValue**(`input`: object): *[Luid](_lib_user_d_.luid.md)*

*Defined in [lib/user.d.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/user.d.ts#L29)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`privilegeName` | string |
`systemName?` | undefined &#124; string |

**Returns:** *[Luid](_lib_user_d_.luid.md)*
