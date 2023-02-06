// 实现 promise.race
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((value) => {
        return resolve(value)
      }, err => reject(err))
    }
  })
}