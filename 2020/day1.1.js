const fs = require('fs');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  for (var i = 0; i < input.length; i++) {
    for (var j = 0; j < input.length; j++) {
      if (j === i) {
        continue;
      }

      if (input[i] + input[j] === 2020) {
        console.log(input[i], input[j], input[i] * input[j]);
      }
    }
  }
};
