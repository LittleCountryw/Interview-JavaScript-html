const rl = require('readline').createInterface({ input: process.stdin })
var iter = rl[Symbol.asyncIterator]()
const readline = async () => (await iter.next()).value

void (async function () {
  let firstLine = true
  while ((line = await readline())) {
    let tokens = line.split(' ').map(Number)
  }
})()

// const rl = require('readline').createInterface({ input: process.stdin })
// var iter = rl[Symbol.asyncIterator]()
// const readline = async () => (await iter.next()).value

// void (async function () {
//   while ((line = await readline())) {
//     let tokens = line.split(' ').map(Number)
//   }
// })()

//111222333
function solution(str) {
  if (str.length === 1) return 0
  //计算有几个重复子串
  let i = 0
  let cnt = 0
  for (let j = 1; j < str.length; j++) {
    if (str[j] !== str[i]) {
      cnt += Math.floor((j - i) / 2)
      i = j
    }
  }
  //处理尾部的重复
  if (i < str.length - 1) {
    cnt += Math.floor((str.length - i) / 2)
  }
  return cnt
}
console.log(solution('111222333445'))
for (let i = 0; i < enermy.length; i++) {
  let cnt = 1
  for (let j = i + 1; j < enermy.length; j++) {
    let cur = enermy[i]
    let after = enermy[j]
    if (cur[0] + a < after[0]) break //按x算
    if (
      cur[0] + a >= after[0] &&
      (cur[1] + b >= after[1] || cur[1] - b <= after[1])
    ) {
      cnt++
      max = Math.max(cnt, max)
    }
  }
}
