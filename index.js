export default async function pReflect(promise) {
	try {
		const value = await promise;

		return {
			status: 'fulfilled',
			value,
			isFulfilled: true,
			isRejected: false
		};
	} catch (error) {
		return {
			status: 'rejected',
			reason: error,
			isFulfilled: false,
			isRejected: true
		};
	}
}

export function isFulfilled(promiseResult) {
	return 'value' in promiseResult;
}

export function isRejected(promiseResult) {
	return 'reason' in promiseResult;
}
