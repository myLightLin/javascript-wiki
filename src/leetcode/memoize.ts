type Fn = (...params: any) => any
/**
 * {@link https://leetcode.cn/problems/memoize/ LeetCode}
 * 请你编写一个函数，它接收另一个函数作为输入，并返回该函数的 记忆化 后的结果。
 * 记忆函数 是一个对于相同的输入永远不会被调用两次的函数。相反，它将返回一个缓存值。
 * 可以假设有 3 个可能的输入函数：sum 、fib 和 factorial 。
 * sum 接收两个整型参数 a 和 b ，并返回 a + b 。
 * fib 接收一个整型参数 n ，如果 n <= 1 则返回 1，否则返回 fib (n - 1) + fib (n - 2)。
 * factorial 接收一个整型参数 n ，如果 n <= 1 则返回  1 ，否则返回 factorial(n - 1) * n 。
 */
function memoize(fn: Fn): Fn {
  const map = new Map<string, any>()
  return function(this: any, ...args: any[]) {
    const key = args.join(',')
    const item = map.get(key)
    if (item !== undefined) return item
    const result = fn.apply(this, args)
    map.set(key, result)
    return result
  }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */