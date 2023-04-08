const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING
    this.onFufilledFns = []
    this.onRejectedFns = []
    this.value = undefined
    this.reason = undefined
    //new Promise立刻执行executor 并传入resolve reject两个参数
    //定义resolve和reject
    const resolve = (value) => {
      queueMicrotask(() => {
        //当状态已经锁定时 不继续执行
        if (this.status !== PROMISE_STATUS_PENDING) return
        //改变状态
        this.status = PROMISE_STATUS_FULFILLED
        //保存value
        this.value = value
        //执行onFufilledFns中加入的函数
        this.onFufilledFns.forEach((fn) => fn())
      })
    }
    const reject = (reason) => {
      queueMicrotask(() => {
        if (this.status !== PROMISE_STATUS_PENDING) return
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        this.onRejectedFns.forEach((fn) => fn())
      })
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFufilled, onRejected) {
    //then函数返回promise onFufilled的执行结果会作为then函数promise的resolve值
    //then函数的执行在微任务队列中
    //p1.then
    //this 为p1 箭头函数this是看上层作用域 即p1
    //为了照顾catch 为onFulfilled和onRejected赋默认值
    //情况2 p1.catch().then() p1中未出现错误
    onFufilled =
      onFufilled ??
      ((value) => {
        return value
      })
    //情况1 p1.then(没传onRejected).catch p1中出现错误
    onRejected =
      onRejected ??
      ((err) => {
        throw err
      })
    return new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onFufilledFns.push(() => {
          try {
            let value = onFufilled(this.value)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        })
        this.onRejectedFns.push(() => {
          try {
            let reason = onRejected(this.reason)
            resolve(reason)
          } catch (err) {
            reject(err)
          }
        })
        //setTimeout中的then函数 此时status不是pending 但是resolve/reject执行结束 已对this.value/reason赋值 所以单独执行
      } else if (this.status === PROMISE_STATUS_FULFILLED) {
        try {
          let value = onFufilled(this.value)
          resolve(value)
        } catch (err) {
          reject(err)
        }
      } else if (this.status === PROMISE_STATUS_REJECTED) {
        try {
          let reason = onRejected(this.reason)
          resolve(reason)
        } catch (err) {
          reject(err)
        }
      }
    })
  }
  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
  finally(onFinally) {
    //不管是reject还是resolve均会执行
    return this.then(onFinally, onFinally)
  }
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  //全部resolve时将结果数组resolve 一个reject时reject
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const resArr = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resArr.push(res)
            if (resArr.length === promises.length) resolve(resArr)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  //只有resolve
  static allsettled(promises) {
    return new MyPromise((resolve) => {
      const resArr = []
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resArr.push({ status: PROMISE_STATUS_FULFILLED, value: res })
            if (resArr.length === promises.length) resolve(resArr)
          },
          (err) => {
            resArr.push({ status: PROMISE_STATUS_REJECTED, reason: err })
            if (resArr.length === promises.length) resolve(resArr)
          }
        )
      })
    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  //当有一个fulfilled时resolve 全是rejected时 收集错误reject错误数组
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      const errArr = []
      promises.forEach((promise) => {
        promise.then(
          (res) => resolve(res),
          (err) => {
            errArr.push(err)
            if (errArr.length === promises.length) {
              reject(new AggregateError(errArr))
            }
          }
        )
      })
    })
  }
}
//promise.then()

//创建promise
/**
 * new Promise((resolve,reject)=>{函数体})
 */
//参数resolve reject
//对象方法then catch finally
/**
 * promise.then((res)=>{xxx},(err)=>{xxx})
 * setTimeout中的then函数 此时status不是pending 但是resolve/reject执行结束 已对this.value/reason赋值 所以单独执行
 */
//静态方法all allSettled race any resolve reject
