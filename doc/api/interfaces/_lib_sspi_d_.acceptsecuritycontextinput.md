[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md)

# Interface: AcceptSecurityContextInput

Input of AcceptSecurityContext function.

**`interface`** AcceptSecurityContextInput

## Hierarchy

* **AcceptSecurityContextInput**

## Index

### Properties

* [clientSecurityContext](_lib_sspi_d_.acceptsecuritycontextinput.md#clientsecuritycontext)
* [contextHandle](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-contexthandle)
* [contextReq](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-contextreq)
* [credential](_lib_sspi_d_.acceptsecuritycontextinput.md#credential)
* [targetDataRep](_lib_sspi_d_.acceptsecuritycontextinput.md#optional-targetdatarep)

## Properties

###  clientSecurityContext

• **clientSecurityContext**: *[SecurityContext](_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:166](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L166)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:167](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L167)*

___

### `Optional` contextReq

• **contextReq**? : *[AscReqFlag](../modules/_lib_flags_index_d_.md#ascreqflag)[]*

*Defined in [lib/sspi.d.ts:168](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L168)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:165](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L165)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_index_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:169](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L169)*
