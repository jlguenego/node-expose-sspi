[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/client"](_src_sso_client_.md)

# Module: "src/sso/client"

## Index

### Classes

* [Client](../classes/_src_sso_client_.client.md)

### Functions

* [getSPNFromURI](_src_sso_client_.md#getspnfromuri)

## Functions

###  getSPNFromURI

▸ **getSPNFromURI**(`url`: string): *Promise‹string›*

*Defined in [src/sso/client.ts:31](https://github.com/jlguenego/node-expose-sspi/blob/c193c18/src/sso/client.ts#L31)*

Get the SPN the same way Chrome/Firefox or IE does.

Links:
- getting the domain name: https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
- algo of IE : https://support.microsoft.com/en-us/help/4551934/kerberos-failures-in-internet-explorer

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹string›*
