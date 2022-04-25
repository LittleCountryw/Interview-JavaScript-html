function myInstanceOf(obj, fn) {
  if (obj === null || typeof obj !== 'object') return false
  if (typeof fn !== 'function') throw new TypeError('right must be function')
  while (obj) {
    if (obj.__proto__ === fn.prototype) return true
    obj = obj.__proto__
  }
  return false
}
class Person {}
class Student extends Person {}
let stu = new Student()
console.log(myInstanceOf(stu, Object))
