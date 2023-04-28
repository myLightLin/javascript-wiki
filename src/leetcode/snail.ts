declare global {
  interface Array<T> {
    snail(rowsCount: number, colsCount: number): number[][];
  }
}
/**
 * 请你编写一段代码为所有数组实现 snail(rowsCount，colsCount) 方法
 * 该方法将 1D 数组转换为以蜗牛排序的模式的 2D 数组。无效的输入值应该输出一个空数组。
 * 当 rowsCount * colsCount !==arr.length 时。这个输入被认为是无效的。
 * 蜗牛排序从左上角的单元格开始，从当前数组的第一个值开始。然后，它从上到下遍历第一列，接着移动到右边的下一列，
 * 并从下到上遍历它。将这种模式持续下去，每列交替变换遍历方向，直到覆盖整个数组。
 */
Array.prototype.snail = function(rowsCount: number, colsCount: number): number[][] {
  if (!this.length) return []
  if (rowsCount * colsCount !== this.length) return []

  let matrix = new Array(rowsCount)
  for (let i = 0; i < rowsCount; i++) {
    matrix[i] = new Array(colsCount).fill(0)
  }
  let index = 0
  for (let j = 0; j < colsCount; j++) {
    const reverse = j % 2 !== 0
    for (let i = reverse ? rowsCount - 1 : 0; reverse ? i >= 0: i < rowsCount; reverse ? i-- : i++) {
      matrix[i][j] = this[index++]
    }
  }
  return matrix
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */

export {}