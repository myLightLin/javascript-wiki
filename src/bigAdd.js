/**
 * 大数相加算法
 * @param {string} n1 
 * @param {string} n2 
 * @returns {string}
 */
function add(n1, n2) {
  let maxLen = Math.max(n1.length, n2.length)
  const s1 = n1.padStart(maxLen, 0)
  const s2 = n2.padStart(maxLen, 0)

  let res = ''
  let carry = 0
  for (let i = maxLen - 1; i >= 0; i--) {
    const sum = Number(s1[i]) + Number(s2[i]) + carry
    carry = Math.floor(sum / 10)
    res = (sum % 10) + res
  }

  if (carry) res = '1' + res

  return res
}

// Test
const n1 = '1323434343'
const n2 = '2345'
const res = add(n1, n2)
console.log(res)