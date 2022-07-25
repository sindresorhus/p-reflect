import {expectType} from 'tsd';
import pReflect, {isFulfilled} from './index.js';

const result = await pReflect(Promise.resolve('foo'));

if (isFulfilled(result)) {
	expectType<'fulfilled'>(result.status);
	expectType<string>(result.value);
	expectType<true>(result.isFulfilled);
	expectType<false>(result.isRejected);
} else {
	expectType<'rejected'>(result.status);
	expectType<unknown>(result.reason);
	expectType<false>(result.isFulfilled);
	expectType<true>(result.isRejected);
}
