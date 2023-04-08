// 给你一个对象{'a':1,'b.c.d':2,'b.c.e':3}，实现一个函数把它展开成{'a':1,'b':{'c':{'d':2,'e':3}}}这种形式。
// function flat(obj) {
//   const keys = Object.keys(obj)
//   const newObj = {}
//   for (const key of keys) {
//     const arr = keys.split('.')
//     if (arr.length === 1) {
//       newObj[arr[0]] = obj[arr[0]]
//     } else {
//       //[b,c,d]
//       for (const k of arr) {
//         let temp = obj[k]
//         if (!temp) {
//           contrust()
//         }
//       }
//     }
//   }
//   function contrust(obj, key) {}
// }
const obj = {
  [Symbol('aaa')]: 1,
  b: 2,
  getAAA() {
    return this[Object.getOwnPropertySymbols(this)[0]]
  },
}
console.log(obj.getAAA())
