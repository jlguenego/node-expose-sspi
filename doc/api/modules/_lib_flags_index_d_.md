[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/flags/index.d"](_lib_flags_index_d_.md)

# Module: "lib/flags/index.d"

## Index

### Type aliases

* [AccessTokenFlag](_lib_flags_index_d_.md#accesstokenflag)
* [AscReqFlag](_lib_flags_index_d_.md#ascreqflag)
* [AscRetFlag](_lib_flags_index_d_.md#ascretflag)
* [CoInitFlag](_lib_flags_index_d_.md#coinitflag)
* [ComputerNameFormatFlag](_lib_flags_index_d_.md#computernameformatflag)
* [CredentialUseFlag](_lib_flags_index_d_.md#credentialuseflag)
* [EwxFlag](_lib_flags_index_d_.md#ewxflag)
* [ExtendedNameFormatFlag](_lib_flags_index_d_.md#extendednameformatflag)
* [IscReqFlag](_lib_flags_index_d_.md#iscreqflag)
* [PrivilegeAttributeFlag](_lib_flags_index_d_.md#privilegeattributeflag)
* [ShutdownReasonFlag](_lib_flags_index_d_.md#shutdownreasonflag)
* [TargetDataRepMapFlag](_lib_flags_index_d_.md#targetdatarepmapflag)
* [UserInfo1Flag](_lib_flags_index_d_.md#userinfo1flag)

## Type aliases

###  AccessTokenFlag

Ƭ **AccessTokenFlag**: *"TOKEN_ADJUST_DEFAULT" | "TOKEN_ADJUST_GROUPS" | "TOKEN_ADJUST_PRIVILEGES" | "TOKEN_ADJUST_SESSIONID" | "TOKEN_ASSIGN_PRIMARY" | "TOKEN_DUPLICATE" | "TOKEN_EXECUTE" | "TOKEN_IMPERSONATE" | "TOKEN_QUERY" | "TOKEN_QUERY_SOURCE" | "TOKEN_READ" | "TOKEN_WRITE" | "TOKEN_ALL_ACCESS"*

*Defined in [lib/flags/index.d.ts:1](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L1)*

___

###  AscReqFlag

Ƭ **AscReqFlag**: *"ASC_REQ_DELEGATE" | "ASC_REQ_MUTUAL_AUTH" | "ASC_REQ_REPLAY_DETECT" | "ASC_REQ_SEQUENCE_DETECT" | "ASC_REQ_CONFIDENTIALITY" | "ASC_REQ_USE_SESSION_KEY" | "ASC_REQ_SESSION_TICKET" | "ASC_REQ_ALLOCATE_MEMORY" | "ASC_REQ_USE_DCE_STYLE" | "ASC_REQ_DATAGRAM" | "ASC_REQ_CONNECTION" | "ASC_REQ_CALL_LEVEL" | "ASC_REQ_FRAGMENT_SUPPLIED" | "ASC_REQ_EXTENDED_ERROR" | "ASC_REQ_STREAM" | "ASC_REQ_INTEGRITY" | "ASC_REQ_LICENSING" | "ASC_REQ_IDENTIFY" | "ASC_REQ_ALLOW_NULL_SESSION" | "ASC_REQ_ALLOW_NON_USER_LOGONS" | "ASC_REQ_ALLOW_CONTEXT_REPLAY" | "ASC_REQ_FRAGMENT_TO_FIT" | "ASC_REQ_NO_TOKEN" | "ASC_REQ_PROXY_BINDINGS" | "ASC_REQ_ALLOW_MISSING_BINDINGS" | "ASC_REQ_MESSAGES"*

*Defined in [lib/flags/index.d.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L16)*

___

###  AscRetFlag

Ƭ **AscRetFlag**: *"ASC_RET_DELEGATE" | "ASC_RET_MUTUAL_AUTH" | "ASC_RET_REPLAY_DETECT" | "ASC_RET_SEQUENCE_DETECT" | "ASC_RET_CONFIDENTIALITY" | "ASC_RET_USE_SESSION_KEY" | "ASC_RET_SESSION_TICKET" | "ASC_RET_ALLOCATED_MEMORY" | "ASC_RET_USED_DCE_STYLE" | "ASC_RET_DATAGRAM" | "ASC_RET_CONNECTION" | "ASC_RET_CALL_LEVEL" | "ASC_RET_THIRD_LEG_FAILED" | "ASC_RET_EXTENDED_ERROR" | "ASC_RET_STREAM" | "ASC_RET_INTEGRITY" | "ASC_RET_LICENSING" | "ASC_RET_IDENTIFY" | "ASC_RET_NULL_SESSION" | "ASC_RET_ALLOW_NON_USER_LOGONS" | "ASC_RET_ALLOW_CONTEXT_REPLAY" | "ASC_RET_FRAGMENT_ONLY" | "ASC_RET_NO_TOKEN" | "ASC_RET_NO_ADDITIONAL_TOKEN" | "ASC_RET_MESSAGES"*

*Defined in [lib/flags/index.d.ts:44](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L44)*

___

###  CoInitFlag

Ƭ **CoInitFlag**: *"COINIT_APARTMENTTHREADED" | "COINIT_MULTITHREADED" | "COINIT_DISABLE_OLE1DDE" | "COINIT_SPEED_OVER_MEMOR"*

*Defined in [lib/flags/index.d.ts:71](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L71)*

___

###  ComputerNameFormatFlag

Ƭ **ComputerNameFormatFlag**: *"ComputerNameNetBIOS" | "ComputerNameDnsHostname" | "ComputerNameDnsDomain" | "ComputerNameDnsFullyQualified" | "ComputerNamePhysicalNetBIOS" | "ComputerNamePhysicalDnsHostname" | "ComputerNamePhysicalDnsDomain" | "ComputerNamePhysicalDnsFullyQualified" | "ComputerNameMax"*

*Defined in [lib/flags/index.d.ts:77](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L77)*

___

###  CredentialUseFlag

Ƭ **CredentialUseFlag**: *"SECPKG_CRED_INBOUND" | "SECPKG_CRED_OUTBOUND" | "SECPKG_CRED_BOTH" | "SECPKG_CRED_DEFAULT" | "SECPKG_CRED_RESERVED"*

*Defined in [lib/flags/index.d.ts:88](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L88)*

___

###  EwxFlag

Ƭ **EwxFlag**: *"EWX_LOGOFF" | "EWX_SHUTDOWN" | "EWX_REBOOT" | "EWX_FORCE" | "EWX_POWEROFF" | "EWX_QUICKRESOLVE" | "EWX_RESTARTAPPS" | "EWX_HYBRID_SHUTDOWN" | "EWX_BOOTOPTIONS" | "EWX_ARSO"*

*Defined in [lib/flags/index.d.ts:165](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L165)*

___

###  ExtendedNameFormatFlag

Ƭ **ExtendedNameFormatFlag**: *"NameUnknown" | "NameFullyQualifiedDN" | "NameSamCompatible" | "NameDisplay" | "NameUniqueId" | "NameCanonical" | "NameUserPrincipal" | "NameCanonicalEx" | "NameServicePrincipal" | "NameDnsDomain" | "NameGivenName" | "NameSurname"*

*Defined in [lib/flags/index.d.ts:95](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L95)*

___

###  IscReqFlag

Ƭ **IscReqFlag**: *"ISC_REQ_DELEGATE" | "ISC_REQ_MUTUAL_AUTH" | "ISC_REQ_REPLAY_DETECT" | "ISC_REQ_SEQUENCE_DETECT" | "ISC_REQ_CONFIDENTIALITY" | "ISC_REQ_USE_SESSION_KEY" | "ISC_REQ_PROMPT_FOR_CREDS" | "ISC_REQ_USE_SUPPLIED_CREDS" | "ISC_REQ_ALLOCATE_MEMORY" | "ISC_REQ_USE_DCE_STYLE" | "ISC_REQ_DATAGRAM" | "ISC_REQ_CONNECTION" | "ISC_REQ_CALL_LEVEL" | "ISC_REQ_FRAGMENT_SUPPLIED" | "ISC_REQ_EXTENDED_ERROR" | "ISC_REQ_STREAM" | "ISC_REQ_INTEGRITY" | "ISC_REQ_IDENTIFY" | "ISC_REQ_NULL_SESSION" | "ISC_REQ_MANUAL_CRED_VALIDATION" | "ISC_REQ_RESERVED1" | "ISC_REQ_FRAGMENT_TO_FIT" | "ISC_REQ_FORWARD_CREDENTIALS" | "ISC_REQ_NO_INTEGRITY" | "ISC_REQ_USE_HTTP_STYLE" | "ISC_REQ_UNVERIFIED_TARGET_NAME" | "ISC_REQ_CONFIDENTIALITY_ONLY" | "ISC_REQ_MESSAGES"*

*Defined in [lib/flags/index.d.ts:109](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L109)*

___

###  PrivilegeAttributeFlag

Ƭ **PrivilegeAttributeFlag**: *"SE_PRIVILEGE_ENABLED" | "SE_PRIVILEGE_ENABLED_BY_DEFAULT" | "SE_PRIVILEGE_REMOVED" | "SE_PRIVILEGE_USED_FOR_ACCESS"*

*Defined in [lib/flags/index.d.ts:221](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L221)*

___

###  ShutdownReasonFlag

Ƭ **ShutdownReasonFlag**: *"SHTDN_REASON_FLAG_USER_DEFINED" | "SHTDN_REASON_FLAG_PLANNED" | "SHTDN_REASON_MAJOR_OTHER" | "SHTDN_REASON_MAJOR_NONE" | "SHTDN_REASON_MAJOR_HARDWARE" | "SHTDN_REASON_MAJOR_OPERATINGSYSTEM" | "SHTDN_REASON_MAJOR_SOFTWARE" | "SHTDN_REASON_MAJOR_APPLICATION" | "SHTDN_REASON_MAJOR_SYSTEM" | "SHTDN_REASON_MAJOR_POWER" | "SHTDN_REASON_MAJOR_LEGACY_API" | "SHTDN_REASON_MINOR_OTHER" | "SHTDN_REASON_MINOR_NONE" | "SHTDN_REASON_MINOR_MAINTENANCE" | "SHTDN_REASON_MINOR_INSTALLATION" | "SHTDN_REASON_MINOR_UPGRADE" | "SHTDN_REASON_MINOR_RECONFIG" | "SHTDN_REASON_MINOR_HUNG" | "SHTDN_REASON_MINOR_UNSTABLE" | "SHTDN_REASON_MINOR_DISK" | "SHTDN_REASON_MINOR_PROCESSOR" | "SHTDN_REASON_MINOR_NETWORKCARD" | "SHTDN_REASON_MINOR_POWER_SUPPLY" | "SHTDN_REASON_MINOR_CORDUNPLUGGED" | "SHTDN_REASON_MINOR_ENVIRONMENT" | "SHTDN_REASON_MINOR_HARDWARE_DRIVER" | "SHTDN_REASON_MINOR_OTHERDRIVER" | "SHTDN_REASON_MINOR_BLUESCREEN" | "SHTDN_REASON_MINOR_SERVICEPACK" | "SHTDN_REASON_MINOR_HOTFIX" | "SHTDN_REASON_MINOR_SECURITYFIX" | "SHTDN_REASON_MINOR_SECURITY" | "SHTDN_REASON_MINOR_NETWORK_CONNECTIVITY" | "SHTDN_REASON_MINOR_WMI" | "SHTDN_REASON_MINOR_SERVICEPACK_UNINSTALL" | "SHTDN_REASON_MINOR_HOTFIX_UNINSTALL" | "SHTDN_REASON_MINOR_SECURITYFIX_UNINSTALL" | "SHTDN_REASON_MINOR_MMC" | "SHTDN_REASON_MINOR_SYSTEMRESTORE" | "SHTDN_REASON_MINOR_TERMSRV" | "SHTDN_REASON_MINOR_DC_PROMOTION" | "SHTDN_REASON_MINOR_DC_DEMOTION"*

*Defined in [lib/flags/index.d.ts:177](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L177)*

___

###  TargetDataRepMapFlag

Ƭ **TargetDataRepMapFlag**: *"SECURITY_NATIVE_DREP" | "SECURITY_NETWORK_DREP"*

*Defined in [lib/flags/index.d.ts:139](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L139)*

___

###  UserInfo1Flag

Ƭ **UserInfo1Flag**: *"UF_SCRIPT" | "UF_ACCOUNTDISABLE" | "UF_HOMEDIR_REQUIRED" | "UF_PASSWD_NOTREQD" | "UF_PASSWD_CANT_CHANGE" | "UF_LOCKOUT" | "UF_DONT_EXPIRE_PASSWD" | "UF_ENCRYPTED_TEXT_PASSWORD_ALLOWED" | "UF_NOT_DELEGATED" | "UF_SMARTCARD_REQUIRED" | "UF_USE_DES_KEY_ONLY" | "UF_DONT_REQUIRE_PREAUTH" | "UF_TRUSTED_FOR_DELEGATION" | "UF_PASSWORD_EXPIRED" | "UF_TRUSTED_TO_AUTHENTICATE_FOR_DELEGATION" | "UF_NORMAL_ACCOUNT" | "UF_TEMP_DUPLICATE_ACCOUNT" | "UF_WORKSTATION_TRUST_ACCOUNT" | "UF_SERVER_TRUST_ACCOUNT" | "UF_INTERDOMAIN_TRUST_ACCOUNT"*

*Defined in [lib/flags/index.d.ts:143](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/lib/flags/index.d.ts#L143)*
