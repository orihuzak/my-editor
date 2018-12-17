const css = require('./editor.css').toString()
import Cursor from 'components/cursor/cursor'
import Line from 'components/line/line'
import { v4 } from 'uuid'

const print = console.log

export default class Editor extends HTMLElement {
  private lines: HTMLDivElement
  private shadow: ShadowRoot
  private cursor: Cursor
  private rawString: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
  private keyDownCode: string
  constructor() {
    super()
    // コンストラクターの中でシャドウルートをつくる必要があるらしい
    this.shadow = this.attachShadow({ mode: 'open' })
    window.onload = () => { // 画面読み込み時の処理
      this.drawCursor()
    }

    this.lines = document.createElement('div')
    this.lines.className = 'lines'

    // カーソルを設定
    this.cursor = new Cursor()
    this.cursor.className = 'cursor'
    this.cursor.input.oninput = (e) => this.onInput(e)
    this.cursor.input.onkeyup = (e) => this.keyUp(e)
    this.cursor.input.onkeydown = (e) => this.keyDown(e)
    this.shadow.appendChild(this.cursor)

    // 入力された文字列の幅を取得するためのspan
    this.rawString = document.createElement('span')
    this.rawString.className = 'raw-string'

    // スタイルを設定
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)
    this.shadow.appendChild(this.lines)

    // 最初の行を追加
    const newLine = this.makeNewLine()
    newLine.appendChild(this.rawString)
    this.lines.appendChild(newLine)
  }

  private keyUp(e): void {
    if (e.which === 13 && e.which !== this.keyDownCode) {
      this.drawCursor()
      this.inputTextToLine()
      this.cursor.input.value = '' // valueを初期化
      this.resizeInput()
    }
    // console.log(e.type + `: ` + e.which)
  }

  /** this.linesを使わないkeydown */
  private keyDown(e): void {
    this.keyDownCode = e.which
    const currentLine = this.rawString.parentElement
    if (e.which === 8) { // バックスペース入力
      if (currentLine.children.length > 1) {
        currentLine.removeChild(this.rawString.previousSibling)
        this.drawCursor()
      } else if (currentLine.children.length === 1
                 && currentLine !== this.lines.firstChild) {
        // lineにrawstringだけかつcurrentlineがlinesの先頭の要素ではないときを削除
        const prevLine = currentLine.previousElementSibling
        prevLine.appendChild(this.rawString)
        this.lines.removeChild(currentLine)
        this.drawCursor()
      }
    } else if (e.which === 13) { // return入力
      this.insertNewLine(this.makeNewLine())
      this.cursor.input.value = ''
      this.drawCursor()
    }
    // console.log(e.type + ': ' + e.which)
  }

  private onInput(e): void {
    if (e.which === 13) {
      this.cursor.input.value = ''
    } else {
      this.resizeInput()
    }
  }

  private onClick(e): void {
    // this.putCursor(e.x, e.y)
    this.inserRawString(e.x, e.y)
    this.drawCursor()
  }

  /**
   * 現在のlineに入力が決定した文字列を1文字ずつ分割したspan要素にして入れる
   */
  private inputTextToLine() {
    const chars = [...this.cursor.input.value]
    const lastIndex = chars.length - 1
    const currentLine = this.rawString.parentElement
    const currentChar = this.rawString.previousSibling
    for (const [i, char] of chars.entries()) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      if (currentChar) {
        currentLine.insertBefore(span, currentChar)
        if (i === lastIndex) {
          currentLine.insertBefore(this.rawString, currentChar)
        }
      } else {
        currentLine.appendChild(span)
        if (i === lastIndex) {
          currentLine.appendChild(this.rawString)
        }
      }
    }
  }

  /** textareaの幅と高さを入力された文字列に応じて変化させる */
  private resizeInput() {
    this.rawString.innerText = this.cursor.input.value
    this.cursor.input.style.width = this.rawString.offsetWidth + 'px'
  }

  /** 新しいlineを挿入する */
  private insertNewLine(newLine: HTMLDivElement): void {
    const currentLine = this.rawString.parentElement
    newLine.appendChild(this.rawString) // newLineにrawString設置
    this.lines.insertBefore(newLine, currentLine.nextSibling)
  }

  private makeNewLine(): HTMLDivElement {
    const newLine = document.createElement('div')
    newLine.className = 'line'
    newLine.onclick = (e) => this.onClick(e)
    // line.idに重複がないか確認する
    let bool: boolean
    let uuid: string
    do {
      bool = false
      uuid = v4()
      for (const line of this.lines.children) {
        if ( line.id === uuid ) {
          bool = true
        }
      }
    } while (bool)
    newLine.setAttribute('id', uuid)
    return newLine
  }

  /** クリックされた位置にspan.rawStringを挿入する */
  private inserRawString(x: number, y: number): void {
    // カーソルの移動位置が文字の上に重ならないように配置する
    const clickedElem = this.shadow.elementFromPoint(x, y)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char') {
      const diffL = x - objL
      const diffR = objR - x
      if (diffR <= diffL) {
        clickedElem.parentNode.insertBefore(this.rawString, clickedElem.nextSibling) // rawStringを追加
      } else {
        clickedElem.parentNode.insertBefore(this.rawString, clickedElem) // rawStringを追加
      }
    } else if (clickedElem.className === 'line') {
      clickedElem.appendChild(this.rawString) // rawStringを挿入
    }
  }

  /** span.rawStringの右端の位置にcursorを表示する */
  private drawCursor(): void {
    const rawStrRect = this.rawString.getBoundingClientRect()
    this.cursor.style.left = rawStrRect.right + 'px'
    this.cursor.style.top = rawStrRect.top + 'px'
    this.cursor.input.focus()
  }
}

// 登録
customElements.define('my-editor', Editor)
