// 二分查找的arr是有序的
// 记住！是+不是-！！！
// <=
function binarySearch(arr, target) {
  const len = arr.length
  if (len === 0) return -1
  let left = 0
  let right = len - 1

  while (left <= right) {
    middle = Math.floor((right + left) / 2)
    const middleValue = arr[middle]
    if (middleValue < target) {
      left = middle + 1
    } else if (middleValue > target) {
      right = middle - 1
    } else {
      return middle
    }
  }
  return -1
}
console.log(binarySearch([1, 3, 5, 9, 20, 25, 60], 0))
