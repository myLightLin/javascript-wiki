/**
 * 给数字添加千分位分隔符
 * @param {number} num
 * @returns {string}
 */
export default function addThousandSeparator(num) {
  const numStr = num.toString().split('.')
  const [integerPart, decimalPart] = numStr
  let result = ''

  let count = 0
  for (let i = integerPart.length - 1; i >= 0; i--) {
    count++
    result = integerPart[i] + result
    if (count % 3 === 0 && i !== 0) {
      result = `,${result}`
    }
  }

  if (decimalPart) {
    result = `${result}.${decimalPart}`
  }

  return result
}
