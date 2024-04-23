// 模拟实现 promise.finally
// eslint-disable-next-line no-extend-native
Promise.prototype.finally =
  Promise.prototype.finally ||
  function promiseFinally(callback) {
    const P = this.constructor;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (reason) =>
        P.resolve(callback()).then(() => {
          throw reason;
        }),
    );
  };
