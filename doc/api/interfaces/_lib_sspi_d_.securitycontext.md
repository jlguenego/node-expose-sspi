[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [SecurityContext](_lib_sspi_d_.securitycontext.md)

# Interface: SecurityContext

A security context is the common output of InitializeSecurityContext and AcceptSecurityContext.
It contains the security buffers exchanged between the client and the server.

**`interface`** SecurityContext

## Hierarchy

* **SecurityContext**

  ↳ [ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)

## Index

### Properties

* [SECURITY_STATUS](_lib_sspi_d_.securitycontext.md#optional-security_status)
* [SecBufferDesc](_lib_sspi_d_.securitycontext.md#optional-secbufferdesc)
* [contextHandle](_lib_sspi_d_.securitycontext.md#optional-contexthandle)

## Properties

### `Optional` SECURITY_STATUS

• **SECURITY_STATUS**? : *string*

*Defined in [lib/sspi.d.ts:85](https://github.com/jlguenego/node-expose-sspi/blob/1283254/lib/sspi.d.ts#L85)*

___

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *any*

*Defined in [lib/sspi.d.ts:86](https://github.com/jlguenego/node-expose-sspi/blob/1283254/lib/sspi.d.ts#L86)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:84](https://github.com/jlguenego/node-expose-sspi/blob/1283254/lib/sspi.d.ts#L84)*
