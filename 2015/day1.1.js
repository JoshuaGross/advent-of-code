const fs = require('fs');
const assert = require('assert');

module.exports = function runner(inputFile, verbose) {
  const inputChars = fs.readFileSync(inputFile, 'utf8').split('').filter(x => !!x);

  let floor = 0;
  for (const ch of inputChars) {
    if (ch === '(') floor++;
    if (ch === ')') floor--;
  }

  const solution = floor;
  assert.equal(solution, 232);
  console.log('Final Answer:', solution);
}
