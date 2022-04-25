// 1.this
// 2.invoke
// 3.return promise
// 4.cancel
function debounce(fn, time, leading = true) {
  let timer = null
  let invoke = false
  const _debounce = function (...args) {
    // _debounce中的this是搜索框
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer)
      if (!invoke && leading) {
        // leading为true执行
        let result = fn.apply(this, args)
        invoke = true
        resolve(result)
      } else {
        timer = setTimeout(() => {
          let result = fn.apply(this, args)
          invoke = false
          resolve(result)
        }, time)
      }
    })
  }
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    invoke = false
  }
  return _debounce
}
