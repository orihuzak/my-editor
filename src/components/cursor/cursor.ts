const css = require('./cursor.css').toString()

const returnCodes: RegExp = /\r|\n|\r\n/

export default class Cursor extends HTMLElement {
  public input: HTMLTextAreaElement
  public rod: HTMLDivElement
  private shadow: ShadowRoot
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    // パーツを生成
    this.rod = document.createElement('div')
    this.rod.className = 'rod'
    this.input = document.createElement('textarea')
    this.input.className = 'input'
    this.input.wrap = 'soft'
    this.input.rows = 1
    this.input.autofocus = true // ページロードされた時にフォーカスを当てるかどうか
    this.input.onblur = (e: FocusEvent) => {
      this.style.display = 'none'
    }

    // スタイルを追加
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)

    // html要素を追加
    this.shadow.appendChild(this.input)
    this.shadow.appendChild(this.rod)
  }

  public resetValue(): void {
    this.input.value = ''
  }

  public getValue(): string {
    return this.input.value
  }

  public getValueExcludedReturnCodes(): string {
    return this.input.value.replace(returnCodes, '')
  }
}

customElements.define('my-cursor', Cursor)
