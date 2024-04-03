/**
 * 36 进制加法
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
export function base36Add(a, b) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  const maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')

  let carry = 0
  let res = ''
  for (let i = maxLen - 1; i >= 0; i--) {
    const sum = chars.indexOf(a[i]) + chars.indexOf(b[i]) + carry
    carry = Math.floor(sum / 36)
    res = chars[sum % 36] + res
  }

  if (carry) {
    res = chars[carry] + res
  }

  return res
}
