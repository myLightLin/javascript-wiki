// 实现一个深拷贝
function cloneDeep(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = cloneDeep(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}