const fs = require('fs');

function canContain (rulesMap, test, filter, tested=[]) {
  const rulesMapped = rulesMap[test];

  if (!rulesMapped) {
    return false;
  }
  for (const [num, bagType] of rulesMapped) {
    if (tested.indexOf(bagType) !== -1) {
      continue;
    }
    tested.push(bagType);
    if (filter === bagType) {
      return true;
    }
    if (canContain(rulesMap, bagType, filter, tested)) {
      return true;
    }
  }

  return false;
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

  const bagsContainingShinyGoldBag = Object.keys(rulesMap).filter(x => canContain(rulesMap, x, 'shiny gold bag'));

  console.log('Final Answer:', bagsContainingShinyGoldBag.length);
};
