/**
 * 十进制转换为 36 进制
 * @param {number} num
 * @returns {string}
 */
export function decimalToBase36(num) {
  if (typeof num !== 'number' || Number.isNaN(num)) {
    throw new Error('num must be a number')
  }

  if (num < 0) {
    throw new Error('num must be a non-negative number')
  }

  if (num === 0) {
    return '0'
  }

  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  let res = ''
  while (num) {
    const remainder = num % 36
    res = chars[remainder] + res
    num = Math.floor(num / 36)
  }
  return res
}
