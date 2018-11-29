const style = require('./style.css')

export function createEditor() {
  console.log(style)
  const caret = document.createElement('div')
  caret.className = 'caret'
  caret.style.cssText = style
  return caret
}
