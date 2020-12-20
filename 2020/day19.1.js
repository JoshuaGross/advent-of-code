const fs = require('fs');
const assert = require('assert');

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
  for (let i = 0; i < simpleRule.length && pos < message.length; i++) {
    const rule = simpleRule[i];
    // console.log(i, rule);
    if (rule.match(/^[0-9]+$/)) {
      let [m, newPos] = messageMatches(rulesMap, rule, pos, message);
      if (!m) {
        return [false, -1];
      }
      pos = newPos;
    } else if (rule[0] === '"') {
      const char = rule[1];
      if (message[pos] !== char) {
        return [false, -1];
      }
      pos++;
    }
  }
  return [true, pos];
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

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    // console.log(option, i);
    let [ruleMatches_, newPos] = ruleMatches(rulesMap, option, pos, message);
    if (ruleMatches_) {
      return [ruleMatches_, newPos];
    }
  }

  return [false, -1];
}

function matchMessages (rulesMap, messages) {
  return messages.filter(message => {
    let [ruleMatches, pos] = messageMatches(rulesMap, 0, 0, message);
    return ruleMatches && pos === message.length;
  });
}

module.exports = function runner(inputFile, verbose) {
  let [rules, messages] = parseInput(fs.readFileSync(inputFile, 'utf8'));
  let matchingMessages = matchMessages(rules, messages);
  console.log(matchingMessages.length, messages.length);

  const solution = 0;

  assert.equal(solution, 0);
  console.log('Final Answer:', solution);
}
