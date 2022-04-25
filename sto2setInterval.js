/*  
每个 setTimeout 产生的任务会直接 push 到任务队列中
而 setInterval 在每次把任务 push 到任务队列前，都要进行一下判断
(看上次的任务是否仍在队列中，如果有则不添加，没有则添加)。
*/
let timer = null
function mysetInterval(fn, interval) {
  function interFun() {
    fn()
    timer = setTimeout(interFun, interval)
  }
  timer = setTimeout(interFun, interval)
}
mysetInterval(() => {
  console.log('aaa')
}, 2000)

clearTimeout(timer)
