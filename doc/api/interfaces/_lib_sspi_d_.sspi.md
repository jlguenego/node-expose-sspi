[node-expose-sspi](../README.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [Sspi](_lib_sspi_d_.sspi.md)

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

*Defined in [lib/sspi.d.ts:213](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L213)*

AcceptSecurityContext must be used only on server side. Its purpose is to setup a client/server security context

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`input` | [AcceptSecurityContextInput](_lib_sspi_d_.acceptsecuritycontextinput.md) |

**Returns:** *[ServerSecurityContext](_lib_sspi_d_.serversecuritycontext.md)*

___

###  AcquireCredentialsHandle

▸ **AcquireCredentialsHandle**(`input`: object): *[CredentialWithExpiry](_lib_sspi_d_.credentialwithexpiry.md)*

*Defined in [lib/sspi.d.ts:189](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L189)*

Get the credentials of a user, to be used with a specified SSP package.
The credentials will be used according the specified flags.

FreeCredentialsHandle must be used to free the credentials pointer.

**`memberof`** Sspi

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`authData?` | [UserCredential](_lib_sspi_d_.usercredential.md) |
`credentialUse?` | [CredentialUseFlag](../modules/_lib_flags_credentialuseflag_d_.md#credentialuseflag) |
`packageName` | string |

**Returns:** *[CredentialWithExpiry](_lib_sspi_d_.credentialwithexpiry.md)*

___

###  CloseHandle

▸ **CloseHandle**(`handle`: [HANDLE](_lib_sspi_d_.handle.md)): *void*

*Defined in [lib/sspi.d.ts:303](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L303)*

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

*Defined in [lib/sspi.d.ts:355](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L355)*

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

*Defined in [lib/sspi.d.ts:164](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L164)*

EnumerateSecurityPackages get a list of SSP provider with some info.

**`memberof`** Sspi

**Returns:** *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)[]*

___

###  FreeCredentialsHandle

▸ **FreeCredentialsHandle**(`credential`: [CredHandle](_lib_sspi_d_.credhandle.md)): *void*

*Defined in [lib/sspi.d.ts:223](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L223)*

Free a allocated credential memory. Must be used after AcquireCredentialsHandle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](_lib_sspi_d_.credhandle.md) |

**Returns:** *void*

___

###  GetTokenInformation

▸ **GetTokenInformation**(`token`: [Token](_lib_sspi_d_.token.md), `infoClass`: [InformationClass](../modules/_lib_sspi_d_.md#informationclass)): *any*

*Defined in [lib/sspi.d.ts:292](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L292)*

Get information from a user token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`token` | [Token](_lib_sspi_d_.token.md) |
`infoClass` | [InformationClass](../modules/_lib_sspi_d_.md#informationclass) |

**Returns:** *any*

___

###  GetUserName

▸ **GetUserName**(): *string*

*Defined in [lib/sspi.d.ts:250](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L250)*

Get the username of the current thread. (TODO: to be moved outside of SSPI)

**`memberof`** Sspi

**Returns:** *string*

___

###  GetUserNameEx

▸ **GetUserNameEx**(`extendedNameFormat`: [ExtendedNameFormatFlag](../modules/_lib_flags_extendednameformatflag_d_.md#extendednameformatflag)): *string*

*Defined in [lib/sspi.d.ts:259](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L259)*

Get the username and much more of the current thread.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`extendedNameFormat` | [ExtendedNameFormatFlag](../modules/_lib_flags_extendednameformatflag_d_.md#extendednameformatflag) |

**Returns:** *string*

___

###  ImpersonateSecurityContext

▸ **ImpersonateSecurityContext**(`handle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:234](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L234)*

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

*Defined in [lib/sspi.d.ts:202](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L202)*

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

*Defined in [lib/sspi.d.ts:312](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L312)*

Get the SID of username.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`username` | string |

**Returns:** *[SidObject](_lib_sspi_d_.sidobject.md)*

___

###  OpenProcessToken

▸ **OpenProcessToken**(`flags?`: [AccessTokenFlag](../modules/_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:282](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L282)*

Get the user token associated with the current process. You will get always
the user that has started the process, and never the impersonated user.

CloseHandle must be used for freeing the token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](../modules/_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](_lib_sspi_d_.token.md)*

___

###  OpenThreadToken

▸ **OpenThreadToken**(`flags?`: [AccessTokenFlag](../modules/_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:270](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L270)*

Get the user token associated with the current thread. Used with ImpersonateSecurityContext.

Token must be freed with CloseHandle.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](../modules/_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](_lib_sspi_d_.token.md)*

___

###  QueryContextAttributes

▸ **QueryContextAttributes**(`ctxtHandle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:335](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L335)*

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

*Defined in [lib/sspi.d.ts:322](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L322)*

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

▸ **QuerySecurityContextToken**(`ctxtHandle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *[Token](_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:347](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L347)*

Get a client user token.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](_lib_sspi_d_.ctxthandle.md) |

**Returns:** *[Token](_lib_sspi_d_.token.md)*

___

###  QuerySecurityPackageInfo

▸ **QuerySecurityPackageInfo**(`packageName`: string): *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)*

*Defined in [lib/sspi.d.ts:173](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L173)*

Get info about one SSP provider given its name.

**`memberof`** Sspi

**Parameters:**

Name | Type |
------ | ------ |
`packageName` | string |

**Returns:** *[SecPkgInfo](_lib_sspi_d_.secpkginfo.md)*

___

###  RevertSecurityContext

▸ **RevertSecurityContext**(`handle`: [CtxtHandle](_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:242](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L242)*

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

*Defined in [lib/sspi.d.ts:156](https://github.com/jlguenego/node-expose-sspi/blob/4e8c359/lib/sspi.d.ts#L156)*

Just a hello world function. Useless... ;)

**`memberof`** Sspi

**Returns:** *string*
