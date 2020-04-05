[node-expose-sspi](../README.md) › ["src/interfaces"](../modules/_src_interfaces_.md) › [AuthOptions](_src_interfaces_.authoptions.md)

# Interface: AuthOptions

options to provide to sso.auth() and SSO.setOptions().

**`export`** 

**`interface`** AuthOptions

## Hierarchy

* **AuthOptions**

## Index

### Properties

* [useActiveDirectory](_src_interfaces_.authoptions.md#optional-useactivedirectory)
* [useCookies](_src_interfaces_.authoptions.md#optional-usecookies)
* [useGroups](_src_interfaces_.authoptions.md#optional-usegroups)
* [useOwner](_src_interfaces_.authoptions.md#optional-useowner)

## Properties

### `Optional` useActiveDirectory

• **useActiveDirectory**? : *boolean*

*Defined in [src/interfaces.ts:29](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/interfaces.ts#L29)*

Brings back the Active Directory user information

Note 1: only if we can reach Active Directory of the Domain Controller
Note 2: cannot works with useCookies=true.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useCookies

• **useCookies**? : *boolean*

*Defined in [src/interfaces.ts:52](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/interfaces.ts#L52)*

Manage authentication with cookie.
Useful for performance when many users try to connect at the same time.

Note : Cannot work with useActiveDirectory=true.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useGroups

• **useGroups**? : *boolean*

*Defined in [src/interfaces.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/interfaces.ts#L16)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useOwner

• **useOwner**? : *boolean*

*Defined in [src/interfaces.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/19d0c3f/src/interfaces.ts#L39)*

Brings back the server process owner info.

**`default`** true

**`memberof`** AuthOptions
