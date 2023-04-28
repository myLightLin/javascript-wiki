type MultiDimensionalArray = (number | MultiDimensionalArray)[];
/**
 * 请你编写一个函数，它接收一个多维数组 arr 和它的深度 n ，并返回该数组的 扁平化 后的结果。
 * 多维数组是一种包含整数或其他多维数组的递归数据结构。
 * 数组扁平化是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。
 * 只有当嵌套的数组深度大于 n 时，才应该执行扁平化操作。第一层数组中元素的深度被认为是 0。
 * 请在没有使用内置方法 Array.flat 的前提下解决这个问题。
 */
var flat = function (arr:  MultiDimensionalArray, n: number):  MultiDimensionalArray {
  if (n < 1) return arr.slice()
  const result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      const flattenedItem = flat(item, n - 1)
      result.push(...flattenedItem)
    } else {
      result.push(item)
    }
  }
  return result
};

/**
 * example
 * 输入 arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]] n = 1
 * 输出 [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
 */

// 迭代解法
var flatWithIteration = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  let copiedArr = [...arr]
  let depth = 0
  while (depth < n) {
    let hasNestedArray = false
    const temp = []

    for (const item of copiedArr) {
      if (Array.isArray(item)) {
        hasNestedArray = true
        temp.push(...item)
      } else {
        temp.push(item)
      }
    }

    copiedArr = temp
    if (!hasNestedArray) break
    depth++
  }

  return copiedArr
}
