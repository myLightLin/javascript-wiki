/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
// 模拟实现 call 方法
Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== 'function')
    throw new TypeError('it must be invoke by function')

  if (thisArg == undefined) {
    // eslint-disable-next-line no-undef
    thisArg = window
  } else {
    thisArg = Object(thisArg) // 包装成对象
  }

  const func = Symbol('func') // 创建一个不重复的属性常量
  thisArg[func] = this

  const res = thisArg[func](...args)

  delete thisArg[func]
  return res
}
