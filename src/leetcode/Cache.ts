/**
 * {@link https://leetcode.cn/problems/cache-with-time-limit/ LeetCode}
 * 编写一个类，它允许获取和设置键-值对，并且每个键都有一个 过期时间 。
 * 该类有三个公共方法：
 * set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 。
 * 一旦 duration 到期后，这个键就无法访问。如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 。
 * 如果该键已经存在，则它的值和持续时间都应该被覆盖。
 * get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。
 * count() ：返回未过期键的总数。
 */
class TimeLimitedCache {
  private cache: Map<number, [number, number]>
  constructor() {
    this.cache = new Map()
  }

  set(key: number, value: number, duration: number): boolean {
    const now = Date.now()
    const item = this.cache.get(key)
    if (item) {
      item[0] = now + duration
      item[1] = value
      return true
    } else {
      this.cache.set(key, [now + duration, value])
      return false
    }
  }

  get(key: number): number {
    const now = Date.now()
    const item = this.cache.get(key)
    if (!item || now > item[0]) return -1
    return item[1]
  }

  count(): number {
    const now = Date.now()
    let res = 0
    for (const [key, item] of this.cache.entries()) {
      if (now > item[0]) {
        this.cache.delete(key)
      } else {
        res++
      }
    }
    return res
  }
}

/**
* Your TimeLimitedCache object will be instantiated and called as such:
* var obj = new TimeLimitedCache()
* obj.set(1, 42, 1000); // false
* obj.get(1) // 42
* obj.count() // 1
*/
