const fs = require('fs');
const assert = require('assert');

function runCircuit (instructions) {
  const registers = {};
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(line => {
    let parts = line.split(' -> ');
    return [parts[0].split(' '), parts[1]];
  });

  console.log(inputLines);
  runCircuit();

  const solution = 0;
  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}

