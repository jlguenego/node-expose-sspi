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
* [useGroups](_src_interfaces_.authoptions.md#optional-usegroups)
* [useOwner](_src_interfaces_.authoptions.md#optional-useowner)

## Properties

### `Optional` useActiveDirectory

• **useActiveDirectory**? : *boolean*

*Defined in [src/interfaces.ts:28](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/interfaces.ts#L28)*

Brings back the Active Directory user information

Note: only if we can reach Active Directory of the Domain Controller

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useGroups

• **useGroups**? : *boolean*

*Defined in [src/interfaces.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/interfaces.ts#L16)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** AuthOptions

___

### `Optional` useOwner

• **useOwner**? : *boolean*

*Defined in [src/interfaces.ts:39](https://github.com/jlguenego/node-expose-sspi/blob/52464ac/src/interfaces.ts#L39)*

Brings back the server process owner info.

**`default`** true

**`memberof`** AuthOptions
