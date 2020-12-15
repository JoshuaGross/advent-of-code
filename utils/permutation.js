function swap (a, i, j) {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
  return a;
}

function* heapsAlg(arr, clone) {
  let size = arr.length
  if (typeof arr === 'string') {
    arr = arr.split('')
  }
  yield* heapsUtil(0)
  function* heapsUtil(index) {
    if (index === size) {
      return yield clone ? arr.slice() : arr
    }

    for (let j = index; j < size; j++) {
      swap(arr, index, j)
      yield* heapsUtil(index + 1)
      swap(arr, index, j)
    }
  }
}

// From https://github.com/acarl005/generatorics/blob/master/generatorics.js
// MIT licensed
module.exports = function* permutation(arr, size = arr.length) {
  let len = arr.length;
  if (size === len) { // switch to Heap's algorithm. it's more efficient
    return yield* heapsAlg(arr, true);
  }
  let data = [];
  let indicesUsed = []; // permutations do not repeat elements. keep track of the indeces of the elements already used
  yield* permutationUtil(0)
  function* permutationUtil(index) {
    if (index === size) {
      return yield data.slice();
    }
    for (let i = 0; i < len; i++) {
      if (!indicesUsed[i]) {
        indicesUsed[i] = true
        data[index] = arr[i]
        yield *permutationUtil(index + 1)
        indicesUsed[i] = false
      }
    }
  }
}
