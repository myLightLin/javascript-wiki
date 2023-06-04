// 三数之和
var threeSum = function(nums: number[]): number[][] {
  const n = nums.length
  const res = []
  if (n < 3) return []
  nums.sort((a, b) => a - b)
  for (let i = 0; i < n; i++) {
		if (nums[i] > 0) return res
    
    if (i > 0 && nums[i] === nums[i-1]) continue
    
    let left = i + 1
    let right = n - 1
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] === 0) {
        res.push([nums[i], nums[left], nums[right]])
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        while (left < right && nums[right] === nums[right-1]) {
          right--
        }
        left++
        right--
      } else if (nums[i] + nums[left] + nums[right] > 0) {
        right--
      } else {
        left++
      }
    }
  }
  return res
}

/**
 * test
 * let arr = [-1, 0, 1, 2, -1, -4]
 * console.log(threeSum(arr))
 */