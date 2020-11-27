[node-expose-sspi](../README.md) › [Globals](../globals.md) › ["src/sso/misc"](_src_sso_misc_.md)

# Module: "src/sso/misc"

## Index

### Functions

* [decode](_src_sso_misc_.md#decode)
* [encode](_src_sso_misc_.md#encode)
* [getFlags](_src_sso_misc_.md#getflags)
* [getMessageType](_src_sso_misc_.md#getmessagetype)
* [hex2a](_src_sso_misc_.md#hex2a)
* [hexDump](_src_sso_misc_.md#hexdump)
* [toHex](_src_sso_misc_.md#tohex)

## Functions

###  decode

▸ **decode**(`base64`: string): *ArrayBuffer*

*Defined in [src/sso/misc.ts:111](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L111)*

Decode a base64 string into an arraybuffer.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`base64` | string |

**Returns:** *ArrayBuffer*

___

###  encode

▸ **encode**(`b`: ArrayBuffer): *string*

*Defined in [src/sso/misc.ts:123](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L123)*

Encode an arraybuffer to base64 string.

**`export`** 

**Parameters:**

Name | Type |
------ | ------ |
`b` | ArrayBuffer |

**Returns:** *string*

___

###  getFlags

▸ **getFlags**(`flags`: [Flag](../interfaces/_src_sso_interfaces_.flag.md)[], `value`: number): *string*

*Defined in [src/sso/misc.ts:96](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`flags` | [Flag](../interfaces/_src_sso_interfaces_.flag.md)[] |
`value` | number |

**Returns:** *string*

___

###  getMessageType

▸ **getMessageType**(`token`: string): *[MessageType](_src_sso_interfaces_.md#messagetype)*

*Defined in [src/sso/misc.ts:69](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`token` | string |

**Returns:** *[MessageType](_src_sso_interfaces_.md#messagetype)*

___

###  hex2a

▸ **hex2a**(`hex`: string): *string*

*Defined in [src/sso/misc.ts:89](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`hex` | string |

**Returns:** *string*

___

###  hexDump

▸ **hexDump**(`buffer`: ArrayBuffer): *string*

*Defined in [src/sso/misc.ts:23](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L23)*

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

*Defined in [src/sso/misc.ts:58](https://github.com/jlguenego/node-expose-sspi/blob/93b1415/src/sso/misc.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`buffer` | ArrayBuffer |

**Returns:** *string*
