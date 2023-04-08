function sleep(delay, callback) {
  return new Promise((resolve) => {
    setTimeout(() => {
      callback()
      resolve()
    }, delay)
  })
}
class Queue {
  constructor() {
    this.listenser = []
  }
  task(delay, callback) {
    // 收集函数
    this.listenser.push(() => sleep(delay, callback))
    return this
  }
  async start() {
    // 遍历函数
    for (let l of this.listenser) {
      await l()
    }
  }
}
//做完任务1再做任务2..
new Queue()
  .task(1000, () => console.log(1))
  .task(2000, () => console.log(2))
  .task(3000, () => console.log(3))
  .start()

class Queue {
  constructor() {
    this.queue = []
  }
  task(delay, fn) {
    this.queue.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          fn()
          resolve()
        }, delay)
      })
    })
    return this
  }
  async start() {
    for (const fn of this.queue) {
      await fn()
    }
  }
}
