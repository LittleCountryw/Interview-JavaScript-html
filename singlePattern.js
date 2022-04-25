// js类实现单例模式
// 1.static getInstace返回单例
// 2.在new中 返回单例

class singlePattern {
  constructor(sno, name) {
    this.sno = sno
    this.name = name
  }
  static getInstace(sno, name) {
    if (!singlePattern.instance) {
      const instance = new singlePattern(sno, name)
      this.instance = instance
    }
    return this.instance
  }
}
console.log(singlePattern.getInstace('dzc', '201931061272'))
console.log(singlePattern.getInstace('dzc', '201931061273')) //和上面获得的一样

class singlePattern2 {
  constructor(sno, name) {
    if (!singlePattern2.instance) {
      this.sno = sno
      this.name = name
      singlePattern2.instance = this
    }
    return singlePattern2.instance
  }
}
console.log(new singlePattern2('123', '456'))
console.log(new singlePattern2('123', '4567')) //和上面的一样
