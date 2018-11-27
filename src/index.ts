class Line extends Node {
  constructor() {
    super()
    this.line = document.createElement('div')
    this.line.className = 'line'
    this.line.contentEditable = 'true'
    this.line.oninput = this.getLine
  }

  getLine() {
    return console.log(this.line.innerHTML)
  }

  inner() {
    return this.line.innerHTML
  }

}

function createPage() {
  const page = document.createElement('div')
  page.className = 'page'
  page.contentEditable = 'true'
  page.oninput = () => { console.log(page.innerHTML) }
  return page
}

function main() {
  const body = document.body
  body.appendChild(createPage())
  body.onclick = () => (console.log(window.getSelection()))
}

main()
