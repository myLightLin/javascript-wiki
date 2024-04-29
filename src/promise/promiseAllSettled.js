/* eslint-disable no-promise-executor-return */
/* eslint-disable consistent-return */
/* eslint-disable no-loop-func */
/**
 * 模拟实现 Promise.allSettled
 * @param {Array} promises
 * @returns {Promise<any>}
 */
export default function promiseAllSettled(promises) {
  // eslint-disable-next-line no-use-before-define
  const args = toArr(promises)
  const res = []
  let settledCount = 0

  return new Promise((resolve) => {
    if (args.length === 0) return resolve([])
    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i]).then(
        (value) => {
          settledCount++
          res[i] = { status: 'fulfilled', value }
          if (settledCount === args.length) {
            return resolve(res)
          }
        },
        (reason) => {
          settledCount++
          res[i] = { status: 'rejected', reason }
          if (settledCount === args.length) {
            return resolve(res)
          }
        },
      )
    }
    return null
  })
}

function isArrayLike(obj) {
  return obj && typeof obj === 'object' && 'length' in obj
}

function toArr(arr) {
  if (!arr) return []

  if (Array.isArray(arr)) return arr

  if (isArrayLike(arr)) return Array.from(arr)

  return [arr]
}
