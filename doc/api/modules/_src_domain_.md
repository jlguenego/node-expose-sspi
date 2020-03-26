[node-expose-sspi](../README.md) › ["src/domain"](_src_domain_.md)

# Module: "src/domain"

## Index

### Functions

* [getDefaultDomain](_src_domain_.md#getdefaultdomain)
* [isOnDomain](_src_domain_.md#isondomain)

## Functions

###  getDefaultDomain

▸ **getDefaultDomain**(): *string*

*Defined in [src/domain.ts:8](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/domain.ts#L8)*

Get the domain (Microsoft domain) or hostname (workgroup) of this machine.

**Returns:** *string*

domain name

___

###  isOnDomain

▸ **isOnDomain**(): *boolean*

*Defined in [src/domain.ts:20](https://github.com/jlguenego/node-expose-sspi/blob/d0f69f6/src/domain.ts#L20)*

Want to know if your computer has joined a Microsoft Windows domain ?

**`export`** 

**Returns:** *boolean*

true if this computer joined a domain, false otherwise.
