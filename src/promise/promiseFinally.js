/**
 * 模拟实现 Promise.prototype.finally
 * @param {Function} callback
 * @returns {Promise<any>}
 */
export default function promiseFinally(callback) {
  const P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      }),
  )
}
