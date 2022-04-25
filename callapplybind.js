function LCcall(thisArg, ...args) {
  // 注意把thisArg转为Object类型
  const fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
  thisArg.fn = fn
  const res = thisArg.fn(...args)
  delete thisArg.fn
  return res
}
function LCapply(thisArg, args = []) {
  // apply与call的不同点在于要给args赋默认值
  const fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
  thisArg.fn = fn
  const res = thisArg.fn(...args)
  delete thisArg.fn
  return res
}
function LCbind(thisArg, ...args) {
  const fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : window
  thisArg.fn = fn
  return function (...args1) {
    const res = thisArg.fn(...args.concat(args1))
    delete thisArg.fn
    return res
  }
}

// newFn = fn.bind(this,args1,args2...) newFn(...args2)
