function compose(...fns) {
  // 边界判断:判断fn是否都是函数
  return function (...args) {
    // 当fns为空时
    let result = fns.length ? fns[0].apply(this, args) : args
    for (let i = 1; i < fns.length; i++) {
      result = fns[i].apply(this, [result])
    }
    return result
  }
}
function double(num) {
  return num * 2
}
function square(num) {
  return num ** 2
}

let newFn = compose(double, square)
console.log(newFn(2))
