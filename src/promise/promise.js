/* eslint-disable */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
/**
 * {@link https://promisesaplus.com/ Promise}
 * 实现一个符合 Promise A+ 规范的构造器
 */
function Promise(executor) {
  this.state = PENDING
  this.onFulfilledCallback = []
  this.onRejectedCallback = []

  const self = this

  function resolve(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = FULFILLED
        self.data = value
        for (let i = 0; i < self.onFulfilledCallback.length; i++) {
          self.onFulfilledCallback[i](value)
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED
        self.data = reason
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }

  try {
    executor(resolve, reject)
  } catch (reason) {
    reject(reason)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  const self = this

  let promise2

  return (promise2 = new Promise((resolve, reject) => {
    if (self.state === FULFILLED) {
      setTimeout(() => {
        if (typeof onFulfilled === 'function') {
          try {
            const x = onFulfilled(self.data)
            // 运行 promise 处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          resolve(self.data)
        }
      })
    } else if (self.state === REJECTED) {
      setTimeout(() => {
        if (typeof onRejected === 'function') {
          try {
            const x = onRejected(self.data)
            // 运行 promise 处理程序
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(self.data)
        }
      })
    } else if (self.state === PENDING) {
      self.onFulfilledCallback.push((promise1Value) => {
        if (typeof onFulfilled === 'function') {
          try {
            const x = onFulfilled(self.data)
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          resolve(promise1Value)
        }
      })

      self.onRejectedCallback.push((promise1Reason) => {
        if (typeof onRejected === 'function') {
          try {
            const x = onRejected(self.data)
            promiseResolutionProcedure(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(promise1Reason)
        }
      })
    }
  }))
}

function promiseResolutionProcedure(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }

  if (x instanceof Promise) {
    if (x.state === PENDING) {
      x.then((value) => {
        promiseResolutionProcedure(promise2, value, resolve, reject)
      }, reject)
    } else if (x.state === FULFILLED) {
      resolve(x.data)
    } else if (x.state === REJECTED) {
      reject(x.data)
    }
    return
  }

  if (x && (typeof x === 'object' || typeof x === 'function')) {
    let isCalled = false

    try {
      const { then } = x
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (isCalled) return
            isCalled = true
            return promiseResolutionProcedure(promise2, y, resolve, reject)
          },
          (r) => {
            if (isCalled) return
            isCalled = true
            return reject(r)
          },
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (isCalled) return
      isCalled = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

module.exports = Promise
