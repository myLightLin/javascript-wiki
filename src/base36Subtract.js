/**
 * 36 进制减法
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
export function base36Subtract(a, b) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  const maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')

  let borrow = 0
  let res = ''
  for (let i = maxLen - 1; i >= 0; i--) {
    let diff = chars.indexOf(a[i]) - chars.indexOf(b[i]) - borrow
    if (diff < 0) {
      diff += 36
      borrow = 1
    } else {
      borrow = 0
    }
    res = chars[diff] + res
  }

  // 去掉前导 0
  return res.replace(/^0+/, '') || '0'
}
