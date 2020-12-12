const fs = require('fs');
const assert = require('assert');
const md5 = require('md5');

function findKeyOfHashWithPrefix (secret, prefix, verbose) {
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    if (md5(secret + i).indexOf(prefix) === 0) {
      return i;
    }
  }

  return -1;
}

module.exports = function runner(inputFile, verbose) {
  assert.equal(findKeyOfHashWithPrefix('abcdef', '00000', verbose), 609043);
  assert.equal(findKeyOfHashWithPrefix('pqrstuv', '00000', verbose), 1048970);

  const solution = findKeyOfHashWithPrefix('iwrupvqb', '00000', verbose);
  assert.equal(solution, 9958218);
  console.log('Final Answer:', solution);
}
