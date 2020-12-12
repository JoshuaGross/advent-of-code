function rotateEastNorthDegrees (e, n, dir, deg) {
  switch (dir) {
    case 'R': {
      if (deg === 90) {
        return [n, -e];
      } else if (deg === 180) {
        return [-e, -n];
      } else if (deg === 270) {
        return [-n, e];
      } else {
        throw new Error(`Invalid deg: ${deg}`);
      }
    }
    case 'L': {
      if (deg === 90) {
        return [-n, e];
      } else if (deg === 180) {
        return [-e, -n];
      } else if (deg === 270) {
        return [n, -e];
      } else {
        throw new Error(`Invalid deg: ${deg}`);
      }
    }
    default: throw new Error(`Invalid dir: ${dir}`);
  }
}

module.exports = function rotateWestNorthDegrees (w, n, dir, deg) {
  let [e_, n_] = rotateEastNorthDegrees(-w, n, dir, deg);
  return [-e_, n_];
};
