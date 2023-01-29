import {expectType} from 'tsd';
import pReflect, {isFulfilled, isRejected} from './index.js';

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

const resultWithErrorType = await pReflect<string, Error>(
	Promise.reject(new Error('foo'))
);

if (isRejected(resultWithErrorType)) {
	expectType<'rejected'>(resultWithErrorType.status);
	expectType<Error>(resultWithErrorType.reason);
	expectType<false>(resultWithErrorType.isFulfilled);
	expectType<true>(resultWithErrorType.isRejected);
}
