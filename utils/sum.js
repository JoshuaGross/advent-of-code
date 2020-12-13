module.exports = function sum (args_, ...rest) {
  const args = Array.isArray(args_) ? args_ : [args_];
  return args.reduce((acc, num) => acc + num, 0) + rest.reduce((acc, num) => acc + num, 0);
}
