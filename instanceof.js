function myInstanceOf(obj, fn) {
  if (obj === null || typeof obj !== 'object') return false
  if (typeof fn !== 'function') throw new TypeError('right must be function')
  let temp = obj.__proto__
  while (temp) {
    if (temp === fn.prototype) return true
    temp = temp.__proto__
  }
  return false
}
class Person {}
class Student extends Person {}
let stu = new Student()

function myInstanceOf(obj, fn) {
  let temp = obj.__proto__
  while (temp) {
    if (temp === fn.prototype) return true
    temp = temp.__proto__
  }
  return false
}
