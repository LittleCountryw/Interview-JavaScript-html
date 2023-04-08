const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class LCPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.onFufilledFns = []
    this.onRjectedFns = []

    const resolve = (value) => {
      //最外层的状态判断好像可以不要
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_FULFILLED
          this.value = value
          this.onFufilledFns.forEach((fn) => {
            fn()
          })
        })
      }
    }
    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return
          this.status = PROMISE_STATUS_REJECTED
          this.reason = reason
          this.onRjectedFns.forEach((fn) => {
            fn()
          })
        })
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFufilled, onRjected) {
    const defaultOnRejected = (err) => {
      throw err
    }
    const defaultOnFulfilled = (value) => {
      return value
    }
    onRjected = onRjected || defaultOnRejected
    onFufilled = onFufilled || defaultOnFulfilled
    return new LCPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        try {
          const value = onFufilled(this.value)
          resolve(value)
        } catch (err) {
          reject(err)
        }
      }

      if (this.status === PROMISE_STATUS_REJECTED) {
        try {
          const reason = onRjected(this.reason)
          resolve(reason)
        } catch (err) {
          reject(err)
        }
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFufilledFns.push(() => {
          try {
            const value = onFufilled(this.value)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        })
        this.onRjectedFns.push(() => {
          try {
            const reason = onRjected(this.reason)
            resolve(reason)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  finally(onFinally) {
    this.then(onFinally, onFinally)
  }
  static resolve(value) {
    return new LCPromise((resolve, reject) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new LCPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises) {
    return new LCPromise((resolve, reject) => {
      const values = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            values.push(res)
            if (values.length === promises.length) {
              resolve(values)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  static allSettled(promises) {
    return new LCPromise((resolve) => {
      const results = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            results.push({ status: PROMISE_STATUS_FULFILLED, value: res })
            if (results.length === promises.length) {
              resolve(results)
            }
          },
          (err) => {
            results.push({ status: PROMISE_STATUS_REJECTED, value: err })
            if (results.length === promises.length) {
              resolve(results)
            }
          }
        )
      })
    })
  }
  static race(promises) {
    return new LCPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
        // promise.then(resolve, reject)
      })
    })
  }
  static any(promises) {
    return new LCPromise((resolve, reject) => {
      const reasons = []
      promises.forEach((promise) => {
        promise.then(
          (res) => resolve(res),
          (err) => {
            reasons.push(err)
            if (reasons.length === promises.length) {
              reject(new AggregateError(reasons))
            }
          }
        )
      })
    })
  }
}
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(1111)
  }, 3000)
})
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2222)
  }, 2000)
})
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3333)
  }, 3000)
})

// LCPromise.race([p1, p2, p3])
//   .then((res) => console.log('res:', res))
//   .catch((err) => console.log('err:', err))
LCPromise.any([p1, p2, p3])
  .then((res) => console.log('res:', res))
  .catch((err) => console.log('err:', err.errors))

//1 定义三个状态
//2 constructor中定义resolve reject 执行exec传入resolve和reject
// new Promise((resolve,reject)=>{})
//定义 resolve reject
//(res)=>{加入微任务队列}  (err)=>{加入微任务队列} 如果状态已经锁定 return
//变换状态 this.value = res this.reason = err 执行then中加入的函数

//3 then函数 then(onFulfilledFn,onRejectedFn) 返回promise 且resolve值是fn的执行结果 所以实际上加入到 onFulfilledFns中的是箭头函数
// this.onFulfilledFns.push(()=>{
//  let res = onFulfilledFn(this.value)
//  resolve(res)
// })
//同理onRejectedFn
//考虑then函数在sto中的情况 此时状态已经变为fulfilled或rejected this.value和this.reason已被赋值 所以直接执行

//默认参数 onFulfilledFn = onFulfilledFn ?? (value)=>return value
//  onRejectedFn = onRejectedFn ?? (err)=>throw err

//这是为了catch做准备 当先catch再then时 promise未报错 将value传到下一个then中
//当先then后catch时 将错误交给下一个catch
