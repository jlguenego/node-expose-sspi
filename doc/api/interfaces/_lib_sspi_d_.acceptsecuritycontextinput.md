[node-expose-sspi](../README.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md)

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

*Defined in [lib/sspi.d.ts:144](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/lib/sspi.d.ts#L144)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:145](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/lib/sspi.d.ts#L145)*

___

### `Optional` contextReq

• **contextReq**? : *[AscReqFlag](../modules/_lib_flags_ascreqflag_d_.md#ascreqflag)[]*

*Defined in [lib/sspi.d.ts:146](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/lib/sspi.d.ts#L146)*

___

###  credential

• **credential**: *[CredHandle](_lib_sspi_d_.credhandle.md)*

*Defined in [lib/sspi.d.ts:143](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/lib/sspi.d.ts#L143)*

___

### `Optional` targetDataRep

• **targetDataRep**? : *[TargetDataRepMapFlag](../modules/_lib_flags_targetdatarepmapflag_d_.md#targetdatarepmapflag)*

*Defined in [lib/sspi.d.ts:147](https://github.com/jlguenego/node-expose-sspi/blob/41d66b9/lib/sspi.d.ts#L147)*
