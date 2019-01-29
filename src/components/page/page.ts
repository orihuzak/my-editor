import Editor from 'components/editor/editor'

export default class Page extends HTMLElement {
  private shadow: ShadowRoot
  private editor: Editor
  private root: HTMLDivElement
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.editor = new Editor()

    // ルートを追加
    this.shadow.appendChild(this.editor)
  }
}

customElements.define('my-page', Page)
