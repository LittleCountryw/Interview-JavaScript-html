/*
 *reactive函数的封装，将创建代理对象的过程封装成一个函数
 *weakMap->map->depend->set
 */
// 保存当前需要收集的响应式函数
let activeReactiveFn = null

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }
  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
    }
  }
  notify() {
    this.reactiveFns.forEach((reactiveFn) => {
      reactiveFn()
    })
  }
}

//封装响应式函数
function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

const targetMap = new WeakMap()
function getDepend(target, key) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }
  let depend = map.get(key)
  if (!depend) {
    depend = new Depend()
    map.set(key, depend)
  }
  return depend
}
//weakMap -> key obj value map -> key:attr,value:depend ->set
function reactive(obj) {
  // 对象的响应式
  return new Proxy(obj, {
    get: function (target, key, recevier) {
      const depend = getDepend(target, key)
      depend.depend()
      return Reflect.get(target, key, recevier)
    },
    set: function (target, key, newValue, recevier) {
      Reflect.set(target, key, newValue, recevier)
      const depend = getDepend(target, key)
      depend.notify()
    },
  })
}

// const obj = {
//   name: 'wendy',
//   age: 18,
// }

const objProxy = reactive({
  name: 'wendy',
  age: 18,
})

watchFn(function () {
  console.log('我是第一个需要添加响应式的函数')
  console.log(objProxy.name)
})

watchFn(function () {
  console.log(objProxy.name, '第二个需要添加响应式 function')
})

watchFn(function () {
  console.log(objProxy.age, '第三个需要添加响应式 function')
})

objProxy.name = 'dzc'
