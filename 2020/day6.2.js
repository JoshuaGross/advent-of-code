const fs = require('fs');
const sum = require('../utils/sum');

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n\n').filter(x => !!x);

  let groupAnswers = inputLines.map(lines => {
    const numPeople = lines.split('\n').filter(x => !!x).length;
    if (verbose) {
      console.log(lines.split('\n'));
    }
    const uniqueChars = {};
    lines.split('\n').join('').split('').forEach(char => {
      uniqueChars[char] = (uniqueChars[char] || 0) + 1;
    });
    if (verbose) {
      console.log(uniqueChars, numPeople);
    }
    return Object.keys(uniqueChars).filter(char => uniqueChars[char] === numPeople).length;
  });

  if (verbose) {
    console.log(groupAnswers);
  }
  console.log('Final Answer:', sum(...groupAnswers));
};

