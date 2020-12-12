const fs = require('fs');

module.exports = function runner(inputFile, verbose) {
  const input = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => parseInt(x, 10));

  for (var i = 0; i < input.length; i++) {
    let found = false;

    for (var j = 0; j < input.length; j++) {
      if (j === i) {
        continue;
      }
      if (found) {
        continue;
      }
      for (var k = 0; k < input.length; k++) {
        if (found) {
          continue;
        }
        if (k === i || k === j) {
          continue;
        }

        if (input[i] + input[j] + input[k] === 2020) {
          found = true;
          console.log(input[i], input[j], input[k], input[i] * input[j] * input[k]);
        }
      }

    }
  }
};

