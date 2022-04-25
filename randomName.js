// 在reduce的时候设置区间 <和>=
function getPersonName(personValue) {
  let sum = personValue.reduce((pre, cur) => {
    cur.start = pre //0 //1
    cur.end = pre + cur.weight //1 //11
    return pre + cur.weight //110
  }, 0)
  let random = Math.random() * sum
  let person = personValue.find((item) => {
    return item.start < random && item.end >= random
  })
  return person.name
}
