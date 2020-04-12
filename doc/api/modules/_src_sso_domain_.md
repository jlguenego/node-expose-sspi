[node-expose-sspi](../README.md) › ["src/sso/domain"](_src_sso_domain_.md)

# Module: "src/sso/domain"

## Index

### Functions

* [getDefaultDomain](_src_sso_domain_.md#getdefaultdomain)
* [isActiveDirectoryReachable](_src_sso_domain_.md#isactivedirectoryreachable)
* [isOnDomain](_src_sso_domain_.md#isondomain)

## Functions

###  getDefaultDomain

▸ **getDefaultDomain**(): *string*

*Defined in [src/sso/domain.ts:9](https://github.com/jlguenego/node-expose-sspi/blob/d63ba44/src/sso/domain.ts#L9)*

Get the domain (Microsoft domain) or hostname (workgroup) of this machine.

**Returns:** *string*

domain name

___

###  isActiveDirectoryReachable

▸ **isActiveDirectoryReachable**(): *boolean*

*Defined in [src/sso/domain.ts:25](https://github.com/jlguenego/node-expose-sspi/blob/d63ba44/src/sso/domain.ts#L25)*

**Returns:** *boolean*

___

###  isOnDomain

▸ **isOnDomain**(): *boolean*

*Defined in [src/sso/domain.ts:21](https://github.com/jlguenego/node-expose-sspi/blob/d63ba44/src/sso/domain.ts#L21)*

Want to know if your computer has joined a Microsoft Windows domain ?

**`export`** 

**Returns:** *boolean*

true if this computer joined a domain, false otherwise.
