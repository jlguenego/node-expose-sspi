[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/interfaces"](../modules/_src_sso_interfaces_.md) › [SSOOptions](_src_sso_interfaces_.ssooptions.md)

# Interface: SSOOptions

## Hierarchy

* **SSOOptions**

  ↳ [AuthOptions](_src_sso_interfaces_.authoptions.md)

## Index

### Properties

* [groupFilterRegex](_src_sso_interfaces_.ssooptions.md#groupfilterregex)
* [useActiveDirectory](_src_sso_interfaces_.ssooptions.md#useactivedirectory)
* [useGroups](_src_sso_interfaces_.ssooptions.md#usegroups)
* [useOwner](_src_sso_interfaces_.ssooptions.md#useowner)

## Properties

###  groupFilterRegex

• **groupFilterRegex**: *string*

*Defined in [src/sso/interfaces.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/interfaces.ts#L99)*

Filter the groups. Useful if there are too much groups to fetch.

**`default`** ".*"

**`memberof`** SSOOptions

___

###  useActiveDirectory

• **useActiveDirectory**: *boolean*

*Defined in [src/sso/interfaces.ts:69](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/interfaces.ts#L69)*

Brings back the Active Directory user information

Note 1: only if we can reach Active Directory of the Domain Controller

**`default`** true

**`memberof`** SSOOptions

___

###  useGroups

• **useGroups**: *boolean*

*Defined in [src/sso/interfaces.ts:79](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/interfaces.ts#L79)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** SSOOptions

___

###  useOwner

• **useOwner**: *boolean*

*Defined in [src/sso/interfaces.ts:89](https://github.com/jlguenego/node-expose-sspi/blob/7ca1305/src/sso/interfaces.ts#L89)*

Brings back the server process owner info.

**`default`** false

**`memberof`** SSOOptions
