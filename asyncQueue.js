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

new Queue()
  .task(1000, () => console.log(1))
  .task(2000, () => console.log(2))
  .task(3000, () => console.log(3))
  .start()
