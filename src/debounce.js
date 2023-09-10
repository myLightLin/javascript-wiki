/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} wait 防抖时长
 * @param {boolean} immediate 是否立即执行
 * @returns {Function}
 */
function debounce(fn, wait, immediate) {
  let timeout, result

  const debounced = function() {
    const self = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(self, args)
    } else {
      timeout = setTimeout(function() {
        fn.apply(self, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}