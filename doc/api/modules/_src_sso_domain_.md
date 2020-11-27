[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/domain"](_src_sso_domain_.md)

# Module: "src/sso/domain"

## Index

### Functions

* [getDefaultDomain](_src_sso_domain_.md#getdefaultdomain)
* [isActiveDirectoryReachable](_src_sso_domain_.md#isactivedirectoryreachable)
* [isOnDomain](_src_sso_domain_.md#isondomain)

## Functions

###  getDefaultDomain

▸ **getDefaultDomain**(): *string*

*Defined in [src/sso/domain.ts:10](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/domain.ts#L10)*

Get the domain (Microsoft domain) or hostname (workgroup) of this machine.

**Returns:** *string*

domain name

___

###  isActiveDirectoryReachable

▸ **isActiveDirectoryReachable**(): *boolean*

*Defined in [src/sso/domain.ts:26](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/domain.ts#L26)*

**Returns:** *boolean*

___

###  isOnDomain

▸ **isOnDomain**(): *boolean*

*Defined in [src/sso/domain.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/domain.ts#L22)*

Want to know if your computer has joined a Microsoft Windows domain ?

**`export`** 

**Returns:** *boolean*

true if this computer joined a domain, false otherwise.
