// object.create和fn.apply
function LCNew(fn, ...args) {
  const newObj = Object.create(fn.prototype)
  fn.apply(newObj, args)
  return newObj
}
function person(name, sno) {
  this.name = name
  this.sno = sno
}
console.log(LCNew(person, 'kanae', '123'))

//Object.create
function create(obj) {
  function fn1() {}
  fn1.prototype = obj
  return new fn1()
}
