const css = require('./page.css').toString()
import Editor from 'components/editor/editor'

export default class Page extends HTMLElement {
  private shadow: ShadowRoot
  private editor: Editor
  private root: HTMLDivElement
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.root = document.createElement('div')
    this.root.className = 'page'
    this.editor = new Editor()

    this.root.appendChild(this.editor)

    // スタイル
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)

    // ルートを追加
    this.shadow.appendChild(this.root)
  }
}

customElements.define('my-page', Page)
