const fs = require('fs');

const validator = function (line) {
  const [criteriaTxt, password] = line.split(': ');
  const [criteriaNumbers, criteriaLetter] = criteriaTxt.split(' ');
  const [criteriaMin, criteriaMax] = criteriaTxt.split('-').map(x => parseInt(x, 10));

  const passwordLetters = password.split('');

  let frequency = 0;
  for (const letter of passwordLetters) {
    if (letter === criteriaLetter) {
      frequency++;
    }

    if (frequency > criteriaMax) {
      return false;
    }
  }

  return frequency >= criteriaMin;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);
  console.log('Final Answer:', inputLines.filter(validator).length);
};
