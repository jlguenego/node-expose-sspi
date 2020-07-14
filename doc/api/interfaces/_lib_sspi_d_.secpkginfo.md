[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["lib/sspi.d"](../modules/_lib_sspi_d_.md) › [SecPkgInfo](_lib_sspi_d_.secpkginfo.md)

# Interface: SecPkgInfo

SecPkgInfo is the interface returned by EnumerateSecurityPackages and QuerySecurityPackageInfo
for having info about SSP providers.

When doing SSO, you need to use a SSP provider (ex: Negotiate SSP provider).

**`interface`** SecPkgInfo

## Hierarchy

* **SecPkgInfo**

## Index

### Properties

* [Comment](_lib_sspi_d_.secpkginfo.md#comment)
* [Name](_lib_sspi_d_.secpkginfo.md#name)
* [cbMaxToken](_lib_sspi_d_.secpkginfo.md#cbmaxtoken)
* [fCapabilities](_lib_sspi_d_.secpkginfo.md#fcapabilities)
* [wRPCID](_lib_sspi_d_.secpkginfo.md#wrpcid)
* [wVersion](_lib_sspi_d_.secpkginfo.md#wversion)

## Properties

###  Comment

• **Comment**: *string*

*Defined in [lib/sspi.d.ts:27](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L27)*

___

###  Name

• **Name**: *[SecuritySupportProvider](../modules/_lib_sspi_d_.md#securitysupportprovider)*

*Defined in [lib/sspi.d.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L26)*

___

###  cbMaxToken

• **cbMaxToken**: *number*

*Defined in [lib/sspi.d.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L25)*

___

###  fCapabilities

• **fCapabilities**: *number*

*Defined in [lib/sspi.d.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L22)*

___

###  wRPCID

• **wRPCID**: *number*

*Defined in [lib/sspi.d.ts:24](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L24)*

___

###  wVersion

• **wVersion**: *number*

*Defined in [lib/sspi.d.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/133c769/lib/sspi.d.ts#L23)*
