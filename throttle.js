// 1.leading为false时结合lastTime的判断
// 2.进入trailing的条件
// 3.return
// 4.trailing为true结合leading设置lastTime

function throttle(fn, interval, options = { leading: true, trailing: true }) {
  let timer = null
  const leading = options.leading
  const trailing = options.trailing
  let lastTime = 0
  function _throttle(...args) {
    return new Promise((resolve) => {
      let nowTime = new Date().getTime()
      if (!leading && !lastTime) {
        lastTime = nowTime
      }

      let remianTime = interval - (nowTime - lastTime)
      if (remianTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          // 这样下一次才会添加计时器
          timer = null
        }
        const result = fn.apply(this, args)
        resolve(result)
        lastTime = nowTime
        return //直接return这样就不会添加下面的计时器
      }
      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          const result = fn.apply(this, args)
          resolve(result)
          lastTime = !leading ? 0 : new Date().getDate()
        }, remianTime)
      }
    })
  }
  _throttle.cancel = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = null
    lastTime = 0
  }

  return _throttle
}

function throttle(fn, interval) {
  // 1.记录上一次的开始时间
  let lastTime = 0
  const _throttle = function () {
    // 2.1获取当前时间触发时的时间
    const nowTime = new Date().getTime()
    // 2.2计算剩余多长时间触发下次函数执行
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      // 2.3真正触发函数
      fn()
      // 2.4保留上次触发的时间
      lastTime = nowTime
    }
  }
  return _throttle
}
// 其实该函数已经实现了leading为true的功能

// function throttle(fn, interval) {
//   let lastTime = 0
//   function _throttle(...args) {
//     let nowTime = new Date().getTime()
//     let remianTime = interval - (nowTime - lastTime)
//     if (remianTime <= 0) {
//       fn.apply(this, args)
//       lastTime = nowTime
//     }
//   }
//   return _throttle
// }
