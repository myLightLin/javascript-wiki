// 函数式编程
// 实现 pipe 函数

function pipe() {
  const args = Array.prototype.slice.call(arguments)
  return function(x) {
    return args.reduce((res, cb) => cb(res), x)
  }
}

// ES6 写法
const pipe = (...args) => x => args.reduce((res, cb) => cb(res), x)

/**
 * Test
 * var add, multiply
 * pipe(add, multiply)
 */

const add = (x) => x + 1
const multiply = (x) => x * 10

const calculate = pipe(add, multiply)
const val = calculate(10)
console.log(val)  // 110