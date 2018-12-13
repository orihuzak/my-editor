const css = require('./cursor.css').toString()

export default class Cursor extends HTMLElement {
  public input: HTMLTextAreaElement
  public rod: HTMLDivElement
  private shadow: ShadowRoot
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.className = 'cursor'

    // パーツを生成
    this.rod = document.createElement('div')
    this.rod.className = 'rod'
    this.input = document.createElement('textarea')
    this.input.className = 'input'
    this.input.wrap = 'off'
    // this.input.setAttribute('type', 'text')

    // スタイルを追加
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)

    // html要素を追加
    this.shadow.appendChild(this.input)
    this.shadow.appendChild(this.rod)
  }
}

customElements.define('my-cursor', Cursor)
