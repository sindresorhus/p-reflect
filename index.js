export default async function pReflect(promise) {
	try {
		const value = await promise;

		return {
			status: 'fulfilled',
			isFulfilled: true,
			isRejected: false,
			value
		};
	} catch (error) {
		return {
			status: 'rejected',
			isFulfilled: false,
			isRejected: true,
			reason: error
		};
	}
}
