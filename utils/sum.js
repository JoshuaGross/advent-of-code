module.exports = function sum (...args) {
  return args.reduce((acc, num) => acc + num, 0);
}
