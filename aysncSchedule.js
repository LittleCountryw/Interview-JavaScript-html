class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.count = 0
    this.queue = []
  }
  async add(fn) {
    // fn是异步的
    if (this.count >= this.limit) {
      //将add函数阻塞在这里
      // 原理是当resolve不被调用时,await等不到结果会一直等,接下来的代码会一直不执行
      // 等到前一个任务执行完之后,从队列里取出第一个resolve执行
      // 这时await终于等到了,会继续之后代码的执行
      // 这时才真正执行fn
      await new Promise((resolve) => {
        this.queue.push(resolve)
      })
    }
    this.count++
    // 如果没到limit,直接开始执行,用await来记录结果
    const res = await fn()
    // 以下代码全在微任务队列中
    // 拿到结果后count--,此时多出一个位置,所以可以直接取出队列中的异步函数执行
    this.count--
    this.queue.length && this.queue.shift()()

    return res
  }
}
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

const scheduler = new Scheduler(2)

const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => console.log(val))
  })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
