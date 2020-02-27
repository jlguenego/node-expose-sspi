[node-expose-sspi](../README.md) › ["lib/sspi.d"](_lib_sspi_d_.md)

# External module: "lib/sspi.d"

## Index

### Interfaces

* [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md)
* [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md)
* [CredentialWithExpiry](../interfaces/_lib_sspi_d_.credentialwithexpiry.md)
* [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)
* [HANDLE](../interfaces/_lib_sspi_d_.handle.md)
* [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md)
* [SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)
* [SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)
* [ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)
* [SidObject](../interfaces/_lib_sspi_d_.sidobject.md)
* [Token](../interfaces/_lib_sspi_d_.token.md)
* [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md)

### Type aliases

* [InformationClass](_lib_sspi_d_.md#informationclass)

### Functions

* [AcceptSecurityContext](_lib_sspi_d_.md#acceptsecuritycontext)
* [AcquireCredentialsHandle](_lib_sspi_d_.md#acquirecredentialshandle)
* [CloseHandle](_lib_sspi_d_.md#closehandle)
* [DeleteSecurityContext](_lib_sspi_d_.md#deletesecuritycontext)
* [EnumerateSecurityPackages](_lib_sspi_d_.md#enumeratesecuritypackages)
* [FreeCredentialsHandle](_lib_sspi_d_.md#freecredentialshandle)
* [GetTokenInformation](_lib_sspi_d_.md#gettokeninformation)
* [GetUserName](_lib_sspi_d_.md#getusername)
* [GetUserNameEx](_lib_sspi_d_.md#getusernameex)
* [ImpersonateSecurityContext](_lib_sspi_d_.md#impersonatesecuritycontext)
* [InitializeSecurityContext](_lib_sspi_d_.md#initializesecuritycontext)
* [LookupAccountName](_lib_sspi_d_.md#lookupaccountname)
* [OpenProcessToken](_lib_sspi_d_.md#openprocesstoken)
* [OpenThreadToken](_lib_sspi_d_.md#openthreadtoken)
* [QueryContextAttributes](_lib_sspi_d_.md#querycontextattributes)
* [QueryCredentialsAttributes](_lib_sspi_d_.md#querycredentialsattributes)
* [QuerySecurityContextToken](_lib_sspi_d_.md#querysecuritycontexttoken)
* [QuerySecurityPackageInfo](_lib_sspi_d_.md#querysecuritypackageinfo)
* [RevertSecurityContext](_lib_sspi_d_.md#revertsecuritycontext)
* [hello](_lib_sspi_d_.md#hello)

## Type aliases

###  InformationClass

Ƭ **InformationClass**: *"TokenGroups"*

*Defined in [lib/sspi.d.ts:63](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L63)*

## Functions

###  AcceptSecurityContext

▸ **AcceptSecurityContext**(`input`: [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md)): *[ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)*

*Defined in [lib/sspi.d.ts:211](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L211)*

This function must be used only by a server. Its purpose is to setup a client/server security context

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`input` | [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md) |

**Returns:** *[ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)*

___

###  AcquireCredentialsHandle

▸ **AcquireCredentialsHandle**(`input`: object): *[CredentialWithExpiry](../interfaces/_lib_sspi_d_.credentialwithexpiry.md)*

*Defined in [lib/sspi.d.ts:189](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L189)*

Get the credentials of a user, to be used with a specified SSP package.
The credentials will be used according the specified flags.

Do not forget to free allocated memory with FreeCredentialsHandle.

**`export`** 

**Parameters:**

▪ **input**: *object*

Name | Type |
------ | ------ |
`authData?` | [UserCredential](../interfaces/_lib_sspi_d_.usercredential.md) |
`credentialUse?` | [CredentialUseFlag](_lib_flags_credentialuseflag_d_.md#credentialuseflag) |
`packageName` | string |

**Returns:** *[CredentialWithExpiry](../interfaces/_lib_sspi_d_.credentialwithexpiry.md)*

___

###  CloseHandle

▸ **CloseHandle**(`handle`: [HANDLE](../interfaces/_lib_sspi_d_.handle.md)): *void*

*Defined in [lib/sspi.d.ts:296](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L296)*

Free allocated memory.

**`export`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [HANDLE](../interfaces/_lib_sspi_d_.handle.md) |   |

**Returns:** *void*

___

###  DeleteSecurityContext

▸ **DeleteSecurityContext**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:343](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L343)*

Free a context handle.

**`export`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |   |

**Returns:** *void*

___

###  EnumerateSecurityPackages

▸ **EnumerateSecurityPackages**(): *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)[]*

*Defined in [lib/sspi.d.ts:164](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L164)*

EnumerateSecurityPackages get a list of SSP provider with some info.

**`export`** 

**Returns:** *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)[]*

___

###  FreeCredentialsHandle

▸ **FreeCredentialsHandle**(`credential`: [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md)): *void*

*Defined in [lib/sspi.d.ts:219](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L219)*

Free a allocated credential memory. Must be used after AcquireCredentialsHandle.

**`export`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`credential` | [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md) |   |

**Returns:** *void*

___

###  GetTokenInformation

▸ **GetTokenInformation**(`token`: [Token](../interfaces/_lib_sspi_d_.token.md), `infoClass`: [InformationClass](_lib_sspi_d_.md#informationclass)): *any*

*Defined in [lib/sspi.d.ts:288](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L288)*

Get information from a user token.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`token` | [Token](../interfaces/_lib_sspi_d_.token.md) |
`infoClass` | [InformationClass](_lib_sspi_d_.md#informationclass) |

**Returns:** *any*

___

###  GetUserName

▸ **GetUserName**(): *string*

*Defined in [lib/sspi.d.ts:246](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L246)*

Get the username of the current thread.

**`export`** 

**Returns:** *string*

___

###  GetUserNameEx

▸ **GetUserNameEx**(`extendedNameFormat`: [ExtendedNameFormatFlag](_lib_flags_extendednameformatflag_d_.md#extendednameformatflag)): *string*

*Defined in [lib/sspi.d.ts:255](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L255)*

Get the username and much more of the current thread.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`extendedNameFormat` | [ExtendedNameFormatFlag](_lib_flags_extendednameformatflag_d_.md#extendednameformatflag) |

**Returns:** *string*

___

###  ImpersonateSecurityContext

▸ **ImpersonateSecurityContext**(`handle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:230](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L230)*

Must be used only on a server.

Change the server user temporarely with the client user.
When over, use RevertSecurityContext.

**`export`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |   |

**Returns:** *void*

___

###  InitializeSecurityContext

▸ **InitializeSecurityContext**(`input`: [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md)): *[SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:202](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L202)*

This function must be used only by a client. Its purpose is to setup a client/server security context.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`input` | [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md) |

**Returns:** *[SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)*

___

###  LookupAccountName

▸ **LookupAccountName**(`username`: string): *[SidObject](../interfaces/_lib_sspi_d_.sidobject.md)*

*Defined in [lib/sspi.d.ts:305](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L305)*

Get the SID of username.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`username` | string |

**Returns:** *[SidObject](../interfaces/_lib_sspi_d_.sidobject.md)*

___

###  OpenProcessToken

▸ **OpenProcessToken**(`flags?`: [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:278](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L278)*

Get the user token associated with the current process. You will get always
the user that has started the process, and never the impersonated user.

CloseHandle must be used for freeing the token.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  OpenThreadToken

▸ **OpenThreadToken**(`flags?`: [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:266](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L266)*

Get the user token associated with the current thread. Used with ImpersonateSecurityContext.

Token must be freed with CloseHandle.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  QueryContextAttributes

▸ **QueryContextAttributes**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:325](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L325)*

Query what can be done with a given context handle.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QueryCredentialsAttributes

▸ **QueryCredentialsAttributes**(`credential`: [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:315](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L315)*

Query what can be done with a given credential.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QuerySecurityContextToken

▸ **QuerySecurityContextToken**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:334](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L334)*

Get a client user token.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  QuerySecurityPackageInfo

▸ **QuerySecurityPackageInfo**(`packageName`: string): *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)*

*Defined in [lib/sspi.d.ts:173](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L173)*

Get info about one SSP provider given its name.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`packageName` | string |

**Returns:** *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)*

___

###  RevertSecurityContext

▸ **RevertSecurityContext**(`handle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:238](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L238)*

Revert the server user back to its original. Must be used with ImpersonateSecurityContext.

**`export`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |   |

**Returns:** *void*

___

###  hello

▸ **hello**(): *string*

*Defined in [lib/sspi.d.ts:156](https://github.com/jlguenego/node-expose-sspi/blob/15baf5f/lib/sspi.d.ts#L156)*

Just a hello world function. Useless... ;)

**`export`** 

**Returns:** *string*
