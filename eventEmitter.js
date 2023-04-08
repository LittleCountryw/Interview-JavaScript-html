class EventEmitter {
  constructor() {
    this.events = {}
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        // 箭头函数的return!!!
        (fn) => fn !== callback && fn.l !== callback
      )
    }
  }
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(...args)
      })
    }
  }
  once(eventName, callback) {
    // 给callback一层封装
    const _onceCallback = () => {
      callback()
      this.off(eventName, _onceCallback)
    }
    _onceCallback.l = callback //防止off once的事件
    this.on(eventName, _onceCallback)
  }
}

const events = new EventEmitter()
events.on('hobby', (...argu) => {
  console.log('打游戏', ...argu)
})
let eat = () => {
  console.log('吃')
}
events.once('hobby', eat)
let shop = (...argu) => {
  console.log('逛街', ...argu)
}
events.on('hobby', shop)

// events.off('hobby', eat)
events.emit('hobby', 1, 2, 3)
console.log('-------------')
events.emit('hobby', 1, 2, 3)

// events.emit('hello', 'susan')
//打游戏 1 2 3
// 逛街 1 2 3

//new eventEmmiter() =>{eventName1:[]}
//on emit off once
