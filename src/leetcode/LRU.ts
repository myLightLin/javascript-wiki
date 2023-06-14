/**
 * {@link https://leetcode.cn/problems/lru-cache/description/}
 * 请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
 * 实现 LRUCache 类：
 * LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 */
class VNode {
  key: number
  val: number
  next: VNode | null
  prev: VNode | null
  constructor(key: number, val: number) {
    this.key = key
    this.val = val
    this.next = null
    this.prev = null
  }
}

class DoubleList {
  private head: VNode
  private tail: VNode
  private size: number

  constructor() {
    this.head = new VNode(0, 0)
    this.tail = new VNode(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }

  addLast(x: VNode) {
    x.prev = this.tail.prev
    x.next = this.tail
    this.tail.prev!.next = x
    this.tail.prev = x
    this.size++
  }

  remove(x: VNode) {
    x.prev!.next = x.next
    x.next!.prev = x.prev
    this.size--
  }

  removeFirst(): VNode | null {
    if (this.head.next === this.tail) {
      return null
    }
    const first = this.head.next
    this.remove(first!)
    return first
  }

  getSize() {
    return this.size
  }
}

class LRUCache {
  private map: Map<number, VNode>
  private cache: DoubleList
  private cap: number

  constructor(capacity: number) {
    this.cap = capacity
    this.map = new Map()
    this.cache = new DoubleList()
  }

  get(key: number): number {
    if (!this.map.has(key)) {
      return -1
    }
    this.makeRecently(key)
    return this.map.get(key)!.val
  }

  put(key: number, val: number): void {
    if (this.map.has(key)) {
      this.deleteKey(key)
      this.addRecently(key, val)
      return
    }

    if (this.cap === this.cache.getSize()) {
      this.removeLeastRecently()
    }

    this.addRecently(key, val)
  }

  // 将某个 key 提升为最近使用的
  private makeRecently(key: number) {
    const x = this.map.get(key)
    this.cache.remove(x!)
    this.cache.addLast(x!)
  }
  // 添加最近使用的元素
  private addRecently(key: number, val: number) {
    const x = new VNode(key, val)
    this.cache.addLast(x)
    this.map.set(key, x)
  }

  private deleteKey(key: number) {
    const x = this.map.get(key)
    this.cache.remove(x!)
    this.map.delete(key)
  }

  private removeLeastRecently() {
    const deleteNode = this.cache.removeFirst()
    const deleteKey = deleteNode!.key
    this.map.delete(deleteKey)
  }
}
