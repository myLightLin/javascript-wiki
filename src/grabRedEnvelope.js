/**
 * 抢红包算法
 * @param {number} totalMoney 金额（单位：分）
 * @param {number} participants 参与人数
 */
export default function generateRedEnvelope(totalMoney, participants) {
  if (typeof totalMoney !== 'number' || typeof participants !== 'number') {
    throw new Error('Invalid params type')
  }

  if (totalMoney <= 0 || participants <= 0) {
    throw new Error('Invalid total money or number of participants')
  }

  const amounts = new Array(participants).fill(0)

  let remainingMoney = totalMoney
  let remainingParticipants = participants

  for (let i = 0; i < participants - 1; i++) {
    // 随机范围：[1，剩余人均金额的 2 倍-1]分，保证每个人至少能分到 1 分钱
    const amount = random(1, (remainingMoney / remainingParticipants) * 2 - 1)
    amounts[i] = amount
    remainingMoney -= amount
    remainingParticipants--
  }

  // 最后一个人抢剩下的金额
  amounts[participants - 1] = remainingMoney

  const formattedAmounts = amounts.map(formatAmount).map(Number)
  return formattedAmounts
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function formatAmount(amount) {
  return (amount / 100).toFixed(2)
}

// Example usage
const totalMoney = 1000 // 10元
const participants = 10
const amounts = generateRedEnvelope(totalMoney, participants)
console.log(amounts)
