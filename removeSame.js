const arr = [1, 5, 2, 3, 1, 4, 2]
// 1.使用set
const set = new Set(arr)
console.log([...set])
// 由此延伸还可以使用map

// 2.使用reduce
// 在函数中使用reduce记得return啊!!
function removeSame(arr) {
  return arr.reduce((pre, cur) => {
    if (pre.indexOf(cur) === -1) {
      pre.push(cur)
    }
    return pre
  }, [])
}
console.log(removeSame(arr))

// 使用includes更好
function removeSame2(arr) {
  return arr.reduce((pre, cur) => {
    if (!pre.includes(cur)) {
      pre.push(cur)
    }
    return pre
  }, [])
}
console.log(removeSame2(arr))

// 对对象数组去重,要求对象有唯一的key
function removeSameObj(arr) {
  const set = new Set()
  const res = []
  for (const item of arr) {
    const key = item.key
    if (!set.has(key)) {
      res.push(item)
      set.add(key)
    }
  }
  return res
}

// 1.set
// 2.Array.includes
// 3.对数组对象去重,要求有唯一key
