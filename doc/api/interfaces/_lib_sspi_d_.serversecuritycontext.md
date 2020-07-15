[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)

# Interface: ServerSecurityContext

ServerSecurityContext is the SecurityContext, specific to the server.
It is the output of AcceptSecurityContext, and used in the input of InitializeSecurityContext.
When the server want to send to the client authentication token input, this is done with this interface.

**`interface`** ServerSecurityContext

## Hierarchy

* [SecurityContext](_lib_sspi_d_.securitycontext.md)

  ↳ **ServerSecurityContext**

## Index

### Properties

* [SECURITY_STATUS](_lib_sspi_d_.serversecuritycontext.md#optional-security_status)
* [SecBufferDesc](_lib_sspi_d_.serversecuritycontext.md#optional-secbufferdesc)
* [contextAttr](_lib_sspi_d_.serversecuritycontext.md#contextattr)
* [contextHandle](_lib_sspi_d_.serversecuritycontext.md#optional-contexthandle)

## Properties

### `Optional` SECURITY_STATUS

• **SECURITY_STATUS**? : *string*

*Inherited from [SecurityContext](_lib_sspi_d_.securitycontext.md).[SECURITY_STATUS](_lib_sspi_d_.securitycontext.md#optional-security_status)*

*Defined in [lib/sspi.d.ts:92](https://github.com/jlguenego/node-expose-sspi/blob/c77a3a8/lib/sspi.d.ts#L92)*

___

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *any*

*Inherited from [SecurityContext](_lib_sspi_d_.securitycontext.md).[SecBufferDesc](_lib_sspi_d_.securitycontext.md#optional-secbufferdesc)*

*Defined in [lib/sspi.d.ts:93](https://github.com/jlguenego/node-expose-sspi/blob/c77a3a8/lib/sspi.d.ts#L93)*

___

###  contextAttr

• **contextAttr**: *[AscRetFlag](../modules/_lib_flags_index_d_.md#ascretflag)[]*

*Defined in [lib/sspi.d.ts:105](https://github.com/jlguenego/node-expose-sspi/blob/c77a3a8/lib/sspi.d.ts#L105)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Inherited from [SecurityContext](_lib_sspi_d_.securitycontext.md).[contextHandle](_lib_sspi_d_.securitycontext.md#optional-contexthandle)*

*Defined in [lib/sspi.d.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/c77a3a8/lib/sspi.d.ts#L91)*
