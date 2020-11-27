[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/user.d"](../modules/_lib_user_d_.md) › [WindowsUser](_lib_user_d_.windowsuser.md)

# Interface: WindowsUser

## Hierarchy

* **WindowsUser**

## Index

### Methods

* [AdjustTokenPrivileges](_lib_user_d_.windowsuser.md#adjusttokenprivileges)
* [ExitWindows](_lib_user_d_.windowsuser.md#exitwindows)
* [ExitWindowsEx](_lib_user_d_.windowsuser.md#exitwindowsex)
* [LookupPrivilegeValue](_lib_user_d_.windowsuser.md#lookupprivilegevalue)
* [PrivilegeCheck](_lib_user_d_.windowsuser.md#privilegecheck)

## Methods

###  AdjustTokenPrivileges

▸ **AdjustTokenPrivileges**(`input`: object): *void*

*Defined in [lib/user.d.ts:31](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/user.d.ts#L31)*

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

*Defined in [lib/user.d.ts:42](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/user.d.ts#L42)*

**Returns:** *void*

___

###  ExitWindowsEx

▸ **ExitWindowsEx**(`input`: object): *void*

*Defined in [lib/user.d.ts:44](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/user.d.ts#L44)*

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

*Defined in [lib/user.d.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/user.d.ts#L37)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`privilegeName` | string |
`systemName?` | undefined &#124; string |

**Returns:** *[Luid](_lib_user_d_.luid.md)*

___

###  PrivilegeCheck

▸ **PrivilegeCheck**(`input`: object): *boolean*

*Defined in [lib/user.d.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/user.d.ts#L25)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`accessToken` | [AccessToken](../modules/_lib_user_d_.md#accesstoken) |
`requireAll` | boolean |
`requiredPrivileges` | [TokenPrivileges](_lib_user_d_.tokenprivileges.md) |

**Returns:** *boolean*
