// 年要单独处理的原因：年可能会有四个占位符,而日期和月份为一个或两个
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substring(4 - RegExp.$1.length)
    )
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k]
          : ('00' + o[k]).substring(('' + o[k]).length)
      )
    }
  }
  return fmt
}
var time1 = new Date().Format('yyyy-MM-dd')

var time2 = new Date().Format('yyyy-MM-dd hh:mm:ss')
console.log(time1)
console.log(time2)
