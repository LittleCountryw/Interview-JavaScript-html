// 重点:将initialValue化为数组,防止initialValue为0的情况
Array.prototype.myReduce = function (fn, ...initialValue) {
  if (!this.length) return
  let start = 0
  let pre
  if (initialValue.length) {
    pre = initialValue[0]
  } else {
    pre = this[0]
    start = 1
  }
  for (let i = start; i < this.length; i++) {
    pre = fn(pre, this[i], i, this)
  }
  return pre
}

console.log(
  [1, 2, 3].myReduce((pre, cur) => {
    return pre + cur
  }, 2)
)
