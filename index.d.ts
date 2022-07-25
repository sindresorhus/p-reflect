export interface PromiseFulfilledResult<ValueType> {
	status: 'fulfilled';
	value: ValueType;
	isFulfilled: true;
	isRejected: false;
}

export interface PromiseRejectedResult {
	status: 'rejected';
	reason: unknown;
	isFulfilled: false;
	isRejected: true;
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

/**
Narrows a variable of type `PromiseResult` to type `PromiseFulfilledResult` if the variable has the property `value`, otherwise narrows it to the `PromiseRejectedResult` type.
*/
export function isFulfilled<T>(promiseResult: PromiseResult<T>): promiseResult is PromiseFulfilledResult<T>;

/**
Narrows a variable of type `PromiseResult` to type `PromiseRejectedResult` if the variable has the property `reason`, otherwise narrows it to the `PromiseFulfilledResult` type.
*/
export function isRejected<T>(promiseResult: PromiseResult<T>): promiseResult is PromiseRejectedResult;
