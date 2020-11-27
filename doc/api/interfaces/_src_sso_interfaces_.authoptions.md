[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/interfaces"](../modules/_src_sso_interfaces_.md) › [AuthOptions](_src_sso_interfaces_.authoptions.md)

# Interface: AuthOptions

options to provide to sso.auth() and SSO.setOptions().

**`export`** 

**`interface`** AuthOptions

## Hierarchy

* [SSOOptions](_src_sso_interfaces_.ssooptions.md)

  ↳ **AuthOptions**

## Index

### Properties

* [allowsAnonymousLogon](_src_sso_interfaces_.authoptions.md#allowsanonymouslogon)
* [allowsGuest](_src_sso_interfaces_.authoptions.md#allowsguest)
* [forceNTLM](_src_sso_interfaces_.authoptions.md#forcentlm)
* [groupFilterRegex](_src_sso_interfaces_.authoptions.md#groupfilterregex)
* [useActiveDirectory](_src_sso_interfaces_.authoptions.md#useactivedirectory)
* [useGroups](_src_sso_interfaces_.authoptions.md#usegroups)
* [useOwner](_src_sso_interfaces_.authoptions.md#useowner)
* [useSession](_src_sso_interfaces_.authoptions.md#usesession)

## Properties

###  allowsAnonymousLogon

• **allowsAnonymousLogon**: *boolean*

*Defined in [src/sso/interfaces.ts:129](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L129)*

If true, someone that connects without login/password may be
authenticated as Windows anonymous user account.

**`default`** false

**`memberof`** AuthOptions

___

###  allowsGuest

• **allowsGuest**: *boolean*

*Defined in [src/sso/interfaces.ts:118](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L118)*

If true, someone that connects with wrong login/password may be
authenticated as Windows guest user.

**`default`** false

**`memberof`** AuthOptions

___

###  forceNTLM

• **forceNTLM**: *boolean*

*Defined in [src/sso/interfaces.ts:153](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L153)*

If true, the WWW-Authenticate will propose NTLM instead of Negotiate.
This will force the NTLM protocol to be used, and not Kerberos.

**`default`** false

**`memberof`** AuthOptions

___

###  groupFilterRegex

• **groupFilterRegex**: *string*

*Inherited from [SSOOptions](_src_sso_interfaces_.ssooptions.md).[groupFilterRegex](_src_sso_interfaces_.ssooptions.md#groupfilterregex)*

*Defined in [src/sso/interfaces.ts:99](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L99)*

Filter the groups. Useful if there are too much groups to fetch.

**`default`** ".*"

**`memberof`** SSOOptions

___

###  useActiveDirectory

• **useActiveDirectory**: *boolean*

*Inherited from [SSOOptions](_src_sso_interfaces_.ssooptions.md).[useActiveDirectory](_src_sso_interfaces_.ssooptions.md#useactivedirectory)*

*Defined in [src/sso/interfaces.ts:69](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L69)*

Brings back the Active Directory user information

Note 1: only if we can reach Active Directory of the Domain Controller

**`default`** true

**`memberof`** SSOOptions

___

###  useGroups

• **useGroups**: *boolean*

*Inherited from [SSOOptions](_src_sso_interfaces_.ssooptions.md).[useGroups](_src_sso_interfaces_.ssooptions.md#usegroups)*

*Defined in [src/sso/interfaces.ts:79](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L79)*

Brings back the groups the user belongs to.

**`default`** true

**`memberof`** SSOOptions

___

###  useOwner

• **useOwner**: *boolean*

*Inherited from [SSOOptions](_src_sso_interfaces_.ssooptions.md).[useOwner](_src_sso_interfaces_.ssooptions.md#useowner)*

*Defined in [src/sso/interfaces.ts:89](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L89)*

Brings back the server process owner info.

**`default`** false

**`memberof`** SSOOptions

___

###  useSession

• **useSession**: *boolean*

*Defined in [src/sso/interfaces.ts:142](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/interfaces.ts#L142)*

If true, cache the req.sso into req.session.sso.
module `express-session` should be used.
Add an `cached` attribute in the req.session.sso object
indicating if the object was already cached.

**`default`** false

**`memberof`** AuthOptions
