var sortArray = function (nums) {
  // 外层每趟循环，找出一个最大的数
  for (let i = 0; i < nums.length; i++) {
    // 判断每次是否需要交换
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        // ES6 交换两个变量
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}
console.log(sortArray([5, 7, 1, 2, 6, 9, 10]))
// 时间复杂度O(n^2)
// 快排时间复杂度O(nlogn)
