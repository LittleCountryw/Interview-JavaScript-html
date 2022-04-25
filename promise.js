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
