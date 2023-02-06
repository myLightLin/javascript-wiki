// 模拟实现 Promise.all
function promiseAll(promises) {
  let count = 0
  let res = []
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((value) => {
        count++
        res[i] = value
        if (count === promises.length) {
          return resolve(res)
        } 
      }, (err) => reject(err))
    }
  })
}