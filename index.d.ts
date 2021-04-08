export interface PromiseFulfilledResult<ValueType> {
	isFulfilled: true;
	isRejected: false;
	value: ValueType;
}

export interface PromiseRejectedResult {
	isFulfilled: false;
	isRejected: true;
	reason: unknown;
}

export type PromiseResult<ValueType> =
	| PromiseFulfilledResult<ValueType>
	| PromiseRejectedResult;

/**
Make a promise always fulfill with its actual fulfillment value or rejection reason.

@param promise - A promise to reflect upon.
@returns Promise reflection.

@example
```
import pReflect from 'p-reflect';

// Here, `Promise.all` would normally fail early because one of the promises rejects, but by using `p-reflect`, we can ignore the rejection and handle it later on.

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
		isFulfilled: true,
		isRejected: false,
		value: '🦄'
	},
	{
		isFulfilled: false,
		isRejected: true,
		reason: [Error: 👹]
	},
	{
		isFulfilled: true,
		isRejected: false,
		value: '🐴'
	}
]
*\/

const resolvedString = results
	.filter(result => result.isFulfilled)
	.map(result => result.value)
	.join('');

console.log(resolvedString);
//=> '🦄🐴'
```
*/
export default function pReflect<ValueType>(promise: PromiseLike<ValueType>): Promise<
PromiseResult<ValueType>
>;
