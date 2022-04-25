// 回想发现当使用reduce的时候,总是会用到[]作为initialValue
Array.prototype.myMap = function (fn, thisArg) {
  thisArg = undefined || null ? window : Object(thisArg)
  // 先获取到arr
  let arr = [...this]
  return arr.reduce((pre, cur, index) => {
    const res = fn.call(thisArg, cur, index)
    return pre.concat(res)
  }, [])
}

Array.myMap((item) => (item += 2))
function test(item, index) {
  console.log(index)
  return item + 2
}
console.log([1, 2, 3].myMap(test, '123'))

// [1,2,3].map(item=>item+=2)
