import test from 'ava';
import pReflect from './index.js';

const fixture = Symbol('fixture');

test('main', async t => {
	t.deepEqual(
		await pReflect(Promise.resolve(fixture)),
		{
			status: 'fulfilled',
			value: fixture,
			isFulfilled: true,
			isRejected: false
		}
	);

	t.deepEqual(
		await pReflect(Promise.reject(fixture)),
		{
			status: 'rejected',
			reason: fixture,
			isFulfilled: false,
			isRejected: true
		}
	);
});
