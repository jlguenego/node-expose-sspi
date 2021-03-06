[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/adsi.d"](../modules/_lib_adsi_d_.md) › [Adsi](_lib_adsi_d_.adsi.md)

# Interface: Adsi

## Hierarchy

* **Adsi**

## Index

### Properties

* [S_ADS_NOMORE_COLUMNS](_lib_adsi_d_.adsi.md#s_ads_nomore_columns)
* [S_ADS_NOMORE_ROWS](_lib_adsi_d_.adsi.md#s_ads_nomore_rows)

### Methods

* [ADsGestObject](_lib_adsi_d_.adsi.md#adsgestobject)
* [ADsOpenObject](_lib_adsi_d_.adsi.md#adsopenobject)
* [ADsOpenObjectSync](_lib_adsi_d_.adsi.md#adsopenobjectsync)
* [CoInitialize](_lib_adsi_d_.adsi.md#coinitialize)
* [CoInitializeEx](_lib_adsi_d_.adsi.md#coinitializeex)
* [CoUninitialize](_lib_adsi_d_.adsi.md#couninitialize)

## Properties

###  S_ADS_NOMORE_COLUMNS

• **S_ADS_NOMORE_COLUMNS**: *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:56](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L56)*

___

###  S_ADS_NOMORE_ROWS

• **S_ADS_NOMORE_ROWS**: *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:55](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L55)*

## Methods

###  ADsGestObject

▸ **ADsGestObject**(`bindingUri`: string): *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

*Defined in [lib/adsi.d.ts:46](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`bindingUri` | string |

**Returns:** *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

___

###  ADsOpenObject

▸ **ADsOpenObject**‹**T**›(`input`: object): *Promise‹T›*

*Defined in [lib/adsi.d.ts:47](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L47)*

**Type parameters:**

▪ **T**: *[IID](_lib_adsi_d_.iid.md)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`binding` | string |
`riid` | [RiidFlag](../modules/_lib_adsi_d_.md#riidflag) |

**Returns:** *Promise‹T›*

___

###  ADsOpenObjectSync

▸ **ADsOpenObjectSync**‹**T**›(`input`: object): *T*

*Defined in [lib/adsi.d.ts:51](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L51)*

**Type parameters:**

▪ **T**: *[IID](_lib_adsi_d_.iid.md)*

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`binding` | string |
`riid` | [RiidFlag](../modules/_lib_adsi_d_.md#riidflag) |

**Returns:** *T*

___

###  CoInitialize

▸ **CoInitialize**(): *void*

*Defined in [lib/adsi.d.ts:43](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L43)*

**Returns:** *void*

___

###  CoInitializeEx

▸ **CoInitializeEx**(`flags`: [CoInitFlag](../modules/_lib_flags_index_d_.md#coinitflag)[]): *void*

*Defined in [lib/adsi.d.ts:44](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`flags` | [CoInitFlag](../modules/_lib_flags_index_d_.md#coinitflag)[] |

**Returns:** *void*

___

###  CoUninitialize

▸ **CoUninitialize**(): *void*

*Defined in [lib/adsi.d.ts:45](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/adsi.d.ts#L45)*

**Returns:** *void*
