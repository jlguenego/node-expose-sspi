[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [Sspi](_lib_sspi_d_.sspi.md)

# Interface: Sspi

## Hierarchy

* **Sspi**

## Index

### Methods

* [AcceptSecurityContext](_lib_sspi_d_.sspi.md#acceptsecuritycontext)
* [AcquireCredentialsHandle](_lib_sspi_d_.sspi.md#acquirecredentialshandle)
* [CloseHandle](_lib_sspi_d_.sspi.md#closehandle)
* [DeleteSecurityContext](_lib_sspi_d_.sspi.md#deletesecuritycontext)
* [EnumerateSecurityPackages](_lib_sspi_d_.sspi.md#enumeratesecuritypackages)
* [FreeCredentialsHandle](_lib_sspi_d_.sspi.md#freecredentialshandle)
* [GetTokenInformation](_lib_sspi_d_.sspi.md#gettokeninformation)
* [GetUserName](_lib_sspi_d_.sspi.md#getusername)
* [GetUserNameEx](_lib_sspi_d_.sspi.md#getusernameex)
* [ImpersonateSecurityContext](_lib_sspi_d_.sspi.md#impersonatesecuritycontext)
* [InitializeSecurityContext](_lib_sspi_d_.sspi.md#initializesecuritycontext)
* [LookupAccountName](_lib_sspi_d_.sspi.md#lookupaccountname)
* [OpenProcessToken](_lib_sspi_d_.sspi.md#openprocesstoken)
* [OpenThreadToken](_lib_sspi_d_.sspi.md#openthreadtoken)
* [QueryContextAttributes](_lib_sspi_d_.sspi.md#querycontextattributes)
* [QueryCredentialsAttributes](_lib_sspi_d_.sspi.md#querycredentialsattributes)
* [QuerySecurityContextToken](_lib_sspi_d_.sspi.md#querysecuritycontexttoken)
* [QuerySecurityPackageInfo](_lib_sspi_d_.sspi.md#querysecuritypackageinfo)
* [RevertSecurityContext](_lib_sspi_d_.sspi.md#revertsecuritycontext)
* [hello](_lib_sspi_d_.sspi.md#hello)

## Methods

###  AcceptSecurityContext

▸ **AcceptSecurityContext**(`input`: [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md)): *[ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)*

*Defined in [lib/sspi.d.ts:228](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L228)*

AcceptSecurityContext must be used only on server side. Its purpose is to setup a client/server security context

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`input` | [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md) |

**Returns:** *[ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)*

___

###  AcquireCredentialsHandle

▸ **AcquireCredentialsHandle**(`input`: [AcquireCredHandleInput](_lib_sspi_d_.acquirecredhandleinput.md)): *[CredentialWithExpiry](_lib_sspi_d_.credentialwithexpiry.md)*

*Defined in [lib/sspi.d.ts:208](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L208)*

Get the credentials of a user, to be used with a specified SSP package.
The credentials will be used according the specified flags.

FreeCredentialsHandle must be used to free the credentials pointer.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`input` | [AcquireCredHandleInput](_lib_sspi_d_.acquirecredhandleinput.md) |

**Returns:** *[CredentialWithExpiry](_lib_sspi_d_.credentialwithexpiry.md)*

___

###  CloseHandle

▸ **CloseHandle**(`handle`: [HANDLE](_lib_sspi_d_.handle.md)): *void*

*Defined in [lib/sspi.d.ts:315](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L315)*

Free allocated memory referenced by the handle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [HANDLE](_lib_sspi_d_.handle.md) |

**Returns:** *void*

___

###  DeleteSecurityContext

▸ **DeleteSecurityContext**(`ctxtHandle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:361](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L361)*

Free a context handle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  EnumerateSecurityPackages

▸ **EnumerateSecurityPackages**(): *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)[]*

*Defined in [lib/sspi.d.ts:186](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L186)*

EnumerateSecurityPackages get a list of SSP provider with some info.

**`memberof`** Sspi

**Returns:** *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)[]*

___

###  FreeCredentialsHandle

▸ **FreeCredentialsHandle**(`credential`: [CredHandle](_lib_sspi_d_.credhandle.md)): *void*

*Defined in [lib/sspi.d.ts:238](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L238)*

Free a allocated credential memory. Must be used after AcquireCredentialsHandle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](_lib_sspi_d_.credhandle.md) |

**Returns:** *void*

___

###  GetTokenInformation

▸ **GetTokenInformation**(`input`: [GetTokenInformationInput](_lib_sspi_d_.gettokeninformationinput.md)): *string[]*

*Defined in [lib/sspi.d.ts:307](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L307)*

Get information from a user token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`input` | [GetTokenInformationInput](_lib_sspi_d_.gettokeninformationinput.md) |

**Returns:** *string[]*

___

###  GetUserName

▸ **GetUserName**(): *string*

*Defined in [lib/sspi.d.ts:265](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L265)*

Get the username of the current thread. (TODO: to be moved outside of SSPI)

**`memberof`** Sspi

**Returns:** *string*

___

###  GetUserNameEx

▸ **GetUserNameEx**(`extendedNameFormat`: [ExtendedNameFormatFlag](../modules/_lib_flags_index_d_.md#extendednameformatflag)): *string*

*Defined in [lib/sspi.d.ts:274](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L274)*

Get the username and much more of the current thread.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`extendedNameFormat` | [ExtendedNameFormatFlag](../modules/_lib_flags_index_d_.md#extendednameformatflag) |

**Returns:** *string*

___

###  ImpersonateSecurityContext

▸ **ImpersonateSecurityContext**(`handle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:249](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L249)*

Must be used only on server side.

Change the server user temporarely with the client user.
Allocated resource must be freed with RevertSecurityContext.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  InitializeSecurityContext

▸ **InitializeSecurityContext**(`input`: [InitializeSecurityContextInput](_lib_sspi_d_.initializesecuritycontextinput.md)): *[SecurityContext](_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:217](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L217)*

This function must be used only by a client. Its purpose is to setup a client/server security context.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`input` | [InitializeSecurityContextInput](_lib_sspi_d_.initializesecuritycontextinput.md) |

**Returns:** *[SecurityContext](_lib_sspi_d_.securitycontext.md)*

___

###  LookupAccountName

▸ **LookupAccountName**(`username`: string): *[SidObject](_lib_sspi_d_.sidobject.md)*

*Defined in [lib/sspi.d.ts:324](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L324)*

Get the SID of username.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`username` | string |

**Returns:** *[SidObject](_lib_sspi_d_.sidobject.md)*

___

###  OpenProcessToken

▸ **OpenProcessToken**(`flags?`: [AccessTokenFlag](../modules/_lib_flags_index_d_.md#accesstokenflag)[]): *[Token](../modules/_lib_sspi_d_.md#token)*

*Defined in [lib/sspi.d.ts:297](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L297)*

Get the user token associated with the current process. You will get always
the user that has started the process, and never the impersonated user.

CloseHandle must be used for freeing the token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](../modules/_lib_flags_index_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../modules/_lib_sspi_d_.md#token)*

___

###  OpenThreadToken

▸ **OpenThreadToken**(`flags?`: [AccessTokenFlag](../modules/_lib_flags_index_d_.md#accesstokenflag)[]): *[Token](../modules/_lib_sspi_d_.md#token)*

*Defined in [lib/sspi.d.ts:285](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L285)*

Get the user token associated with the current thread. Used with ImpersonateSecurityContext.

Token must be freed with CloseHandle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](../modules/_lib_flags_index_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../modules/_lib_sspi_d_.md#token)*

___

###  QueryContextAttributes

▸ **QueryContextAttributes**(`ctxtHandle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:344](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L344)*

Query what can be done with a given context handle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QueryCredentialsAttributes

▸ **QueryCredentialsAttributes**(`credential`: [CredHandle](_lib_sspi_d_.credhandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:334](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L334)*

Query what can be done with a given credential.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](_lib_sspi_d_.credhandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QuerySecurityContextToken

▸ **QuerySecurityContextToken**(`ctxtHandle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *[Token](../modules/_lib_sspi_d_.md#token)*

*Defined in [lib/sspi.d.ts:353](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L353)*

Get a client user token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |

**Returns:** *[Token](../modules/_lib_sspi_d_.md#token)*

___

###  QuerySecurityPackageInfo

▸ **QuerySecurityPackageInfo**(`packageName`: [SecuritySupportProvider](../modules/_lib_sspi_d_.md#securitysupportprovider)): *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)*

*Defined in [lib/sspi.d.ts:195](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L195)*

Get info about one SSP provider given its name.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`packageName` | [SecuritySupportProvider](../modules/_lib_sspi_d_.md#securitysupportprovider) |

**Returns:** *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)*

___

###  RevertSecurityContext

▸ **RevertSecurityContext**(`handle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:257](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L257)*

Revert the server user back to its original. Must be used with ImpersonateSecurityContext.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  hello

▸ **hello**(): *string*

*Defined in [lib/sspi.d.ts:178](https://github.com/jlguenego/node-expose-sspi/blob/3194bc1/lib/sspi.d.ts#L178)*

Just a hello world function. Useless... ;)

**`memberof`** Sspi

**Returns:** *string*
