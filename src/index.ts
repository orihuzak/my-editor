import $ from 'dom-control'
import createEditor from './components/editor/editor'
import createPage from './components/page/page'

const EDITABLE_CHILD_TAGNAME = 'DIV'
const PAGE_CLASS_NAME = 'page'
const LINE_CLASS_NAME = 'line'
const TEMPLATE = {
  LINE: `<div class="${LINE_CLASS_NAME}"></div>`,
}

// 現在キャレットがある要素を返す
function getSelectedElement(selection) {
  if (selection.anchorNode.tagName === EDITABLE_CHILD_TAGNAME
      && selection.anchorNode.parentNode.className === PAGE_CLASS_NAME) {
    // selection.anchorNode.className = LINE_CLASS_NAME
    console.log(selection.anchorNode)
  }
}

function main() {
  const body = document.body
  const page = createPage()
  page.appendChild(createEditor())

  body.appendChild(page)
}

main()
