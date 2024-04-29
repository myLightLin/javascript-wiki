/**
 * 节流函数
 * @param {Function} func 需要节流的函数
 * @param {number} wait 等待时长
 * @param {object} options
 * @param {boolean} [options.leading]
 * @param {boolean} [options.trailing]
 * @returns
 */
function throttle(func, wait, options = { leading: true, trailing: false }) {
  let timeout
  let context
  let args
  let previous = 0

  const later = function () {
    previous = options.leading ? new Date().getTime() : 0
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  const throttled = function () {
    const now = new Date().getTime()
    if (!previous && !options.leading) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}

export function throttle2(func, wait) {
  let previous = 0
  let timeout

  const throttled = function () {
    let context = this
    let args = arguments
    const now = +new Date()
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        previous = +new Date()
        func.apply(context, args)
      }, remaining)
    }
  }

  throttle.cancel = function () {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}

// 定时器
export function throttle3(fn, wait) {
  let timeout
  return function () {
    const ctx = this
    const args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(ctx, args)
      }, wait)
    }
  }
}

// 时间戳
export function throttle4(fn, wait) {
  let previous = 0
  return function throttle4() {
    const ctx = this
    const args = arguments
    const now = +new Date()
    if (now - previous > wait) {
      fn.apply(ctx, args)
      previous = now
    }
  }
}
