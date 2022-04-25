function quickSort(arr) {
  // 基础思想，找到index位于中间的,遍历如果<则放在左边,如果>则放在右边
  // 递归,使用concat联系左边 中间 右边
  // 注意:1.使用splice取出中间值后数组长度改变
  // 2.当len为0时返回[]
  const len = arr.length
  if (len === 0) return []
  const middleIndex = Math.floor(len / 2)
  const middleValue = arr.splice(middleIndex, 1)
  const leftArr = []
  const rightArr = []
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    if (cur < middleValue) {
      leftArr.push(cur)
    } else {
      rightArr.push(cur)
    }
  }
  return quickSort(leftArr).concat(middleValue, quickSort(rightArr))
}
console.log(quickSort([2, 5, 1, 9, 6, 10]))
