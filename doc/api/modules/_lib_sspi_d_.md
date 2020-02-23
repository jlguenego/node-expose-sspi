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

*Defined in [lib/sspi.d.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L25)*

## Functions

###  AcceptSecurityContext

▸ **AcceptSecurityContext**(`input`: [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md)): *[ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)*

*Defined in [lib/sspi.d.ts:81](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L81)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | [AcceptSecurityContextInput](../interfaces/_lib_sspi_d_.acceptsecuritycontextinput.md) |

**Returns:** *[ServerSecurityContext](../interfaces/_lib_sspi_d_.serversecuritycontext.md)*

___

###  AcquireCredentialsHandle

▸ **AcquireCredentialsHandle**(`input`: object): *[CredentialWithExpiry](../interfaces/_lib_sspi_d_.credentialwithexpiry.md)*

*Defined in [lib/sspi.d.ts:73](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L73)*

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

*Defined in [lib/sspi.d.ts:97](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L97)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [HANDLE](../interfaces/_lib_sspi_d_.handle.md) |

**Returns:** *void*

___

###  DeleteSecurityContext

▸ **DeleteSecurityContext**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:108](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L108)*

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  EnumerateSecurityPackages

▸ **EnumerateSecurityPackages**(): *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)[]*

*Defined in [lib/sspi.d.ts:71](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L71)*

**Returns:** *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)[]*

___

###  FreeCredentialsHandle

▸ **FreeCredentialsHandle**(`credential`: [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md)): *void*

*Defined in [lib/sspi.d.ts:84](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md) |

**Returns:** *void*

___

###  GetTokenInformation

▸ **GetTokenInformation**(`token`: [Token](../interfaces/_lib_sspi_d_.token.md), `infoClass`: [InformationClass](_lib_sspi_d_.md#informationclass)): *any*

*Defined in [lib/sspi.d.ts:93](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | [Token](../interfaces/_lib_sspi_d_.token.md) |
`infoClass` | [InformationClass](_lib_sspi_d_.md#informationclass) |

**Returns:** *any*

___

###  GetUserName

▸ **GetUserName**(): *string*

*Defined in [lib/sspi.d.ts:87](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L87)*

**Returns:** *string*

___

###  GetUserNameEx

▸ **GetUserNameEx**(`extendedNameFormat`: [ExtendedNameFormatFlag](_lib_flags_extendednameformatflag_d_.md#extendednameformatflag)): *string*

*Defined in [lib/sspi.d.ts:88](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`extendedNameFormat` | [ExtendedNameFormatFlag](_lib_flags_extendednameformatflag_d_.md#extendednameformatflag) |

**Returns:** *string*

___

###  ImpersonateSecurityContext

▸ **ImpersonateSecurityContext**(`handle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:85](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  InitializeSecurityContext

▸ **InitializeSecurityContext**(`input`: [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md)): *[SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)*

*Defined in [lib/sspi.d.ts:78](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`input` | [InitializeSecurityContextInput](../interfaces/_lib_sspi_d_.initializesecuritycontextinput.md) |

**Returns:** *[SecurityContext](../interfaces/_lib_sspi_d_.securitycontext.md)*

___

###  LookupAccountName

▸ **LookupAccountName**(`username`: string): *[SidObject](../interfaces/_lib_sspi_d_.sidobject.md)*

*Defined in [lib/sspi.d.ts:98](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L98)*

**Parameters:**

Name | Type |
------ | ------ |
`username` | string |

**Returns:** *[SidObject](../interfaces/_lib_sspi_d_.sidobject.md)*

___

###  OpenProcessToken

▸ **OpenProcessToken**(`flags?`: [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:92](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  OpenThreadToken

▸ **OpenThreadToken**(`flags?`: [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[]): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`flags?` | [AccessTokenFlag](_lib_flags_accesstokenflag_d_.md#accesstokenflag)[] |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  QueryContextAttributes

▸ **QueryContextAttributes**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:103](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QueryCredentialsAttributes

▸ **QueryCredentialsAttributes**(`credential`: [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md), `attribute`: string): *any*

*Defined in [lib/sspi.d.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L99)*

**Parameters:**

Name | Type |
------ | ------ |
`credential` | [CredHandle](../interfaces/_lib_sspi_d_.credhandle.md) |
`attribute` | string |

**Returns:** *any*

___

###  QuerySecurityContextToken

▸ **QuerySecurityContextToken**(`ctxtHandle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *[Token](../interfaces/_lib_sspi_d_.token.md)*

*Defined in [lib/sspi.d.ts:107](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L107)*

**Parameters:**

Name | Type |
------ | ------ |
`ctxtHandle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *[Token](../interfaces/_lib_sspi_d_.token.md)*

___

###  QuerySecurityPackageInfo

▸ **QuerySecurityPackageInfo**(`packageName`: string): *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)*

*Defined in [lib/sspi.d.ts:72](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`packageName` | string |

**Returns:** *[SecPkgInfo](../interfaces/_lib_sspi_d_.secpkginfo.md)*

___

###  RevertSecurityContext

▸ **RevertSecurityContext**(`handle`: [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md)): *void*

*Defined in [lib/sspi.d.ts:86](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [CtxtHandle](../interfaces/_lib_sspi_d_.ctxthandle.md) |

**Returns:** *void*

___

###  hello

▸ **hello**(): *string*

*Defined in [lib/sspi.d.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/cd3b9de/lib/sspi.d.ts#L70)*

**Returns:** *string*
