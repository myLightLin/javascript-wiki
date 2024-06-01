/* eslint-disable prefer-rest-params */
/**
 * new 的实现
 * 1. 创建一个空对象
 * 2. 将空对象的原型指向构造函数的原型
 * 3. 将构造函数的 this 指向这个空对象并执行构造函数
 * 4. 如果 3 的结果是对象，则返回这个对象，否则返回 1 中创建的对象
 */
export default function mockNew() {
  const obj = {}
  const constructor = Array.prototype.shift.call(arguments)
  // eslint-disable-next-line no-proto
  obj.__proto__ = constructor.prototype
  const ret = constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
