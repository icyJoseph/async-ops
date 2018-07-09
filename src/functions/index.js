export const largeNumber = 10000000;

export const toSeconds = (start, end) => ((end - start) / 1000).toFixed(1);

export const buildArraySync = (length, elems) => {
  return Array.from({ length }, () => elems);
};

export const now = () => new Date().getTime();

export async function buildArrayAsync(length, elems, callback, timeout = 200) {
  let index = 0;
  let array = [];

  async function concat() {
    const startTime = now();

    while (index < length && now() - startTime <= timeout) {
      array.push(elems);
      ++index;
    }

    if (index < length) {
      setTimeout(concat, 1);
    } else if (index === length) {
      return typeof callback === "function" ? callback(array) : array;
    }
  }

  await concat();
}

/* General case -  in progress*/
export async function process(array, fn, start, timeout = 200) {
  let index = 0;

  async function reduce(start) {
    const startTime = now();
    let result = start;
    while (index < array.length && now() - startTime <= timeout) {
      result = fn.call(this, array[index], index, array, result);
      ++index;
    }
    if (index < array.length) {
      setTimeout(reduce, 1);
    } else if (index === array.length) {
      return result;
    }
  }
  await reduce(start);
}
