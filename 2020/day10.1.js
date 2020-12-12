const fs = require('fs');

let joltDiffs = {
  1: 0,
  2: 0,
  3: 1 // final
}

function findChainNext (inputLines, adapterJoltage) {
  let available = inputLines.filter(x => x > adapterJoltage && (x - adapterJoltage) < 4);
  let choice = Math.min(...available);
  let diff = choice - adapterJoltage;
  joltDiffs[diff]++;
  return choice;
}


module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const maxJoltage = Math.max(...inputLines);
  const adapterJoltage = maxJoltage + 3;

  let i = 0;
  while (i !== maxJoltage) {
    i = findChainNext(inputLines, i);
  }

  if (verbose) {
    console.log(i, joltDiffs, joltDiffs[1] * joltDiffs[3]);
  }

  console.log('Final Answer:', joltDiffs[1] * joltDiffs[3]);
};
