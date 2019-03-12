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
 * Make a promise always fulfill with its actual fulfillment value or rejection reason.
 *
 * @param promise - A promise to reflect upon.
 * @returns A fulfilled value.
 */
export default function pReflect<ValueType>(
	promise: PromiseLike<ValueType>
): Promise<PromiseResult<ValueType>>;
