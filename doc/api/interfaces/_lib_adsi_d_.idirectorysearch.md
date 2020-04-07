[node-expose-sspi](../README.md) › ["lib/adsi.d"](../modules/_lib_adsi_d_.md) › [IDirectorySearch](_lib_adsi_d_.idirectorysearch.md)

# Interface: IDirectorySearch

## Hierarchy

* [IID](_lib_adsi_d_.iid.md)

  ↳ **IDirectorySearch**

## Index

### Methods

* [ExecuteSearch](_lib_adsi_d_.idirectorysearch.md#executesearch)
* [GetColumn](_lib_adsi_d_.idirectorysearch.md#getcolumn)
* [GetNextColumnName](_lib_adsi_d_.idirectorysearch.md#getnextcolumnname)
* [GetNextRow](_lib_adsi_d_.idirectorysearch.md#getnextrow)
* [Release](_lib_adsi_d_.idirectorysearch.md#release)
* [SetSearchPreference](_lib_adsi_d_.idirectorysearch.md#setsearchpreference)

## Methods

###  ExecuteSearch

▸ **ExecuteSearch**(`input`: object): *void*

*Defined in [lib/adsi.d.ts:18](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L18)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`filter` | string |

**Returns:** *void*

___

###  GetColumn

▸ **GetColumn**(`colName`: string): *Promise‹string | number | false | true[]›*

*Defined in [lib/adsi.d.ts:21](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`colName` | string |

**Returns:** *Promise‹string | number | false | true[]›*

___

###  GetNextColumnName

▸ **GetNextColumnName**(): *string | [HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L20)*

**Returns:** *string | [HRESULT](../modules/_lib_adsi_d_.md#hresult)*

___

###  GetNextRow

▸ **GetNextRow**(): *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L19)*

**Returns:** *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

___

###  Release

▸ **Release**(): *void*

*Inherited from [IID](_lib_adsi_d_.iid.md).[Release](_lib_adsi_d_.iid.md#release)*

*Defined in [lib/adsi.d.ts:4](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L4)*

**Returns:** *void*

___

###  SetSearchPreference

▸ **SetSearchPreference**(): *void*

*Defined in [lib/adsi.d.ts:17](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/adsi.d.ts#L17)*

**Returns:** *void*
