/**
 * 实现一个简单的抽奖算法
 * {@link https://github.com/myLightLin/javascript-wiki/issues/24 Github}
 */
function draw(prizes) {
  // 根据每个奖品的权重，生成区间 [[0, 50], [50, 100], ...]
   const intervals = prizes.reduce((acc, curr) => {
       const weight = curr.weight
       const [_, preEnd] = acc[acc.length-1] || [0, 0]
       acc.push([preEnd, preEnd + weight])
       return acc
   }, [])

   // 找到区间的最小和最大值
   const [min, max] = intervals.reduce((acc, curr) => {
       if (curr && curr.length) {
           acc[0] = Math.min(acc[0], curr[0])
           acc[1] = Math.max(acc[1], curr[1])
       }
       return acc
   }, [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER])
   
   // 随机一个数
   const luckyNumber = random(min, max)
   // 看落在哪个区间
   const luckPrizeIndex = intervals.findIndex(item => item[0] <= luckyNumber && item[1] > luckyNumber)
   // 找到中奖奖品
   const luckyPirze = prizes[luckPrizeIndex]

   return luckyPirze
}

function random(min, max) {
 return Math.floor(Math.random() * (max - min + 1) + min)
}