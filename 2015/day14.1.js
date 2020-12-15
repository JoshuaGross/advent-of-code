const fs = require('fs');
const assert = require('assert');

function parseInput (str) {
  return str.split('\n').filter(x => !!x).map(line => {
    const match = line.match(/^([A-Za-z]+) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\.$/);
    return [match[1]].concat([match[2], match[3], match[4]].map(x => parseInt(x, 10)));
  });
}

module.exports = function runner(inputFile, verbose) {
  const input = parseInput(fs.readFileSync(inputFile, 'utf8'));
  const timeLimit = 2503;
  // const timeLimit = 1000;

  let maxTraveled = 0, maxTraveledReindeer = null, state = new Map();
  for (const [reindeer, speed, flyTime, restTime] of input) {
    state.set(reindeer, { name: reindeer, flying: true, countdown: flyTime, position: 0, points: 0 });
  }
  for (let i = 0; i <= timeLimit; i++) {
    for (const [reindeer, speed, flyTime, restTime] of input) {
      const s = state.get(reindeer);
      if (s.countdown === 0) {
        s.flying = !s.flying;
        s.countdown = s.flying ? flyTime : restTime;
      }
      s.countdown--;
      if (s.flying) {
        s.position += speed;
      }

      if (s.position > maxTraveled) {
        maxTraveled = s.position;
        maxTraveledReindeer = s;
      }
    }
  }

  const solution = maxTraveled;
  assert.equal(solution, 2640);
  console.log('Final Answer:', solution, '-', maxTraveledReindeer);
}
