const fs = require('fs');
const chalk = require('chalk');

function interpreter (code, verbose) {
  let ptr = 0;
  let acc = 0;
  let visited = {};

  while (true) {
    if (visited[ptr]) {
      return acc;
    }
    visited[ptr] = true;
    let [instr, num_] = code[ptr];
    const num = parseInt(num_, 10);
    if (verbose) {
      console.log(chalk.red(ptr), chalk.green(instr), chalk.green(num));
    }
    if (instr === 'acc') {
      acc += num;
      ptr++;
    } else if (instr === 'nop') {
      ptr++;
    } else if (instr === 'jmp') {
      ptr += num;
    } else {
      return acc;
    }
  }
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => x.split(' '));
  console.log('Final Answer:', interpreter(inputLines, verbose));
};
