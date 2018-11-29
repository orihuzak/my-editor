const style = require('./editor.css')
import $ from 'dom-control'

export default function createEditor() {
  const line = $.makeEl('div')
  line.className = 'line'

  const corsor = $.makeEl('div')
  corsor.className = 'corsor'

  const caret = document.createElement('div')
  caret.className = 'caret'
  caret.style.cssText = style

  const input = $.makeEl('input')
  input.className = 'input'

  /*
  const input = $.makeEl('textarea')
  input.className = 'input'
  */
  document.onclick = (e) => {
    input.focus()
  }
  document.onkeypress = (e) => {
    if (!e.key.match(/a-z/)) {
      // line.innerText = e.key
    }
  }
  corsor.appendChild(caret)
  corsor.appendChild(input)
  line.appendChild(corsor)
  return line
}
