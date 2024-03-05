/**
 * 模拟实现 instanceof
 * @param {any} leftValue
 * @param {any} rightValue
 * @returns
 */
export function mockInstanceof(leftValue, rightValue) {
  const rightProto = rightValue.prototype
  leftValue = leftValue.__proto__
  while (true) {
    if (leftValue === null) return false

    if (leftValue === rightProto) return true

    leftValue = leftValue.__proto__
  }
}
