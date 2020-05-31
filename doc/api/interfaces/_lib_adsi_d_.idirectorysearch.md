[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/adsi.d"](../modules/_lib_adsi_d_.md) › [IDirectorySearch](_lib_adsi_d_.idirectorysearch.md)

# Interface: IDirectorySearch

## Hierarchy

* [IID](_lib_adsi_d_.iid.md)

  ↳ **IDirectorySearch**

## Index

### Methods

* [ExecuteSearch](_lib_adsi_d_.idirectorysearch.md#executesearch)
* [GetColumn](_lib_adsi_d_.idirectorysearch.md#getcolumn)
* [GetFirstRow](_lib_adsi_d_.idirectorysearch.md#getfirstrow)
* [GetNextColumnName](_lib_adsi_d_.idirectorysearch.md#getnextcolumnname)
* [GetNextRow](_lib_adsi_d_.idirectorysearch.md#getnextrow)
* [Release](_lib_adsi_d_.idirectorysearch.md#release)
* [SetSearchPreference](_lib_adsi_d_.idirectorysearch.md#setsearchpreference)

## Methods

###  ExecuteSearch

▸ **ExecuteSearch**(`input`: object): *void*

*Defined in [lib/adsi.d.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L23)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`filter` | string |

**Returns:** *void*

___

###  GetColumn

▸ **GetColumn**(`colName`: string): *Promise‹[ColumnVal](../modules/_lib_adsi_d_.md#columnval)›*

*Defined in [lib/adsi.d.ts:27](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`colName` | string |

**Returns:** *Promise‹[ColumnVal](../modules/_lib_adsi_d_.md#columnval)›*

___

###  GetFirstRow

▸ **GetFirstRow**(): *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L25)*

**Returns:** *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

___

###  GetNextColumnName

▸ **GetNextColumnName**(): *string | [HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L26)*

**Returns:** *string | [HRESULT](../modules/_lib_adsi_d_.md#hresult)*

___

###  GetNextRow

▸ **GetNextRow**(): *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:24](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L24)*

**Returns:** *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

___

###  Release

▸ **Release**(): *void*

*Inherited from [IID](_lib_adsi_d_.iid.md).[Release](_lib_adsi_d_.iid.md#release)*

*Defined in [lib/adsi.d.ts:4](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L4)*

**Returns:** *void*

___

###  SetSearchPreference

▸ **SetSearchPreference**(): *void*

*Defined in [lib/adsi.d.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/lib/adsi.d.ts#L22)*

**Returns:** *void*
