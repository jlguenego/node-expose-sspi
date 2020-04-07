[node-expose-sspi](../README.md) › ["src/interfaces"](_src_interfaces_.md)

# Module: "src/interfaces"

## Index

### Interfaces

* [ADUser](../interfaces/_src_interfaces_.aduser.md)
* [AuthOptions](../interfaces/_src_interfaces_.authoptions.md)
* [CookieList](../interfaces/_src_interfaces_.cookielist.md)
* [Database](../interfaces/_src_interfaces_.database.md)
* [User](../interfaces/_src_interfaces_.user.md)

### Type aliases

* [ADUsers](_src_interfaces_.md#adusers)
* [AsyncMiddleware](_src_interfaces_.md#asyncmiddleware)
* [NextFunction](_src_interfaces_.md#nextfunction)

## Type aliases

###  ADUsers

Ƭ **ADUsers**: *[ADUser](../interfaces/_src_interfaces_.aduser.md)[]*

*Defined in [src/interfaces.ts:98](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/interfaces.ts#L98)*

___

###  AsyncMiddleware

Ƭ **AsyncMiddleware**: *function*

*Defined in [src/interfaces.ts:16](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/interfaces.ts#L16)*

#### Type declaration:

▸ (`req`: IncomingMessage, `res`: ServerResponse, `next`: [NextFunction](_src_interfaces_.md#nextfunction)): *Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`req` | IncomingMessage |
`res` | ServerResponse |
`next` | [NextFunction](_src_interfaces_.md#nextfunction) |

___

###  NextFunction

Ƭ **NextFunction**: *function*

*Defined in [src/interfaces.ts:22](https://github.com/jlguenego/node-expose-sspi/blob/502a4fd/src/interfaces.ts#L22)*

#### Type declaration:

▸ (`error?`: Error): *void | Promise‹void›*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error |
