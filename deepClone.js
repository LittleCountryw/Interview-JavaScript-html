// 使用weakMap解决循环引用
// 使用Array.isArray判断是对象还是数组
// symbol做key的特殊处理
function deepClone(obj, map = new WeakMap()) {
  if (typeof obj === 'function') {
    return obj
  }
  if (typeof obj === 'symbol') {
    const desc = obj.description
    return Symbol(desc)
  }
  if (obj instanceof Set) {
    const newSet = new Set()
    obj.forEach((item) => {
      newSet.add(deepClone(item))
    })
    return newSet
  }
  if (obj instanceof Map) {
    const newMap = new Map()
    for (const [key, value] of obj) {
      newMap.set(key, deepClone(value))
    }
    return newMap
  }
  if (typeof obj !== 'object') {
    return obj
  }
  if (map.has(obj)) {
    return map.get(obj)
  }
  const newObj = Array.isArray(obj) ? [] : {}
  //解决循环引用
  map.set(obj, newObj)
  const keys = Object.keys(obj)
  for (const key of keys) {
    newObj[key] = deepClone(obj[key], map)
  }
  const symbolKeys = Object.getOwnPropertySymbols(obj)
  for (const skey of symbolKeys) {
    newObj[skey] = deepClone(obj[skey], map)
  }
  return newObj
}
