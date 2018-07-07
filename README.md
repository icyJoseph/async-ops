# Asynchronous Operations

## Hypothesis

JavaScript is single threaded, which means that large operations will block user interactions.

By using Asynchronous operations the JavaScript engine prevent user interaction from being blocked, while
also performing calculations while the thread is free.

Is there any benefit in converting array operations to asynchronous operations? Are large arrays a good test bed?

## Reducer

A normal reducer runs a handler function over each element of the array. The handler has access to the previous result, and the final result of the reducer will be the handler applied to the last element.

For instance:

```js
const sum = [1, 2, 3].reduce((previous, value) => previous + value, 0);
```

The first argument passed to reduce is the handler, or callback. The second argument is the initial value of previous. For every element of the target array, we apply the handler and the result becomes the value of previous in the next iteration. For the first iteration previous equals zero.

### Async Reducer

For very large arrays, this operation will take more time, because each iteration has to be fulfilled to be used by the next iteration. Unlike a map where each evaluation should be independent from the previous iterations.

A first approach:

```js
async function asyncReducer(array, handler, start) {
  let result = start;
  for (let value of array) {
    result = await handler(result, value);
  }
  return result;
}
```

The first thing a functional programmer sees in `asyncReducer` is the for loop. In this case the for loop uses the native iteratior from the array, and allows `yielding` or `awaiting` for the result of each loop.

However, this is very ineffective.
