// 模拟迭代器实现
const arr = [1, 2, 3, 4]
arr[Symbol.iterator] = function () {
  const target = this
  const len = target.length
  let index = 0

  return {
    next() {
      return {
        value: index < len ? target[index] : undefined,
        done: index++ >= len,
      }
    },
  }
}
