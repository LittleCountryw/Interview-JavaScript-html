Promise.retry = function (promiseFunc, num = 2) {
  return promiseFunc().then(null, (e) => {
    if (num > 0) {
      num -= 1
      console.log('重试')
      return Promise.retry(promiseFunc, num)
    }
    return Promise.reject(e)
  })
}

Promise.retry = function (promiseFunc, num = 2) {
  return new Promise((resolve, reject) => {
    promiseFunc().then(
      (res) => {
        resolve(res)
      },
      (err) => {
        if (num >= 0) {
          num--
          resolve(Promise.retry(promiseFunc, num))
        } else {
          reject(err)
        }
      }
    )
  })
}

const p1 = new Promise((resolve, reject) => {
  reject('error message')
})
const p2 = new Promise((resolve, reject) => {
  resolve(p1)
})
p2.then(
  (value) => {
    console.log(value)
  },
  (err) => {
    console.log(err)
  }
)

Promise.retry = function (fn, times) {
  return new Promise((resolve, reject) => {
    fn.then(
      (res) => {
        resolve(res)
      },
      (err) => {
        if (times <= 0) {
          reject(err)
        } else {
          resolve(Promise.retry(fn, times - 1))
        }
      }
    )
  })
}
