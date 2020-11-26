[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [InitializeSecurityContextInput](_lib_sspi_d_.initializesecuritycontextinput.md)

# Interface: InitializeSecurityContextInput

Input of InitializeSecurityContext function.

**`interface`** InitializeSecurityContextInput

## Hierarchy

* **InitializeSecurityContextInput**

## Index

### Properties

* [SecBufferDesc](_lib_sspi_d_.initializesecuritycontextinput.md#optional-secbufferdesc)
* [cbMaxToken](_lib_sspi_d_.initializesecuritycontextinput.md#optional-cbmaxtoken)
* [contextHandle](_lib_sspi_d_.initializesecuritycontextinput.md#optional-contexthandle)
* [contextReq](_lib_sspi_d_.initializesecuritycontextinput.md#optional-contextreq)
* [credential](_lib_sspi_d_.initializesecuritycontextinput.md#credential)
* [isFirstCall](_lib_sspi_d_.initializesecuritycontextinput.md#optional-isfirstcall)
* [targetDataRep](_lib_sspi_d_.initializesecuritycontextinput.md#optional-targetdatarep)
* [targetName](_lib_sspi_d_.initializesecuritycontextinput.md#targetname)

## Properties

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *[SecBufferDesc](_lib_sspi_d_.initializesecuritycontextinput.md#optional-secbufferdesc)*

*Defined in [lib/sspi.d.ts:157](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L157)*

___

### `Optional` cbMaxToken

• **cbMaxToken**? : *undefined | number*

*Defined in [lib/sspi.d.ts:156](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L156)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:158](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L158)*

___

### `Optional` contextReq

• **contextReq**? : *[IscReqFlag](../modules/_lib_flags_index_d_.md#iscreqflag)[]*

*Defined in [lib/sspi.d.ts:159](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L159)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:154](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L154)*

___

### `Optional` isFirstCall

• **isFirstCall**? : *undefined | false | true*

*Defined in [lib/sspi.d.ts:161](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L161)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:160](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L160)*

___

###  targetName

• **targetName**: *string*

*Defined in [lib/sspi.d.ts:155](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L155)*
