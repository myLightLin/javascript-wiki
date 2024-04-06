// 模拟实现数组的 reduce 方法
const orignalReduce = Array.prorotype.reduce
Array.prototype.reduce = orignalReduce || function(cb, initValue) {
  const array = this
  const startIndex = initValue !== undefined ? 0 : 1
  // eslint-disable-next-line
  let pre = initValue ?? array[0]
  for (let i = startIndex; i < array.length; i++) {
    const curr = array[i]
    pre = cb(pre, curr, i, array)
  }
  return pre
}