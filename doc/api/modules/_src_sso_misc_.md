[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/misc"](_src_sso_misc_.md)

# Module: "src/sso/misc"

## Index

### Functions

* [getMessageType](_src_sso_misc_.md#getmessagetype)
* [hexDump](_src_sso_misc_.md#hexdump)
* [toHex](_src_sso_misc_.md#tohex)

## Functions

###  getMessageType

▸ **getMessageType**(`token`: string): *[MessageType](_src_sso_interfaces_.md#messagetype)*

*Defined in [src/sso/misc.ts:70](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/src/sso/misc.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *[MessageType](_src_sso_interfaces_.md#messagetype)*

___

###  hexDump

▸ **hexDump**(`buffer`: ArrayBuffer): *string*

*Defined in [src/sso/misc.ts:24](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/src/sso/misc.ts#L24)*

Gives a string representation of binary data.

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *string*

the string representation.

___

###  toHex

▸ **toHex**(`buffer`: ArrayBuffer): *string*

*Defined in [src/sso/misc.ts:59](https://github.com/jlguenego/node-expose-sspi/blob/545dc2a/src/sso/misc.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *string*
