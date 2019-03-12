import test from 'ava';
import pReflect from '.';

const fixture = Symbol('fixture');

test('main', async t => {
	t.deepEqual(
		await pReflect(Promise.resolve(fixture)),
		{
			isFulfilled: true,
			isRejected: false,
			value: fixture
		}
	);

	t.deepEqual(
		await pReflect(Promise.reject(fixture)),
		{
			isFulfilled: false,
			isRejected: true,
			reason: fixture
		}
	);
});
