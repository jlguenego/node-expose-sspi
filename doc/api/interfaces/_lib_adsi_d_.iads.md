[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/adsi.d"](../modules/_lib_adsi_d_.md) › [IADs](_lib_adsi_d_.iads.md)

# Interface: IADs

## Hierarchy

* [IID](_lib_adsi_d_.iid.md)

  ↳ **IADs**

## Index

### Methods

* [Get](_lib_adsi_d_.iads.md#get)
* [GetInfoEx](_lib_adsi_d_.iads.md#getinfoex)
* [Release](_lib_adsi_d_.iads.md#release)
* [get_GUID](_lib_adsi_d_.iads.md#get_guid)
* [get_Name](_lib_adsi_d_.iads.md#get_name)

## Methods

###  Get

▸ **Get**(`name`: string): *Promise‹string›*

*Defined in [lib/adsi.d.ts:8](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/lib/adsi.d.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹string›*

___

###  GetInfoEx

▸ **GetInfoEx**(...`colNames`: string[]): *void*

*Defined in [lib/adsi.d.ts:13](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/lib/adsi.d.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`...colNames` | string[] |

**Returns:** *void*

___

###  Release

▸ **Release**(): *void*

*Inherited from [IID](_lib_adsi_d_.iid.md).[Release](_lib_adsi_d_.iid.md#release)*

*Defined in [lib/adsi.d.ts:4](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/lib/adsi.d.ts#L4)*

**Returns:** *void*

___

###  get_GUID

▸ **get_GUID**(): *string*

*Defined in [lib/adsi.d.ts:10](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/lib/adsi.d.ts#L10)*

**Returns:** *string*

___

###  get_Name

▸ **get_Name**(): *string*

*Defined in [lib/adsi.d.ts:12](https://github.com/jlguenego/node-expose-sspi/blob/f44ba74/lib/adsi.d.ts#L12)*

**Returns:** *string*
