//这种做法容易导致溢出 可以使用字符串相加法或Bigint
function calcFloat(arg1, arg2) {
  //将数字变为字符串
  const s1 = String(arg1)
  const s2 = String(arg2)
  //计算各小数位的长度
  let r1 = s1.split('.')[1] ? s1.split('.')[1].length : 0
  let r2 = s2.split('.')[1] ? s2.split('.')[1].length : 0
  //找出最大小数位数
  let m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
console.log(calcFloat(120, 220))
//10.2 + 2.03
