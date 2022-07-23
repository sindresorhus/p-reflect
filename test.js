import test from 'ava';
import pReflect from './index.js';

const fixture = Symbol('fixture');

test('main', async t => {
	t.deepEqual(
		await pReflect(Promise.resolve(fixture)),
		{
			status: 'fulfilled',
			isFulfilled: true,
			isRejected: false,
			value: fixture
		}
	);

	t.deepEqual(
		await pReflect(Promise.reject(fixture)),
		{
			status: 'rejected',
			isFulfilled: false,
			isRejected: true,
			reason: fixture
		}
	);
});
