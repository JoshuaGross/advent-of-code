const fs = require('fs');

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n\n').filter(x => !!x).map(x => x.split(/\s/).filter(x => x.indexOf('cid') === -1));

  if (verbose) {
    console.log(inputLines);
  }
  console.log('Final Answer:', inputLines.filter(x => x.length >= 7).length);
};
