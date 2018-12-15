const css = require('./editor.css').toString()
import Cursor from 'components/cursor/cursor'
import Line from 'components/line/line'
import { v4 } from 'uuid'

// エディタークラスを宣言
export default class Editor extends HTMLElement {
  private lines: HTMLDivElement[] = []
  private shadow: ShadowRoot
  private cursor: Cursor
  private currentLine: Element
  private currentChar: Node
  private rawString: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
  private keyDownCode: string
  constructor() {
    super()
    // コンストラクターの中でシャドウルートをつくる必要があるらしい
    this.shadow = this.attachShadow({ mode: 'open' })
    window.onload = () => {
      // カーソルを置く
      const lineRect = this.currentLine.getBoundingClientRect()
      this.cursor.style.left = lineRect.left + 'px'
      console.log(lineRect.left)
    }

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

    this.newLine()
  }

  public drawLines() {
    for (const line of this.lines) {
      this.shadow.appendChild(line)
    }
  }

  private keyUp(e): void {
    if (e.which === 13 && e.which !== this.keyDownCode) {
      // console.log('IME確定')
      // cursorの位置を入力された文字の幅分右に移動する
      const cursorPos: number = parseInt(this.cursor.style.left, 10)
      this.cursor.style.left = cursorPos + this.rawString.offsetWidth + 'px'
      this.inputTextToLine()
      // IME入力が決定したらinput.valueを初期化し、inputをresizeする
      this.cursor.input.value = '' // valueを初期化
      this.resizeInput()
    }
    // console.log(e.type + `: ` + e.which)
  }

  private keyDown(e): void {
    this.keyDownCode = e.which
    if (e.which === 8) { // 入力がバックスペースの時
      // const cursorRect = this.cursor.getBoundingClientRect()
      //const elem = this.shadow.elementFromPoint(cursorRect.left, cursorRect.top)
      console.log(this.rawString.previousSibling)
      this.currentLine.removeChild(this.rawString.previousSibling)
    }
    // console.log(e.type + ': ' + e.which)
  }

  private onInput(e): void {
    this.resizeInput()
  }

  private onClick(e): void {
    this.putCursor(e.x, e.y)
    this.cursor.input.focus()
  }

  /**
   * 現在のlineに入力が決定した文字列を1文字ずつ分割したspan要素にして入れる
   */
  private inputTextToLine() {
    const chars = [...this.cursor.input.value]
    const lastIndex = chars.length - 1
    for (const [i, char] of chars.entries()) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      if (this.currentChar) {
        this.currentLine.insertBefore(span, this.currentChar)
        if (i === lastIndex) {
          this.currentLine.insertBefore(this.rawString, this.currentChar)
        }
      } else {
        this.currentLine.appendChild(span)
        if (i === lastIndex) {
          this.currentLine.appendChild(this.rawString)
        }
      }
    }
  }

  /** textareaの幅と高さを入力された文字列に応じて変化させる */
  private resizeInput() {
    this.rawString.innerText = this.cursor.input.value
    this.cursor.input.style.width = this.rawString.offsetWidth + 'px'
  }

  /**
   * IME入力が決定したらinput.valueを初期化・inputをresize・currentLineからrawStringを削除する
   */

  private newLine(): void {
    const newLine = document.createElement('div')
    newLine.className = 'line'
    newLine.onclick = (e) => this.onClick(e)
    // line.idに重複がないか確認する
    let bool: boolean
    let uuid: string
    do {
      bool = false
      uuid = v4()
      for (const line of this.lines) {
        if ( line.id === uuid ) {
          bool = true
        }
      }
    } while (bool)
    newLine.setAttribute('id', uuid)
    newLine.appendChild(this.rawString) // rawString設置
    this.lines.push(newLine)
    this.drawLines()
    this.currentLine = newLine
  }

  /**
   * クリックされた場所にカーソルを置き、同時にテキストの挿入位置を決める
   * 引数はクリックされた座標x, y
   */
  private putCursor(x: number, y: number): void {
    // カーソルの移動位置が文字の上に重ならないように配置する
    const clickedElem = this.shadow.elementFromPoint(x, y)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char') {
      this.currentLine = clickedElem.parentElement // 現在のlineを登録
      const diffL = x - objL
      const diffR = objR - x
      if (diffR <= diffL) {
        this.currentChar = clickedElem.nextSibling // 現在のcharを登録
        this.cursor.style.left = objR + 'px'
        clickedElem.parentNode.insertBefore(this.rawString, clickedElem.nextSibling) // rawStringを追加
      } else {
        this.currentChar = clickedElem // 現在のcharを登録
        this.cursor.style.left = objL + 'px'
        clickedElem.parentNode.insertBefore(this.rawString, clickedElem) // rawStringを追加
      }
    } else if (clickedElem.className === 'line') {
      this.currentLine = clickedElem // 現在のlineを登録
      this.currentChar = null
      const lastChild = clickedElem.lastElementChild
      if (lastChild) {
        this.cursor.style.left = lastChild.getBoundingClientRect().right + 'px'
      } else {
        this.cursor.style.left = objL + 'px'
      }
      clickedElem.appendChild(this.rawString) // rawStringを挿入
    }
  }

  /**
   * クリックされた位置にカーソルをlineの子要素として挿入する
   * 現在使われておりません
   * @param e
   */
  private putCursor2(e: MouseEvent): void {
    const clickedElem = this.shadow.elementFromPoint(e.x, e.y)
    const rect = clickedElem.getBoundingClientRect()
    if (clickedElem.className === 'char') {
      this.currentLine = clickedElem.parentElement // 現在のlineを登録
      if ((rect.right - e.x) <= (e.x - rect.left)) {
        this.currentChar = clickedElem.nextSibling // 現在のcharを登録
        clickedElem.parentNode.insertBefore(this.cursor, clickedElem.nextSibling)
      } else {
        this.currentChar = clickedElem // 現在のcharを登録
        clickedElem.parentNode.insertBefore(this.cursor, clickedElem)
      }
    } else if (clickedElem.className === 'line') {
      this.currentLine = clickedElem // 現在のlineを登録
      this.currentChar = null
      clickedElem.appendChild(this.cursor)
    }
  }
}

// 登録
customElements.define('my-editor', Editor)
