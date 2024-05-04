/**
 * 洗牌算法
 * @param {Array} arr 待洗牌数组
 */
export default function shuffle(arr) {
  const copy = arr.slice()
  // 从最后一个元素开始，依次与前面的元素交换位置
  for (let i = copy.length - 1; i > 0; i--) {
    const randomIndex = getRandomInt(i)
    swap(copy, i, randomIndex)
  }
  return copy
}

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}
