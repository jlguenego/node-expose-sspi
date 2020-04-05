[node-expose-sspi](../README.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [SecurityContext](_lib_sspi_d_.securitycontext.md)

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

*Defined in [lib/sspi.d.ts:81](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/lib/sspi.d.ts#L81)*

___

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *any*

*Defined in [lib/sspi.d.ts:82](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/lib/sspi.d.ts#L82)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:80](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/lib/sspi.d.ts#L80)*
