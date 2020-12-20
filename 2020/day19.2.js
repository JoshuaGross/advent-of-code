const fs = require('fs');
const assert = require('assert');

function arrayFlatten (a) {
  return a.reduce((acc, x) => Array.isArray(x) ? acc.concat(...arrayFlatten(x)) : acc.concat(x), []);
}

function parseRules (str) {
  return str.split('\n').reduce((map, line) => {
    const [ruleNum_, rules] = line.split(': ').filter(x => !!x);
    const ruleNum = parseInt(ruleNum_, 10);
    map[ruleNum] = rules.split(' ');
    return map;
  }, {});
}

function parseInput (str) {
  const [section1, section2] = str.split('\n\n').filter(x => !!x);
  const parsedSection1 = parseRules(section1);
  const parsedSection2 = section2.split('\n').filter(x => !!x);
  return [parsedSection1, parsedSection2];
}

function ruleMatches (rulesMap, simpleRule, pos, message) {
  if (simpleRule.length === 0) {
    return [true, [pos]];
  }
  if (pos >= message.length) {
    return [false, []];
  }

  const rule = simpleRule[0];

  let newPositions, m;
  if (rule.match(/^[0-9]+$/)) {
    [m, newPositions] = messageMatches(rulesMap, rule, pos, message);
    if (!m) {
      return [false, []];
    }
  } else if (rule[0] === '"') {
    const char = rule[1];
    if (message[pos] !== char) {
      return [false, []];
    }
    newPositions = [pos+1];
  }

  const simpleRuleRest = simpleRule.slice(1);
  const fullyParsedPositions = arrayFlatten(newPositions.map(newPos => ruleMatches(rulesMap, simpleRuleRest, newPos, message)).filter(x => x[0]).map(x => x[1]));
  return [fullyParsedPositions.length > 0, fullyParsedPositions];
}

function messageMatches (rulesMap, key, pos, message) {
  const rule = rulesMap[key];
  const options = rule.reduce((acc, x) => {
    if (x === '|') {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(x);
    }
    return acc;
  }, [[]]);

  let matches = false, positions = [];
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    let [ruleMatches_, newPos] = ruleMatches(rulesMap, option, pos, message);
    if (ruleMatches_) {
      matches = true;
      positions.push(...newPos);
    }
  }

  return [matches, positions];
}

function matchMessages (rulesMap, messages) {
  return messages.filter(message => {
    let [ruleMatches, endPositions] = messageMatches(rulesMap, 0, 0, message);
    return ruleMatches && endPositions.filter(x => x === message.length).length > 0;
  });
}

module.exports = function runner(inputFile, verbose) {
  let [rules, messages] = parseInput(fs.readFileSync(inputFile, 'utf8'));
  let matchingMessages = matchMessages(rules, messages);

  const solution = matchingMessages.length;

  assert.equal(solution, 274);
  console.log('Final Answer:', solution);
}
