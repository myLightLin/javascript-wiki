/**
 * @see {@link https://leetcode.cn/problems/rotting-oranges/?envType=study-plan-v2&envId=top-100-liked LeetCode}
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 * @example 
 * 输入：[[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
const orangesRotting = function(grid: number[][]) {
  const queue: number[][] = []
  const rows = grid.length
  const cols = grid[0].length
  let unrotten = 0
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j])
      } else if (grid[i][j] === 1) {
        unrotten++
      }
    }
  }
  if (unrotten === 0) return 0
  let minutes = 0
  const dx = [0, 1, 0, -1]
  const dy = [1, 0, -1, 0]
  while (queue.length) {
    const size = queue.length
    minutes++
    for (let i = 0; i < size; i++) {
      let cur = queue.shift()
      for (let j = 0; j < 4; j++) {
        let x = cur![0] + dx[j]
        let y = cur![1] + dy[j]
        if (x < 0 || y < 0 || x >= rows || y >= cols || grid[x][y] !== 1) {
          continue
        }
        grid[x][y] = 2
        queue.push([x, y])
        unrotten--
      }
    }
  }
  return unrotten === 0 ? minutes - 1 : -1
}
