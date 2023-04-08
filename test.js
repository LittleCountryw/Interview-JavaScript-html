// const data = []
// // for (var i = 0; i < 3; i++) {
// //   ;(function () {
// //     Promise.resolve().then(() => {
// //       data[i] = function () {
// //         console.log(i)
// //       }
// //     })
// //   })()
// // }
// // data[0]()
// // data[1]()
// // data[2]()
// for (var i = 0; i < 3; i++) {
//   ;(function () {
//     setTimeout(
//       (data[i] = function () {
//         console.log(i)
//       })
//     )
//   })()
// }
// data[0]()
// data[1]()
// data[2]()

// ;(async function () {
//   function fn() {
//     return new Promise((resolve, reject) => {
//       console.log('sss')
//       setTimeout(() => {
//         reject('222')
//       }, 0)
//     })
//     console.log('no')
//   }
//   let res = await fn().catch((err) => console.log(err))
//   console.log('res:', res)
// })()
// function solution(n, p) {
//   if (n % p === 0) {
//     console.log(n)
//     return
//   }
//   const arr = Array.from(n.toString()).map(Number)
//   let path = []
//   backTrack(0)
//   function backTrack(index) {
//     if (path.length === arr.length) {
//       if (Number(path.join('')) % p === 0) {
//         console.log(Number(path.join('')))
//         return
//       } else {
//         return
//       }
//     }
//     path.push(arr[index] === 9 ? 9 : arr[index] + 1)
//     backTrack(index + 1)
//     path.pop()

//     path.push(arr[index] === 0 ? 0 : arr[index] - 1)
//     backTrack(index + 1)
//     path.pop()
//   }
//   return -1
// }
// solution(72, 7)
// solution(101, 12321)

// function solution2(n) {
//   //先生成长度为n的数组
//   let arr = []
//   let path = []
//   backTrack(1)
//   function backTrack(start) {
//     if (path.length === n) {
//       arr.push([...path])
//       return
//     }

//     for (let i = start; i <= n; i++) {
//       path.push(i)
//       backTrack(i)
//       path.pop()
//     }
//   }
//   let res = 0
//   for (const one of arr) {
//     res += calc(one)
//   }

//   function calc(arr) {
//     //求权值
//     let cnt = 1
//     let max = arr[arr.length - 1]
//     for (let i = arr.length - 2; i >= 0; i--) {
//       if (arr[i] === max) {
//         cnt++
//       } else {
//         break
//       }
//     }
//     return cnt
//   }
//   console.log(res)
// }
// solution2(3)
// Promise.all([]).then((res) => {
//   console.log('all')
// })
// Promise.race([]).then((res) => {
//   console.log('race')
// })
// const [n, x, y] = readline().split(' ').map(Number) // n，x，y，分别表示树上的结点数量，小美所在的位置和小团所在的位置。

// // 建图
// const edges = new Array(n + 1).fill(0).map((v) => [])
// for (let i = 1; i < n; i++) {
//   // n-1次循环
//   const [u, v] = readline().split(' ').map(Number)
//   edges[u].push(v)
//   edges[v].push(u)
// }

// BFS
// const xArr = bfs(x) //xArr是小美到图上各点需要的时间
// const yArr = bfs(y) //yArr是小团到图上各点需要的时间
// let ans = 0
// for (let i = 1; i <= n; i++) {
//   if (xArr[i] > yArr[i]) ans = Math.max(ans, xArr[i]) // 如果小美最短路径>小团最短路径, 该点可能是答案
// }
// console.log(ans)

// function bfs(start) {
//   // start 起始位置
//   const arr = new Array(n + 1).fill(0)
//   const vis = new Array(n + 1).fill(0)
//   const q = []
//   q.push([start, 0])
//   vis[start] = true
//   while (q.length) {
//     const [pos, len] = q.shift()
//     arr[pos] = len
//     for (let v of edges[pos]) {
//       if (!vis[v]) {
//         q.push([v, len + 1])
//         vis[v] = true
//       }
//     }
//   }
//   return arr
// }
async function fn1() {
  await next()
  console.log('22222')
}
function next() {
  // return Promise.resolve(fn2())
  return new Promise((resolve) => {
    let res = fn2()
    resolve(res)
  })
}
async function fn2() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('11111')
      resolve()
    }, 2000)
  })
}
fn1()
