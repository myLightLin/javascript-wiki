/**
 * 实现防抖函数
 */
function debounce(fn, wait, immediate) {
  let timeout, result
  let debounced = function() {
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