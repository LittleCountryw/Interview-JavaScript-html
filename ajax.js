const ajax = {
  get(url, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true) // 第三个参数异步与否
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText)
      }
    }
    xhr.send()
  },
  post(url, data, fn) {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        fn(xhr.responeText)
      }
    }
    xhr.send(data)
  },
}
// XMLHttpRequest xhr.open xhr.onreadystatechange=function(if(xhr.readyState=4){可以接收到xhr.responeText，对其进行处理}) xhr.send
// post与get区别 post请求使用setRequestHeader设置请求头 xhr.send(data)
