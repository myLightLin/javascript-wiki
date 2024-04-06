/* eslint-disable prefer-rest-params */
// 模拟实现 new
export function mockNew() {
  const obj = {}   // 创建空对象
  const constructor = [].shift.call(arguments)  // 获取传入的构造函数
  obj.__proto__ = constructor.prototype   // 设置原型
  const ret = constructor.apply(obj, arguments)  // 执行构造函数
  return typeof ret === 'object' ? ret : obj   // 判断返回结果
}
