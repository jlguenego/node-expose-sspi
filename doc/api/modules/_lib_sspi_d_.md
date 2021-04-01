[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](_lib_sspi_d_.md)

# Module: "lib/sspi.d"

## Index

### Interfaces

* [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md)
* [AcquireCredHandleInput](../interfaces/_lib_sspi_d_.acquirecredhandleinput.md)
* [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md)
* [CredentialWithExpiry](../interfaces/_lib_sspi_d_.credentialwithexpiry.md)
* [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)
* [GetTokenInformationInput](../interfaces/_lib_sspi_d_.gettokeninformationinput.md)
* [HANDLE](../interfaces/_lib_sspi_d_.handle.md)
* [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md)
* [Props](../interfaces/_lib_sspi_d_.props.md)
* [SecBufferDesc](../interfaces/_lib_sspi_d_.secbufferdesc.md)
* [SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)
* [SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)
* [ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)
* [SidObject](../interfaces/_lib_sspi_d_.sidobject.md)
* [Sspi](../interfaces/_lib_sspi_d_.sspi.md)
* [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md)

### Type aliases

* [Groups](_lib_sspi_d_.md#groups)
* [InformationClass](_lib_sspi_d_.md#informationclass)
* [SecurityStatus](_lib_sspi_d_.md#securitystatus)
* [SecuritySupportProvider](_lib_sspi_d_.md#securitysupportprovider)
* [SidPointer](_lib_sspi_d_.md#sidpointer)

## Type aliases

###  Groups

Ƭ **Groups**: *string[]*

*Defined in [lib/sspi.d.ts:202](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L202)*

___

###  InformationClass

Ƭ **InformationClass**: *"TokenGroups" | "TokenPrivileges"*

*Defined in [lib/sspi.d.ts:73](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L73)*

___

###  SecurityStatus

Ƭ **SecurityStatus**: *"SEC_E_OK" | "SEC_I_COMPLETE_AND_CONTINUE" | "SEC_I_COMPLETE_NEEDED" | "SEC_I_CONTINUE_NEEDED"*

*Defined in [lib/sspi.d.ts:97](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L97)*

___

###  SecuritySupportProvider

Ƭ **SecuritySupportProvider**: *"NTLM" | "Kerberos" | "Negotiate"*

*Defined in [lib/sspi.d.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L16)*

___

###  SidPointer

Ƭ **SidPointer**: *string*

*Defined in [lib/sspi.d.ts:71](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/sspi.d.ts#L71)*

A pointer to an Sid (to be freed).
