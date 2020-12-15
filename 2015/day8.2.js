const fs = require('fs');
const assert = require('assert');
const escapeString = require('../utils/escapeString');

function parseInput (str) {
  return str.split('\n').filter(x => !!x);
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  assert.equal(escapeString("\"\"", '"', true).length, 6);

  const codeLen = inputLines.reduce((acc, line) => acc + line.length, 0);
  const encodedLen = inputLines.reduce((acc, line) => acc + escapeString(line, '"', true).length, 0);

  const solution = encodedLen - codeLen;
  assert.equal(solution, 2117);
  console.log('Final Answer:', solution);
}
