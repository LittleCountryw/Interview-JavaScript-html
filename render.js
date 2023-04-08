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
function render(element, container) {
  const dom =
    element.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  const isProperty = (key) => key !== 'children'
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach((child) => render(child, dom))

  container.appendChild(dom)
}

function render(obj) {
  if (typeof obj === 'string') {
    return document.createTextNode(obj)
  }
  let dom = document.createElement(obj.tag)
  let props = Object.keys(obj).filter((key) => key === 'children')
  for (const prop of props) {
    obj.setAttribute(prop, obj[prop])
  }
  for (const child of obj.children) {
    dom.appendChild(render(child))
  }
  return dom
}
