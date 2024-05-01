/**
 * 抢红包算法
 * @param {number} totalMoney 金额（单位：分）
 * @param {number} participants 参与人数
 */
export default function generateRedEnvelope(totalMoney, participants) {
  if (totalMoney <= 0 || participants <= 0) {
    throw new Error('Invalid total money or number of participants')
  }

  const amounts = new Array(participants).fill(0)

  let remainingMoney = totalMoney
  let remainingParticipants = participants

  for (let i = 0; i < participants - 1; i++) {
    const max = remainingMoney - remainingParticipants + 1
    const amount = Math.floor(Math.random() * max) + 1
    amounts[i] = amount / 100
    remainingMoney -= amount
    remainingParticipants--
  }

  // 最后一个人抢剩下的金额
  amounts[participants - 1] = remainingMoney / 100

  return amounts
}

// Example usage
const totalMoney = 1000 // 10元
const participants = 10
const amounts = generateRedEnvelope(totalMoney, participants)
console.log(amounts)
