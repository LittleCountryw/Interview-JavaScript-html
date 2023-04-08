//leetcode 215
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  let heapSize = nums.length
  buildMaxHeap(nums)
  for (let i = 2; i <= k; i++) {
    heapSize--
    swap(nums, 0, heapSize)
    //从头开始构建
    maxHeapify(nums, 0, heapSize)
  }
  return nums[0]
}

function buildMaxHeap(nums) {
  //从第一个非叶子节点开始构建最大堆
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    maxHeapify(nums, i, nums.length)
  }
}

function maxHeapify(nums, i, heapSize) {
  let largest = i
  let left = i * 2 + 1
  let right = i * 2 + 2
  if (left < heapSize && nums[left] > nums[largest]) {
    largest = left
  }
  if (right < heapSize && nums[right] > nums[largest]) {
    largest = right
  }
  if (largest !== i) {
    swap(nums, i, largest)
    maxHeapify(nums, largest, heapSize)
  }
}
function swap(nums, i, j) {
  let temp = nums[i]
  nums[i] = nums[j]
  nums[j] = temp
}
