/* eslint-disable import/prefer-default-export */
// 函数式编程
// 实现 compose 函数
// function compose(func1, func2)

function compose() {
  // eslint-disable-next-line prefer-rest-params
  const args = Array.prototype.slice.call(arguments)
  return function composed(x) {
    return args.reduceRight((res, cb) => cb(res), x)
  }
}

// ES6 写法
export const composeFn =
  (...args) =>
  (x) =>
    args.reduceRight((res, cb) => cb(res), x)

/**
 * Test
 * var add, multiply
 * compose(add, multiply)
 */

const add = (x) => x + 1
const multiply = (x) => x * 10

const calculate = compose(multiply, add)
const val = calculate(10)
console.log(val) // 110
