/**
 * @param {number[]} nums
 * @return {number[]}
 */
//归并排序 先排左边 再排右边 merge 时间复杂度O(nlogn)
var sortArray = function (nums) {
  sort(nums, 0, nums.length - 1)
  return nums
}
function sort(nums, left, right) {
  if (left === right) return //一项元素 不需要再排序了
  let mid = Math.floor((left + right) / 2)
  sort(nums, left, mid)
  sort(nums, mid + 1, right)
  merge(nums, left, mid, right)
}
function merge(nums, left, mid, right) {
  let temp = []
  let i = left
  let j = mid + 1
  while (i <= mid && j <= right) {
    if (nums[i] < nums[j]) {
      temp.push(nums[i++])
    } else {
      temp.push(nums[j++])
    }
  }
  while (i <= mid) {
    temp.push(nums[i++])
  }
  while (j <= right) {
    temp.push(nums[j++])
  }
  for (let i = 0; i < temp.length; i++) {
    nums[left + i] = temp[i]
  }
}
