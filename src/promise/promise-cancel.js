function getPromiseWithCancel(originPromise) {
  let cancel = (v) => {};
  let isCancel = false;
  const cancelPromise = new Promise(function (resolve, reject) {
    cancel = e => {
      isCancel = true;
      reject(e);
    };
  });
  const groupPromise = Promise.race([originPromise, cancelPromise])
  .catch(e => {
    if (isCancel) {
      // 主动取消时，不触发外层的 catch
      return new Promise(() => {});
    } else {
      return Promise.reject(e);
    }
  });
  return Object.assign(groupPromise, { cancel });
}

// 使用如下
const originPromise = axios.get(url);
const promiseWithCancel = getPromiseWithCancel(originPromise);
promiseWithCancel.then((data) => {
  console.log('渲染数据', data);
});
promiseWithCancel.cancel(); // 取消 Promise，将不会再进入 then() 渲染数据