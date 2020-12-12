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
    if (ptr === code.length) {
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

function isInfiniteLoop (code) {
  let ptr = 0;
  let acc = 0;
  let visited = {};

  while (true) {
    if (visited[ptr]) {
      return true;
    }
    if (ptr === code.length) {
      return false;
    }
    visited[ptr] = true;
    let [instr, num_] = code[ptr];
    const num = parseInt(num_, 10);
    if (instr === 'acc') {
      acc += num;
      ptr++;
    } else if (instr === 'nop') {
      ptr++;
    } else if (instr === 'jmp') {
      ptr += num;
    }
  }

  return false;
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x).map(x => x.split(' '));

  let changed = 0;
  let fixedCode;
  while (true) {
    const clonedInputLines = [...inputLines.map(line => [...line])];
    if (clonedInputLines[changed][0] === 'acc') {
      changed++;
      continue;
    }
    clonedInputLines[changed][0] = clonedInputLines[changed][0] === 'nop' ? 'jmp' : 'nop';
    if (!isInfiniteLoop(clonedInputLines)) {
      fixedCode = clonedInputLines;
      break;
    } else {
    }

    changed++;
  }

  console.log('Final Answer:', interpreter(fixedCode, verbose));
};
