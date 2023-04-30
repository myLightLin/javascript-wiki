/**
 * {@link https://leetcode.cn/problems/convert-object-to-json-string LeetCode}
 * 现给定一个对象，返回该对象的有效 JSON 字符串。
 * 你可以假设这个对象只包括字符串、整数、数组、对象、布尔值和 null。
 * 返回的字符串不能包含额外的空格。键的返回顺序应该与 Object.keys() 的顺序相同。
 * 请你在不使用内置方法 JSON.stringify 的前提下解决这个问题。
 */
function jsonStringify(object: any): string {
  if (typeof object === 'string') {
    return `"${object}"`
  }

  if (typeof object === 'object' && object !== null) {
    if (Array.isArray(object)) {
      return `[${object.map(ite => jsonStringify(ite)).join(',')}]`
    } else {
      return `{${Object.entries(object).map(([key, val]) => {
        return `"${key}":${jsonStringify(val)}`
      }).join(',')}}`
    }
  }
  return String(object)
};

/**
 * example
 * input: object = {"y":1,"x":2}
 * output '{"y":1,"x":2}'
 */