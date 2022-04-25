// document.createElement
// dom.setAttribute(key,value)
// dom.appendChild()
function myrender(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }
  const dom = document.createElement(vnode.tag)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      const attr = vnode.attr[key]
      dom.setAttribute(key, attr)
    })
  }
  vnode.children.forEach((child) => {
    dom.appendChild(myrender(child))
  })
  return dom
}
