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

*Defined in [lib/sspi.d.ts:183](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L183)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:184](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L184)*

___

### `Optional` contextReq

• **contextReq**? : *[AscReqFlag](../modules/_lib_flags_index_d_.md#ascreqflag)[]*

*Defined in [lib/sspi.d.ts:185](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L185)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:182](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L182)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:186](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L186)*
