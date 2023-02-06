/**
 * 实现节流
 * 思路：时间戳 + 定时器
 */
function throttle(fn, wait) {
  let timeout, args, context
  let previous = 0 
  return function() {
    args = arguments
    context = this
    const now = +new Date()
    const remaining = wait - (now - previous)
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        previous = +new Date()
        fn.apply(context, args)
      }, remaining)
    }
  }
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

