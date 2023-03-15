/**
 * 实现节流
 * 思路：时间戳 + 定时器
 */
function throttle(func, wait, options = {leading: true, trailing: false}) {
  let timeout, context, args
  let previous = 0

  let later = function() {
    previous = options.leading ? new Date().getTime() : 0
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled = function() {
    let now = new Date().getTime()
    if (!previous && !options.leading) previous = now
    let remaining = wait - (now - previous)
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

  throttled.cancel = function() {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }

  return throttled
}

// 定时器
function throttle(fn, wait) {
  let timeout, args, context
  return function() {
    args = arguments
    context = this
    if (!timeout) { 
      timeout = setTimeout(function() {
        timeout = null
        fn.apply(context, args)
      }, wait)
    }
  }
}

// 时间戳
function throttle(fn, wait) {
  let previous = 0
  let args, context
  return function() {
    args = arguments
    context = this
    const now = +new Date()
    if (now - previous > wait) {
      fn.apply(context, args)
      previous = now
    }
  }
}
