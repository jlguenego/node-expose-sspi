[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [InitializeSecurityContextInput](_lib_sspi_d_.initializesecuritycontextinput.md)

# Interface: InitializeSecurityContextInput

Input of InitializeSecurityContext function.

**`interface`** InitializeSecurityContextInput

## Hierarchy

* **InitializeSecurityContextInput**

## Index

### Properties

* [cbMaxToken](_lib_sspi_d_.initializesecuritycontextinput.md#optional-cbmaxtoken)
* [contextHandle](_lib_sspi_d_.initializesecuritycontextinput.md#optional-contexthandle)
* [contextReq](_lib_sspi_d_.initializesecuritycontextinput.md#optional-contextreq)
* [credential](_lib_sspi_d_.initializesecuritycontextinput.md#credential)
* [serverSecurityContext](_lib_sspi_d_.initializesecuritycontextinput.md#optional-serversecuritycontext)
* [targetDataRep](_lib_sspi_d_.initializesecuritycontextinput.md#optional-targetdatarep)
* [targetName](_lib_sspi_d_.initializesecuritycontextinput.md#targetname)

## Properties

### `Optional` cbMaxToken

• **cbMaxToken**? : *number*

*Defined in [lib/sspi.d.ts:140](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L140)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:142](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L142)*

___

### `Optional` contextReq

• **contextReq**? : *[IscReqFlag](../modules/_lib_flags_index_d_.md#iscreqflag)[]*

*Defined in [lib/sspi.d.ts:143](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L143)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:138](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L138)*

___

### `Optional` serverSecurityContext

• **serverSecurityContext**? : *[SecurityContext](_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:141](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L141)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:144](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L144)*

___

###  targetName

• **targetName**: *string*

*Defined in [lib/sspi.d.ts:139](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/lib/sspi.d.ts#L139)*
