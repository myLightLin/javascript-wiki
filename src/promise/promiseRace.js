/**
 * 模拟实现 Promise.race
 * @param {Array} promises
 * @returns {Promise<any>}
 */
export default function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (value) => resolve(value),
        (err) => reject(err),
      )
    }
  })
}
