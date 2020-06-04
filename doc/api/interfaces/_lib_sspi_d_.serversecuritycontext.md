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

*Defined in [lib/sspi.d.ts:85](https://github.com/jlguenego/node-expose-sspi/blob/6ab0a20/lib/sspi.d.ts#L85)*

___

### `Optional` SecBufferDesc

• **SecBufferDesc**? : *any*

*Inherited from [SecurityContext](_lib_sspi_d_.securitycontext.md).[SecBufferDesc](_lib_sspi_d_.securitycontext.md#optional-secbufferdesc)*

*Defined in [lib/sspi.d.ts:86](https://github.com/jlguenego/node-expose-sspi/blob/6ab0a20/lib/sspi.d.ts#L86)*

___

###  contextAttr

• **contextAttr**: *[AscRetFlag](../modules/_lib_flags_index_d_.md#ascretflag)[]*

*Defined in [lib/sspi.d.ts:98](https://github.com/jlguenego/node-expose-sspi/blob/6ab0a20/lib/sspi.d.ts#L98)*

___

### `Optional` contextHandle

• **contextHandle**? : *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Inherited from [SecurityContext](_lib_sspi_d_.securitycontext.md).[contextHandle](_lib_sspi_d_.securitycontext.md#optional-contexthandle)*

*Defined in [lib/sspi.d.ts:84](https://github.com/jlguenego/node-expose-sspi/blob/6ab0a20/lib/sspi.d.ts#L84)*
