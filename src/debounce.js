/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {number} wait 防抖时长
 * @param {boolean} immediate 是否立即执行
 * @returns {Function}
 */
export default function debounce(fn, wait, immediate) {
  let timeout
  let result

  const debounced = function debounced() {
    const self = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(self, args)
    } else {
      timeout = setTimeout(() => {
        fn.apply(self, args)
      }, wait)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}
