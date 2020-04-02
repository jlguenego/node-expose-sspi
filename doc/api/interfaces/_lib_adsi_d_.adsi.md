[node-expose-sspi](../README.md) › ["lib/adsi.d"](../modules/_lib_adsi_d_.md) › [Adsi](_lib_adsi_d_.adsi.md)

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

*Defined in [lib/adsi.d.ts:46](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L46)*

___

###  S_ADS_NOMORE_ROWS

• **S_ADS_NOMORE_ROWS**: *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:45](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L45)*

## Methods

###  ADsGestObject

▸ **ADsGestObject**(`bindingUri`: string): *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

*Defined in [lib/adsi.d.ts:36](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`bindingUri` | string |

**Returns:** *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

___

###  ADsOpenObject

▸ **ADsOpenObject**<**T**>(`input`: object): *Promise‹T›*

*Defined in [lib/adsi.d.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L37)*

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

▸ **ADsOpenObjectSync**<**T**>(`input`: object): *T*

*Defined in [lib/adsi.d.ts:41](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L41)*

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

*Defined in [lib/adsi.d.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L33)*

**Returns:** *void*

___

###  CoInitializeEx

▸ **CoInitializeEx**(`flags`: [CoInitFlag](../modules/_lib_flags_coinitflag_d_.md#coinitflag)[]): *void*

*Defined in [lib/adsi.d.ts:34](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`flags` | [CoInitFlag](../modules/_lib_flags_coinitflag_d_.md#coinitflag)[] |

**Returns:** *void*

___

###  CoUninitialize

▸ **CoUninitialize**(): *void*

*Defined in [lib/adsi.d.ts:35](https://github.com/jlguenego/node-expose-sspi/blob/7b16afe/lib/adsi.d.ts#L35)*

**Returns:** *void*
