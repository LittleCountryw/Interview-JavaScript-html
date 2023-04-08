//快排+打乱数组
function quickSort(nums) {
  shuffle(nums)
  sort(nums, 0, nums.length - 1)
  return nums
}
function sort(nums, left, right) {
  if (left >= right) return //不用排
  let p = partition(nums, left, right)
  sort(nums, left, p - 1)
  sort(nums, p + 1, right)
}
function partition(nums, left, right) {
  let pivot = nums[right]
  let i = left
  let j = left
  while (j < right) {
    if (nums[j] < pivot) {
      //遇见小的就换到前面 保证前面的都是小的
      swap(nums, i, j)
      i++
    }
    j++
  }
  swap(nums, i, right)
  return i
}
function shuffle(nums) {
  for (let i = 0; i < nums.length; i++) {
    let random = randOne(i, nums.length - 1)
    swap(nums, i, random)
  }
}
function randOne(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function swap(nums, m, n) {
  let temp = nums[m]
  nums[m] = nums[n]
  nums[n] = temp
}
