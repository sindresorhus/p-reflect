export default async function pReflect(promise) {
	try {
		const value = await promise;

		return {
			isFulfilled: true,
			isRejected: false,
			value
		};
	} catch (error) {
		return {
			isFulfilled: false,
			isRejected: true,
			reason: error
		};
	}
}
