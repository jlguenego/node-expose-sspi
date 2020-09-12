[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/interfaces"](../modules/_src_sso_interfaces_.md) › [AuthOptions](_src_sso_interfaces_.authoptions.md)

# Interface: AuthOptions

options to provide to sso.auth() and SSO.setOptions().

**`export`** 

**`interface`** AuthOptions

## Hierarchy

* **AuthOptions**

## Index

### Properties

* [allowsAnonymousLogon](_src_sso_interfaces_.authoptions.md#optional-allowsanonymouslogon)
* [allowsGuest](_src_sso_interfaces_.authoptions.md#optional-allowsguest)
* [groupFilterRegex](_src_sso_interfaces_.authoptions.md#optional-groupfilterregex)
* [useActiveDirectory](_src_sso_interfaces_.authoptions.md#optional-useactivedirectory)
* [useCookies](_src_sso_interfaces_.authoptions.md#optional-usecookies)
* [useGroups](_src_sso_interfaces_.authoptions.md#optional-usegroups)
* [useOwner](_src_sso_interfaces_.authoptions.md#optional-useowner)

## Properties

### `Optional` allowsAnonymousLogon

• **allowsAnonymousLogon**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:119](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L119)*

If true, someone that connects without login/password may be
authenticated as Windows anonymous user account.

**`default`** false

**`memberof`** AuthOptions

___

### `Optional` allowsGuest

• **allowsGuest**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:108](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L108)*

If true, someone that connects with wrong login/password may be
authenticated as Windows guest user.

**`default`** false

**`memberof`** AuthOptions

___

### `Optional` groupFilterRegex

• **groupFilterRegex**? : *undefined | string*

*Defined in [src/sso/interfaces.ts:97](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L97)*

Filter the groups. Useful if there are too much groups to fetch.

**`default`** ".*"

**`memberof`** AuthOptions

___

### `Optional` useActiveDirectory

• **useActiveDirectory**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:66](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L66)*

Brings back the Active Directory user information

Note 1: only if we can reach Active Directory of the Domain Controller

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useCookies

• **useCookies**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:87](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L87)*

Manage authentication with cookie.
Useful for performance when many users try to connect at the same time.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useGroups

• **useGroups**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:54](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L54)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useOwner

• **useOwner**? : *undefined | false | true*

*Defined in [src/sso/interfaces.ts:76](https://github.com/jlguenego/node-expose-sspi/blob/9a7ed80/src/sso/interfaces.ts#L76)*

Brings back the server process owner info.

**`default`** false

**`memberof`** AuthOptions
