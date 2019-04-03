import {expectType} from 'tsd';
import pReflect = require('.');

const result = await pReflect(Promise.resolve('foo'));

if (result.isFulfilled) {
	expectType<true>(result.isFulfilled);
	expectType<false>(result.isRejected);
	expectType<string>(result.value);
} else {
	expectType<false>(result.isFulfilled);
	expectType<true>(result.isRejected);
	expectType<unknown>(result.reason);
}
