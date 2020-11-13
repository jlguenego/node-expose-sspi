[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [SecurityContext](_lib_sspi_d_.securitycontext.md)

# Interface: SecurityContext

A security context is the common output of InitializeSecurityContext and AcceptSecurityContext.
It contains the security buffers exchanged between the client and the server.

**`interface`** SecurityContext

## Hierarchy

* **SecurityContext**

## Index

### Properties

* [SECURITY_STATUS](_lib_sspi_d_.securitycontext.md#readonly-security_status)
* [SecBufferDesc](_lib_sspi_d_.securitycontext.md#readonly-secbufferdesc)
* [contextHandle](_lib_sspi_d_.securitycontext.md#readonly-contexthandle)

## Properties

### `Readonly` SECURITY_STATUS

• **SECURITY_STATUS**: *string*

*Defined in [lib/sspi.d.ts:92](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/lib/sspi.d.ts#L92)*

___

### `Readonly` SecBufferDesc

• **SecBufferDesc**: *[SecBufferDesc](_lib_sspi_d_.secbufferdesc.md)*

*Defined in [lib/sspi.d.ts:93](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/lib/sspi.d.ts#L93)*

___

### `Readonly` contextHandle

• **contextHandle**: *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/e4d7005/lib/sspi.d.ts#L91)*
