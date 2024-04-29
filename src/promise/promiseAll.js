/* eslint-disable consistent-return */
/* eslint-disable no-loop-func */
/**
 * 模拟实现 Promise.all
 * @param {Array} promises
 * @returns {Promise<any>}
 */
export default function promiseAll(promises) {
  // eslint-disable-next-line no-use-before-define
  const args = toArr(promises)
  const res = []
  let count = 0

  return new Promise((resolve, reject) => {
    if (args.length === 0) {
      resolve([])
    }
    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i]).then(
        (value) => {
          count++
          res[i] = value
          if (count === args.length) {
            return resolve(res)
          }
        },
        (err) => reject(err),
      )
    }
  })
}

function toArr(arr) {
  if (!arr) return []

  if (Array.isArray(arr)) return arr

  // eslint-disable-next-line no-use-before-define
  if (isArrayLike(arr)) return Array.from(arr)

  return [arr]
}

function isArrayLike(obj) {
  return obj && typeof obj === 'object' && 'length' in obj
}
