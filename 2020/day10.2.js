const fs = require('fs');

let memoizedChoiceCount = {};

function sum (...args) {
  return args.reduce((acc, x) => acc+x, 0);
}

function findChoiceCount (maxJoltage, inputLines, currentJoltage) {
  if (memoizedChoiceCount[currentJoltage]) {
    return memoizedChoiceCount[currentJoltage];
  }

  if (currentJoltage === maxJoltage) {
    memoizedChoiceCount[currentJoltage] = 1;
    return 1;
  }

  let choices = inputLines.filter(x => x > currentJoltage && (x - currentJoltage) < 4);
  let choiceSum = sum(...choices.map(findChoiceCount.bind(null, maxJoltage, inputLines)));
  memoizedChoiceCount[currentJoltage] = choiceSum;
  return choiceSum;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  const maxJoltage = Math.max(...inputLines);

  let choiceCount = findChoiceCount(maxJoltage, inputLines, 0);

  console.log('Final Answer:', choiceCount);
};

