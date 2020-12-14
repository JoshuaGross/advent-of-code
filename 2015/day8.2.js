const fs = require('fs');
const assert = require('assert');

function parseInput (str) {
  return str.split('\n').filter(x => !!x);
}

function escapeString (str) {
  let output = '"';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\\' || str[i] === '"') {
      output += '\\';
    }
    output += str[i];
  }
  output += '"';
  return output;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = parseInput(fs.readFileSync(inputFile, 'utf8'));

  assert.equal(escapeString("\"\"").length, 6);

  const codeLen = inputLines.reduce((acc, line) => acc + line.length, 0);
  const encodedLen = inputLines.reduce((acc, line) => acc + escapeString(line).length, 0);

  const solution = encodedLen - codeLen;
  //console.log(inputLines);
  console.log(codeLen, encodedLen, solution);
  assert.equal(solution, 2117);
  console.log('Final Answer:', solution);
}
