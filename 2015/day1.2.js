const fs = require('fs');
const assert = require('assert');

module.exports = function runner(inputFile, verbose) {
  const inputChars = fs.readFileSync(inputFile, 'utf8').split('').filter(x => !!x);

  let floor = 0, pos = 0;
  for (const ch of inputChars) {
    if (ch === '(') floor++;
    if (ch === ')') floor--;
    pos++;
    if (floor === -1) {
      break;
    }
  }

  const solution = pos;
  assert.equal(solution, 1783);
  console.log('Final Answer:', solution);
}
