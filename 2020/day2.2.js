const fs = require('fs');

const validator = function (line, verbose) {
  const [criteriaTxt, password] = line.split(': ');
  const [criteriaNumbers, criteriaLetter] = criteriaTxt.split(' ');
  const [criteriaMin, criteriaMax] = criteriaTxt.split('-').map(x => parseInt(x, 10));

  const a = password[criteriaMin-1] === criteriaLetter;
  const b = password[criteriaMax-1] === criteriaLetter;

  const result = (a || b) && !(a && b);
  if (verbose) {
    console.log(line, a, b, result);
  }
  return result;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);
  console.log('Final Answer:', inputLines.filter(line => validator(line, verbose)).length);
};
