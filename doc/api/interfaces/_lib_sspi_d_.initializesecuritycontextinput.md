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

*Defined in [lib/sspi.d.ts:164](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L164)*

___

### `Optional` cbMaxToken

• **cbMaxToken**? : *undefined | number*

*Defined in [lib/sspi.d.ts:163](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L163)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:165](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L165)*

___

### `Optional` contextReq

• **contextReq**? : *[IscReqFlag](../modules/_lib_flags_index_d_.md#iscreqflag)[]*

*Defined in [lib/sspi.d.ts:166](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L166)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:161](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L161)*

___

### `Optional` isFirstCall

• **isFirstCall**? : *undefined | false | true*

*Defined in [lib/sspi.d.ts:168](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L168)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:167](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L167)*

___

###  targetName

• **targetName**: *string*

*Defined in [lib/sspi.d.ts:162](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L162)*
