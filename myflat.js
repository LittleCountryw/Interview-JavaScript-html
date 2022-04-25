// 数组降维,要指定降维数
// 1.Array.flat(Infinity)
// console.log([[1, 2, [3, 4], 5], 6].flat(Infinity))

// 2.使用reduce 两个return
// 使用 reduce、concat 和递归展开无限多层嵌套的数组
var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice()
}
flatDeep(arr1, Infinity)
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]

// 使用reduce进行数组完全降维
function myflatI(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myflatI(cur) : cur)
  }, [])
}
// let newArr = myflatI(arr)
// console.log(newArr)
// 3.只使用递归
