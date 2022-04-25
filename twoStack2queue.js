// 两个栈实现一个队列
// stack2为空,把stack1中所有数给stack2
// 入栈入到数组1中，每当出栈,如果数组2原来为空将数组1中所有元素放入数组二中再取第一个，如果此时数组二原来不为空，那么直接取数组二的第一个
class stackQueue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }
  push(element) {
    this.stack1.push(element)
  }
  pop() {
    if (this.stack2.length === 0) {
      let len = this.stack1.length //3
      while (len--) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop() || null
  }
}
let que = new stackQueue()
que.push(1)
que.push(2)
// que.pop()
que.push(3)
console.log(que.pop())
