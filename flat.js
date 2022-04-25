// 数组降维
// 1.Array.flat(Infinity)
console.log([[1, 2, [3, 4], 5], 6].flat(Infinity))

// 2.使用reduce 两个return
let arr = [0, [1, 2, [3, 4], 5], 6]
function redFlat(arr) {
  // 返回最终结果
  return arr.reduce((pre, cur) => {
    // 每次pre都要返回
    return pre.concat(Array.isArray(cur) ? redFlat(cur) : cur)
  }, [])
}
console.log(redFlat(arr))

// 3.只使用递归
function toArr(arr) {
  const res = []
  function handle(arr) {
    for (const item of arr) {
      Array.isArray(item) ? handle(item) : res.push(item)
    }
  }
  handle(arr)
  return res
}

console.log(toArr(arr))

// 传参版本flat
function myFlat2(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myFlat2(cur, depth - 1) : cur)
      }, [])
    : arr.slice()
}
