/* eslint-disable no-extend-native */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */
// 模拟实现 bind
Function.prototype.myBind = function (thisArg) {
  if (typeof this !== 'function') {
    throw new TypeError('it must be invoke by function')
  }

  if (thisArg == undefined) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }

  const thisFn = this
  const args = Array.prototype.slice.call(arguments, 1)

  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments)
    const isNew = this instanceof fBound
    return thisFn.apply(isNew ? this : thisArg, args.concat(bindArgs))
  }

  // 绑定返回函数的原型
  const fNOP = function () {}
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()

  return fBound
}
