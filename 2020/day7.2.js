const fs = require('fs');
const chalk = require('chalk');

function countNestedBags (rulesMap, test_, verbose, memo={}) {
  function helper (test) {
    if (memo[test] != null) {
      return memo[test];
    }

    const rulesMapped = rulesMap[test];

    let sum = 1;
    if (rulesMapped) {
      for (const [num_, bagType] of rulesMapped) {
        let result;
        if (num_ !== 'no') {
          const num = parseInt(num_, 10);
          result = num * helper(bagType);
        } else {
          result = 0;
        }
        sum += result;
        if (verbose) {
          console.log(chalk.red(test, '=', sum) + ':', chalk.green(num_), chalk.yellow(`${bagType}(${result})`));
        }
      }
    }

    memo[test] = sum;
    return sum;
  }

  return helper(test_);
}

module.exports = function runner(inputFile, verbose) {
  const inputLines = fs.readFileSync(inputFile, 'utf8').split('\n').filter(x => !!x);

  const rules = inputLines.map(line => {
    const [before, after_] = line.replace(/\.$/, '').replace(/bags/g, 'bag').split(' contain ');
    const after = after_.split(/\s*,\s*/).map(x => { let [num, ...rest] = x.split(' '); return [num, rest.join(' ')]; });
    return [before, after];
  });

  const rulesMap = rules.reduce((acc, [before, after]) => {
    acc[before] = after;
    return acc;
  }, {});

  const countBags = countNestedBags(rulesMap, 'shiny gold bag', verbose)
  console.log('Final Answer:', countBags - 1);
};

