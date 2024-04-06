// 最长公共前缀 LCP
const longestCommonPrefix = function (strs: string[]) {
  if (strs === null || strs.length === 0) return ""
  return lCPrefixRec(strs)
};

// 若分裂后的两个数组长度不为 1，则继续分裂
// 直到分裂后的数组长度都为 1，
// 然后比较获取最长公共前缀
function lCPrefixRec(arr: string[]): string {
  let length = arr.length
  if (length === 1) {
    return arr[0]
  }
  let mid = Math.floor(length / 2),
    left = arr.slice(0, mid),
    right = arr.slice(mid, length)
  return lCPrefixTwo(lCPrefixRec(left), lCPrefixRec(right))
}

// 求 str1 与 str2 的最长公共前缀
function lCPrefixTwo(str1: string, str2: string): string {
  let j = 0
  for (; j < str1.length && j < str2.length; j++) {
    if (str1.charAt(j) !== str2.charAt(j)) {
      break
    }
  }
  return str1.substring(0, j)
}

function longestCommonPrefixIterate(strs: string[]): string {
  if (strs === null || strs.length === 0) return ""
  let prefix = strs[0]
  for (let i = 1; i < strs.length; i++) {
    prefix = lCPrefixTwo(prefix, strs[i])
    if (prefix.length === 0) break
  }
  return prefix
}
