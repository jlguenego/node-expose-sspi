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
* [CoInitialize](_lib_adsi_d_.adsi.md#coinitialize)
* [CoInitializeEx](_lib_adsi_d_.adsi.md#coinitializeex)
* [CoUninitialize](_lib_adsi_d_.adsi.md#couninitialize)

## Properties

###  S_ADS_NOMORE_COLUMNS

• **S_ADS_NOMORE_COLUMNS**: *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:38](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L38)*

___

###  S_ADS_NOMORE_ROWS

• **S_ADS_NOMORE_ROWS**: *[HRESULT](../modules/_lib_adsi_d_.md#hresult)*

*Defined in [lib/adsi.d.ts:37](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L37)*

## Methods

###  ADsGestObject

▸ **ADsGestObject**(`bindingUri`: string): *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

*Defined in [lib/adsi.d.ts:32](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`bindingUri` | string |

**Returns:** *Promise‹[IADs](_lib_adsi_d_.iads.md)›*

___

###  ADsOpenObject

▸ **ADsOpenObject**<**T**>(`input`: object): *Promise‹T›*

*Defined in [lib/adsi.d.ts:33](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L33)*

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

###  CoInitialize

▸ **CoInitialize**(): *void*

*Defined in [lib/adsi.d.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L29)*

**Returns:** *void*

___

###  CoInitializeEx

▸ **CoInitializeEx**(`flags`: [CoInitFlag](../modules/_lib_flags_coinitflag_d_.md#coinitflag)[]): *void*

*Defined in [lib/adsi.d.ts:30](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`flags` | [CoInitFlag](../modules/_lib_flags_coinitflag_d_.md#coinitflag)[] |

**Returns:** *void*

___

###  CoUninitialize

▸ **CoUninitialize**(): *void*

*Defined in [lib/adsi.d.ts:31](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/lib/adsi.d.ts#L31)*

**Returns:** *void*
