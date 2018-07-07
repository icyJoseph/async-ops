export const largeNumber = 10000000;

export const makeArray = (length, elems) => Array.from({ length }, () => elems);

export async function asyncReduce(array, handler, start) {
  let result = start;
  for (let value of array) {
    result = await handler(result, value);
  }
  return result;
}

export function reduce(array, handler, start) {
  return array.reduce((acc, val) => handler(acc, val), start);
}

export async function buildArrayAsync(length, elems) {
  let array = [];
  for (let i = 0; i < length; i = i + 1000000) {
    array = await array.concat(makeArray(1000000, elems));
  }
  return array;
}
