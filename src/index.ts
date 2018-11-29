import { createEditor } from './components/editor'

const EDITABLE_CHILD_TAGNAME = 'DIV'
const PAGE_CLASS_NAME = 'page'
const LINE_CLASS_NAME = 'line'
const TEMPLATE = {
  LINE: `<div class="${LINE_CLASS_NAME}"></div>`,
}

// Documentメソッドを短くする
function $id(id: string) {
  return document.getElementById(id)
}

function makeElement(name: string) {
  return document.createElement(name)
}

// 現在キャレットがある要素を返す
function getSelectedElement(selection) {
  if (selection.anchorNode.tagName === EDITABLE_CHILD_TAGNAME
      && selection.anchorNode.parentNode.className === PAGE_CLASS_NAME) {
    // selection.anchorNode.className = LINE_CLASS_NAME
    console.log(selection.anchorNode)
  }
}

// キャレットを要素の先頭に置く
function putCalet(node) {
  const selection = window.getSelection()
  const range = document.createRange()
  range.setStart(node, 0)
  range.setEnd(node, 0)

  console.log(range.collapsed)

  selection.removeAllRanges()

  selection.addRange(range)
}

function createPage() {
  const page = makeElement('div')
  page.className = 'page'
  return page
}

function createLine() {
  const line = makeElement('div')
  line.className = 'line'
  return line
}

function main() {
  const body = document.body
  const page = createPage()
  const line = createLine()
  line.appendChild(createEditor())
  page.appendChild(line)

  body.appendChild(page)
  // putCalet(page)
}

main()
