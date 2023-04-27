/**
 * 模拟实现 Promise.all
 * @param {Array} promises 
 * @returns {Promise<any>}
 */
function promiseAll(promises) {
  const args = toArr(promises)
  let count = 0
  let res = []
  return new Promise((resolve, reject) => {
    if (args.length === 0) return resolve([])
    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i]).then((value) => {
        count++
        res[i] = value
        if (count === args.length) {
          return resolve(res)
        } 
      }, (err) => reject(err))
    }
  })
}

function toArr(arr) {
  if (!arr) return []

  if (Array.isArray(arr)) return arr

  if (isArrayLike(arr)) return Array.from(arr)

  return [arr]
}

function isArrayLike(obj) {
  return obj && typeof obj === 'object' && 'length' in obj
}