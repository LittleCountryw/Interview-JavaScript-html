// 记住要return！！
function currying(fn) {
  const curried = function (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...args2) {
      const argAll = args.concat(args2)
      return curried.apply(this, argAll)
    }
  }
  return curried
}
// currying(1)(2)(3)
