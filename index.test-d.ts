import {expectType} from 'tsd';
import pReflect, {isFulfilled} from './index.js';

const result = await pReflect(Promise.resolve('foo'));

if (isFulfilled(result)) {
	expectType<'fulfilled'>(result.status);
	expectType<true>(result.isFulfilled);
	expectType<false>(result.isRejected);
	expectType<string>(result.value);
} else {
	expectType<'rejected'>(result.status);
	expectType<false>(result.isFulfilled);
	expectType<true>(result.isRejected);
	expectType<unknown>(result.reason);
}
