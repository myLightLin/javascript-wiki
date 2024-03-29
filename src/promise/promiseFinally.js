// 模拟实现 promise.finally
Promise.prototype.finally = Promise.prototype.finally || function(callback) {
  const P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) => P.resolve(callback()).then(() => {throw reason})
  )
}
