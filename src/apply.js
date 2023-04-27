// 模拟实现 apply 方法
Function.prototype.myApply = function(thisArg, arr) {
  if (typeof this !== 'function')  throw new TypeError('it must be invoke by function')

  if (thisArg == undefined) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)   // 包装成对象
  }

  // 判断是否类数组对象
  function isArrayLike(obj) {
    return obj && typeof obj === 'object' && 'length' in obj
  }

  const func = Symbol('func')  // 创建一个不重复的属性常量
  thisArg[func] = this

  let result
  if (arr) {
    if (!Array.isArray(arr) && !isArrayLike(arr)) {
      throw new Error('the second  params must be array or array-like')
    } else {
      const args = Array.from(arr)
      result = thisArg[func](...args)
    }
  } else {
    result = thisArg[func]()
  }
  
  delete thisArg[func]
  
  return result
}