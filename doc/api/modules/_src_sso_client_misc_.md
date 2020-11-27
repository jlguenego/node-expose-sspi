[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client/misc"](_src_sso_client_misc_.md)

# Module: "src/sso/client/misc"

## Index

### Functions

* [encodeBase64](_src_sso_client_misc_.md#encodebase64)
* [getSPNFromURI](_src_sso_client_misc_.md#getspnfromuri)
* [md5](_src_sso_client_misc_.md#md5)

## Functions

###  encodeBase64

▸ **encodeBase64**(`str`: string): *string*

*Defined in [src/sso/client/misc.ts:56](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client/misc.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *string*

___

###  getSPNFromURI

▸ **getSPNFromURI**(`url`: string): *Promise‹string›*

*Defined in [src/sso/client/misc.ts:19](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client/misc.ts#L19)*

Get the SPN the same way Chrome/Firefox or IE does.

Links:
- getting the domain name: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
- algo of IE : https://support.microsoft.com/en-us/help/4551934/kerberos-failures-in-internet-explorer

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹string›*

___

###  md5

▸ **md5**(`str`: string): *string*

*Defined in [src/sso/client/misc.ts:61](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/client/misc.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *string*
