import test from 'ava';
import m from './';

const fixture = Symbol('fixture');

test(async t => {
	t.deepEqual(
		await m(Promise.resolve(fixture)),
		{
			isFulfilled: true,
			isRejected: false,
			value: fixture
		}
	);

	t.deepEqual(
		await m(Promise.reject(fixture)),
		{
			isFulfilled: false,
			isRejected: true,
			reason: fixture
		}
	);
});
