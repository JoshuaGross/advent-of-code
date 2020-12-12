const fs = require('fs');
const sum = require('../utils/sum');

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n\n').filter(x => !!x);

  let groupAnswers = inputLines.map(lines => {
    const uniqueChars = {};
    lines.split('\n').join('').split('').forEach(char => {
      uniqueChars[char] = true;
    });
    return Object.keys(uniqueChars).length;
  });

  if (verbose) {
    console.log(groupAnswers);
  }
  console.log('Final Answer:', sum(...groupAnswers));
};

