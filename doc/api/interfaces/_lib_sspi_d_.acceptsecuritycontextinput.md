[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md)

# Interface: AcceptSecurityContextInput

Input of AcceptSecurityContext function.

**`interface`** AcceptSecurityContextInput

## Hierarchy

* **AcceptSecurityContextInput**

## Index

### Properties

* [SecBufferDesc](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-secbufferdesc)
* [contextHandle](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-contexthandle)
* [contextReq](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-contextreq)
* [credential](_lib_sspi_d_.acceptsecuritycontextinput.md#credential)
* [targetDataRep](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-targetdatarep)

## Properties

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *[SecBufferDesc](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-secbufferdesc)*

*Defined in [lib/sspi.d.ts:190](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L190)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:191](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L191)*

___

### `Optional` contextReq

• **contextReq**? : *[AscReqFlag](../modules/_lib_flags_index_d_.md#ascreqflag)[]*

*Defined in [lib/sspi.d.ts:192](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L192)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:189](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L189)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:193](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/lib/sspi.d.ts#L193)*
