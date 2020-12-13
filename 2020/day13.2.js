const fs = require('fs');
const assert = require('assert');
const crt = require('../utils/crt');

function buslinesToCRTInputs (buses) {
  let congruences = [];
  for (let i = 0; i < buses.length; i++) {
    const busId = buses[i];
    if (!isNaN(busId)) {
      let rem = BigInt(busId - i);
      while (rem < 0) {
        rem += BigInt(busId);
      }
      congruences.push([BigInt(busId), rem]);
    }
  }

  return congruences;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  // Test input
  const testSolution = crt([[17, 0], [13, 11], [19, 16]].map(list => list.map(x => BigInt(x))));
  assert.equal(testSolution, 3417n);
  assert.equal(crt(buslinesToCRTInputs([17,NaN,13,19])), 3417n);
  assert.equal(crt(buslinesToCRTInputs([67,7,59,61])), 754018n);
  assert.equal(crt(buslinesToCRTInputs([67,7,NaN,59,61])), 1261476n);
  assert.equal(crt(buslinesToCRTInputs([1789,37,47,1889])), 1202161486n);

  // Formulate as Chinese Remainder Theorem problem
  let inServiceBuses = inputLines[1].split(',').map(x => parseInt(x, 10));
  const congruences = buslinesToCRTInputs(inServiceBuses);

  const solution = crt(congruences);
  if (verbose) {
    console.log(congruences, solution);
  }
  assert.equal(solution, 1010182346291467n);
  console.log('Final Answer:', solution);
}

