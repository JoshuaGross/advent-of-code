module.exports = function product (...num) {
  return num.reduce((acc, n) => acc * n, 1);
}
