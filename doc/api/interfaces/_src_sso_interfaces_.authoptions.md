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

• **allowsAnonymousLogon**? : *boolean*

*Defined in [src/sso/interfaces.ts:113](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L113)*

If true, someone that connects without login/password may be
authenticated as Windows anonymous user account.

**`default`** false

**`memberof`** AuthOptions

___

### `Optional` allowsGuest

• **allowsGuest**? : *boolean*

*Defined in [src/sso/interfaces.ts:102](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L102)*

If true, someone that connects with wrong login/password may be
authenticated as Windows guest user.

**`default`** false

**`memberof`** AuthOptions

___

### `Optional` groupFilterRegex

• **groupFilterRegex**? : *string*

*Defined in [src/sso/interfaces.ts:91](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L91)*

Filter the groups. Useful if there are too much groups to fetch.

**`default`** ".*"

**`memberof`** AuthOptions

___

### `Optional` useActiveDirectory

• **useActiveDirectory**? : *boolean*

*Defined in [src/sso/interfaces.ts:60](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L60)*

Brings back the Active Directory user information

Note 1: only if we can reach Active Directory of the Domain Controller

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useCookies

• **useCookies**? : *boolean*

*Defined in [src/sso/interfaces.ts:81](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L81)*

Manage authentication with cookie.
Useful for performance when many users try to connect at the same time.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useGroups

• **useGroups**? : *boolean*

*Defined in [src/sso/interfaces.ts:48](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L48)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useOwner

• **useOwner**? : *boolean*

*Defined in [src/sso/interfaces.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/3a7c182/src/sso/interfaces.ts#L70)*

Brings back the server process owner info.

**`default`** false

**`memberof`** AuthOptions
