[node-expose-sspi](../README.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [InitializeSecurityContextInput](_lib_sspi_d_.initializesecuritycontextinput.md)

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

*Defined in [lib/sspi.d.ts:129](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L129)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:131](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L131)*

___

### `Optional` contextReq

• **contextReq**? : *[IscReqFlag](../modules/_lib_flags_iscreqflag_d_.md#iscreqflag)[]*

*Defined in [lib/sspi.d.ts:132](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L132)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:127](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L127)*

___

### `Optional` serverSecurityContext

• **serverSecurityContext**? : *[SecurityContext](_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:130](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L130)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_targetdatarepmapflag_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:133](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L133)*

___

###  targetName

• **targetName**: *string*

*Defined in [lib/sspi.d.ts:128](https://github.com/jlguenego/node-expose-sspi/blob/d279f70/lib/sspi.d.ts#L128)*
