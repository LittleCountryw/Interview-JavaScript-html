// 将DOM转为树结构对象
// dom.tagName
// dom.childNode
function dom2obj(dom) {
  const obj = {}
  obj.tag = dom.tagName
  obj.children = []
  dom.childNodes.forEach((child) => {
    obj.children.push(dom2obj(child))
  })
  return obj
}
