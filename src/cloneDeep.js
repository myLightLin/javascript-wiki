// 实现一个深拷贝
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function getInstance(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneDeep(target, map = new WeakMap()) {
  // 原始类型直接返回
  if (!isObject(target)) {
    return target
  }

  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInstance(target)
  }

  // 处理循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 处理 Set
  if (type === setTag) {
    target.forEach(val => {
      cloneTarget.add(cloneDeep(val, map))
    })
    return cloneTarget
  }

  // 处理 Map
  if (type === mapTag) {
    target.forEach((val, key) => {
      cloneTarget.set(key, cloneDeep(val, map))
    })
    return cloneTarget
  }

  // 处理 Array 和 Object
  for (const key in target) {
    cloneTarget[key] = cloneDeep(target[key], map)
  }

  return cloneTarget
}

export default cloneDeep

export function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = clone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}