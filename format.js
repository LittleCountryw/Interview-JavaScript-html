// 千分位format小数位从前到后,整数位从后到前
function format(number) {
  const strArr = String(number).split('.') //["12345","7890"]
  // 数组解构,注意千分位可能为0
  let [int, dec = ''] = [strArr]

  let intStr = ''
  for (let i = int.length - 1; i >= 0; i--) {
    // 计算distance
    const distance = int.length - i
    // 注意:当i=0时不再前面加,了
    if (distance % 3 === 0 && i !== 0) {
      intStr = ',' + int[i] + intStr
    } else {
      intStr = int[i] + intStr
    }
  }
  console.log(intStr)
  let decStr = ''
  // 没有千分位时,不再计算
  if (dec.length) {
    for (let j = 0; j < dec.length; j++) {
      if ((j + 1) % 3 === 0 && j !== dec.length - 1) {
        decStr = decStr + dec[j] + ','
      } else {
        decStr = decStr + dec[j]
      }
    }
    console.log(decStr)
  }
  // 还是要判断一下千分位有没有
  return decStr.length > 0 ? [intStr, decStr].join('.') : intStr
}
console.log(format(1234567))
