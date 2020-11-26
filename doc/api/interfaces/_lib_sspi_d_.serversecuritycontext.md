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

*Defined in [lib/sspi.d.ts:118](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L118)*

___

### `Readonly` SecBufferDesc

• **SecBufferDesc**: *[SecBufferDesc](_lib_sspi_d_.secbufferdesc.md)*

*Defined in [lib/sspi.d.ts:121](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L121)*

___

### `Readonly` contextAttr

• **contextAttr**: *[AscRetFlag](../modules/_lib_flags_index_d_.md#ascretflag)[]*

*Defined in [lib/sspi.d.ts:120](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L120)*

___

### `Readonly` contextHandle

• **contextHandle**: *[CtxtHandle](_lib_sspi_d_.ctxthandle.md)*

*Defined in [lib/sspi.d.ts:119](https://github.com/jlguenego/node-expose-sspi/blob/927f02c/lib/sspi.d.ts#L119)*
