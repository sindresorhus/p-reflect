# p-reflect

> Make a promise always fulfill with its actual fulfillment value or rejection reason

Useful when you want a promise to fulfill no matter what and would rather handle the actual state afterwards.

## Install

```
$ npm install p-reflect
```

## Usage

Here, `Promise.all` would normally fail early because one of the promises rejects, but by using `p-reflect`, we can ignore the rejection and handle it later on.

```js
import pReflect, {isFulfilled} from 'p-reflect';

const promises = [
	getPromise(),
	getPromiseThatRejects(),
	getPromise()
];

const results = await Promise.all(promises.map(pReflect));

console.log(results);
/*
[
	{
		status: 'fulfilled',
		value: '🦄'
		isFulfilled: true,
		isRejected: false
	},
	{
		status: 'rejected',
		reason: [Error: 👹]
		isFulfilled: false,
		isRejected: true
	},
	{
		status: 'fulfilled',
		value: '🐴'
		isFulfilled: true,
		isRejected: false
	}
]
*/

const resolvedString = results
	.filter(isFulfilled)
	.map(result => result.value)
	.join('');

console.log(resolvedString);
//=> '🦄🐴'
```

The above is just an example. Use [`p-settle`](https://github.com/sindresorhus/p-settle) if you need exactly that.

## API

### pReflect(promise)

Returns a `Promise<Object>`.

The object has the following properties:

- `status` *('fulfilled' or 'rejected', Depending on whether the promise fulfilled or rejected)*
- `value` or `reason` *(Depending on whether the promise fulfilled or rejected)*
- `isFulfilled`
- `isRejected`

#### promise

Type: `Promise`

A promise to reflect upon.

### isFulfilled(object)

Returns a `Boolean`.

Returns 'true' if the object has the property 'value'.

This is useful since `await pReflect(promise)` always returns a `PromiseResult`. This function can be used to determine whether `PromiseResult` is `PromiseFulfilledResult` or `PromiseRejectedResult`

- this is a workaround for [microsoft/TypeScript#32399](https://github.com/microsoft/TypeScript/issues/32399)
- reference documentation [Using type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

### isRejected(object)

Returns a `Boolean`.

Returns 'true' if the object has the property 'reason'.

This is useful since `await pReflect(promise)` always returns a `PromiseResult`. This function can be used to determine whether `PromiseResult` is `PromiseRejectedResult` or `PromiseFulfilledResult`

## Related

- [p-settle](https://github.com/sindresorhus/p-settle) - Settle promises concurrently and get their fulfillment value or rejection reason
- [More…](https://github.com/sindresorhus/promise-fun)
