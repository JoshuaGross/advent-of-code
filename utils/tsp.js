const permutation = require('./permutation');

function inputToDistMap(input) {
  return input.reduce((acc, [c1, c2, dist]) => {
    acc[c1] = acc[c1] || {};
    acc[c1][c2] = dist;
    acc[c2] = acc[c2] || {};
    acc[c2][c1] = dist;
    return acc;
  }, {});
}

function computeTotalDistance (distMap, path) {
  let prev = path[0];
  let dist = 0;
  for (let i = 1; i < path.length; i++) {
    dist += distMap[prev][path[i]];
    prev = path[i];
  }
  return dist;
}

function lt (a, b) {
  return a < b;
}

module.exports = function tsp (distances, defaultDist = Number.MAX_SAFE_INTEGER, cmp = lt) {
  const distMap = inputToDistMap(distances);
  const cities = Object.keys(distMap);

  let prevDist = defaultDist;
  let answer;
  for (const p of permutation(cities)) {
    const dist = computeTotalDistance(distMap, p);
    if (cmp(dist, prevDist)) {
      prevDist = dist;
      answer = p;
    }
  }

  return [prevDist, answer];
};
