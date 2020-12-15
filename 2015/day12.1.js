const fs = require('fs');
const assert = require('assert');

function sumObject (obj) {
  if (typeof obj === 'number') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.reduce((acc, val) => acc + sumObject(val), 0);
  }
  if (typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, k) => acc + sumObject(obj[k]), 0);
  }
  return 0;
}

module.exports = function runner(inputFile, verbose) {
  const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

  assert.equal(sumObject([1,2,3]), 6);
  assert.equal(sumObject({"a":2,"b":4}), 6);

  const solution = sumObject(input);
  assert.equal(solution, 156366);
  console.log('Final Answer:', solution);
}
