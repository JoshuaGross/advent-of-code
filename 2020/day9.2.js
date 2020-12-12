const fs = require('fs');
const sum = require('../utils/sum');

const preambleLength = 25;
const lastN = [];

let ptr = 0;

function readPreamble (inputLines) {
  for (let i = 0; i < preambleLength; i++) {
    lastN.push(inputLines[ptr]);
    ptr++;
  }
}

function numberIsValid (preamble, number) {
  for (let i = 0; i < preamble.length; i++) {
    for (let j = 0; j < preamble.length; j++) {
      if (i === j) {
        continue;
      }

      if (preamble[i]+preamble[j] === number) {
        return true;
      }
    }
  }
  
  return false;
}

function findBadInput (inputLines) {
  while (ptr < inputLines.length) {
    const preamble = lastN;
    const currNum = inputLines[ptr];
    if (!numberIsValid(preamble, currNum)) {
      return currNum;
    }

    lastN.shift();
    lastN.push(currNum);
    ptr++;
  }
}

// Find contiguous set
function findContiguousSet(inputLines, badNumber) {
  for (let i = 0; i < inputLines.length; i++) {
    for (let j = i + 1; j < inputLines.length; j++) {
      const numbers = inputLines.slice(i, j);
      const summed = sum(...numbers);
      if (summed > badNumber) {
        break;
      }
      if (summed === badNumber) {
        return numbers;
      }
    }
  }
  return [];
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  readPreamble(inputLines);

  const badNumber = findBadInput(inputLines);
  const contiguousSet = findContiguousSet(inputLines, badNumber);

  console.log('Final Answer:', Math.min(...contiguousSet) + Math.max(...contiguousSet));
};
