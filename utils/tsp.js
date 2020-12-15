const permutation = require('./permutation');

function inputToDistMap(input, bidi) {
  return input.reduce((acc, [c1, c2, dist]) => {
    acc[c1] = acc[c1] || {};
    acc[c1][c2] = dist;
    if (bidi) {
      acc[c2] = acc[c2] || {};
      acc[c2][c1] = dist;
    }
    return acc;
  }, {});
}

function computeTotalDistance (distMap, path, bidi, cyclic) {
  let prev = (cyclic ? path[path.length - 1] : path[0]);
  let dist = 0;
  for (let i = (cyclic ? 0 : 1); i < path.length; i++) {
    dist += distMap[prev][path[i]];
    if (!bidi) {
      dist += distMap[path[i]][prev];
    }
    prev = path[i];
  }
  return dist;
}

function lt (a, b) {
  return a < b;
}

module.exports = function tsp (distances, defaultDist = Number.MAX_SAFE_INTEGER, cmp = lt, bidi = true, cyclic = false) {
  const distMap = inputToDistMap(distances, bidi);
  const cities = Object.keys(distMap);

  let prevDist = defaultDist;
  let answer;
  // console.log(distMap);
  for (const p of permutation(cities)) {
    const dist = computeTotalDistance(distMap, p, bidi, cyclic);
    // console.log(dist, p);
    if (cmp(dist, prevDist)) {
      prevDist = dist;
      answer = p;
    }
  }

  return [prevDist, answer];
};
