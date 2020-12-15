const fs = require('fs');
const assert = require('assert');
const parseEscapedString = require('../utils/parseEscapedString');

function parseInput (str) {
  return str.split('\n').filter(x => !!x);
}

function getCodeAndInMemoryLength (s) {
  const parsed = parseEscapedString(s);
  return [s.length, parsed.length, parsed];
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  assert.equal(getCodeAndInMemoryLength("\"\"")[0], 2);
  assert.equal(getCodeAndInMemoryLength("\"\"")[1], 0);
  assert.equal(getCodeAndInMemoryLength("\"abc\"")[0], 5);
  assert.equal(getCodeAndInMemoryLength("\"abc\"")[1], 3);
  assert.equal(getCodeAndInMemoryLength("\"aaa\\\"aaa\"")[0], 10);
  assert.equal(getCodeAndInMemoryLength("\"aaa\"aaa\"")[1], 7);
  assert.equal(getCodeAndInMemoryLength("\"\\x27\"")[0], 6);
  assert.equal(getCodeAndInMemoryLength("\"\\x27\"")[1], 1);
  assert.equal(getCodeAndInMemoryLength("\"\\x27\"")[2], "'");

  const codeLen = inputLines.reduce((acc, line) => acc + line.length, 0);
  const inMemoryStrLen = inputLines.reduce((acc, line) => acc + parseEscapedString(line).length, 0);

  const solution = codeLen - inMemoryStrLen;
  assert.equal(solution, 1371);
  console.log('Final Answer:', solution);
}
