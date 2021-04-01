[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)

# Interface: ServerSecurityContext

ServerSecurityContext is the SecurityContext, specific to the server.
It is the output of AcceptSecurityContext, and used in the input of InitializeSecurityContext.
When the server want to send to the client authentication token input, this is done with this interface.

**`interface`** ServerSecurityContext

## Hierarchy

* **ServerSecurityContext**

## Index

### Properties

* [SECURITY_STATUS](_lib_sspi_d_.serversecuritycontext.md#readonly-security_status)
* [SecBufferDesc](_lib_sspi_d_.serversecuritycontext.md#readonly-secbufferdesc)
* [contextAttr](_lib_sspi_d_.serversecuritycontext.md#readonly-contextattr)
* [contextHandle](_lib_sspi_d_.serversecuritycontext.md#readonly-contexthandle)

## Properties

### `Readonly` SECURITY_STATUS

• **SECURITY_STATUS**: *string*

*Defined in [lib/sspi.d.ts:125](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L125)*

___

### `Readonly` SecBufferDesc

• **SecBufferDesc**: *[SecBufferDesc](_lib_sspi_d_.secbufferdesc.md)*

*Defined in [lib/sspi.d.ts:128](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L128)*

___

### `Readonly` contextAttr

• **contextAttr**: *[AscRetFlag](../modules/_lib_flags_index_d_.md#ascretflag)[]*

*Defined in [lib/sspi.d.ts:127](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L127)*

___

### `Readonly` contextHandle

• **contextHandle**: *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:126](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L126)*
