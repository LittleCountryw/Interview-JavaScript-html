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
          Promise.retry(promiseFunc, num)
        } else {
          reject(err)
        }
      }
    )
  })
}
