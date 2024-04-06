/**
 * 实现一个 EventEmiiter 类
 * {@link https://github.com/myLightLin/javascript-wiki/issues/45 Github}
 */
export class EventEmitter {
  constructor() {
    this.events = {}
  }

  emit(type, ...args) {
    this.events[type].forEach((fn) => {
      fn(...args)
    })
    return true
  }

  on(type, handler) {
    this.events[type] = this.events[type] || []
    this.events[type].push(handler)
    return this
  }

  off(type, handler) {
    const lis = this.events[type]
    if (!lis) return this
    for (let i = lis.length - 1; i >= 0; i--) {
      if (lis[i] === handler) {
        lis.splice(i, 1)
        break
      }
    }
    return this
  }

  once(type, handler) {
    this.events[type] = this.events[type] || []
    const onceWrapper = () => {
      handler()
      this.off(type, onceWrapper)
    }
    this.events[type].push(onceWrapper)
    return this
  }
}
