// 接雨水问题
function trap(height: number[]): number {
  let n = height.length
  let ans = 0
  let lMax = new Array(n)
  let rMax = new Array(n)
  lMax[0] = height[0]
  rMax[n-1] = height[n-1]
  for (let i = 1; i < n; i++) {
    lMax[i] = Math.max(lMax[i-1], height[i])
  }
  for (let i = n - 2; i >= 0; i--) {
    rMax[i] = Math.max(rMax[i+1], height[i])
  }
  for (let i = 1; i < n - 1; i++) {
		ans += Math.min(lMax[i], rMax[i]) - height[i]
  }
  return ans
}

// 双指针法
function trap2(height: number[]): number {
  let n = height.length
  let ans = 0
  let left = 0
  let right = n - 1
  let lMax = height[0]
  let rMax = height[n-1]
  while (left <= right) {
    lMax = Math.max(lMax, height[left])
    rMax = Math.max(rMax, height[right])
    if (lMax < rMax) {
    	ans += lMax - height[left]
      left++
    } else {
      ans += rMax - height[right]
      right--
    }
  }
  return ans
}

// test
// let arr = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
// console.log(trap(arr))
// console.log(trap2(arr))
