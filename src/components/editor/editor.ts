const css = require('./editor.css').toString()
import Cursor from 'components/cursor/cursor'
import Line from 'components/line/line'
import { v4 } from 'uuid'

// エディタークラスを宣言
export default class Editor extends HTMLElement {
  private lines: HTMLDivElement[] = []
  private shadow: ShadowRoot
  private root: HTMLDivElement
  private cursor: Cursor
  private currentLine: Element
  private currentChar: Node
  private rawString: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
  private keyDownCode: string
  constructor() {
    super()
    // コンストラクターの中でシャドウルートをつくる必要があるらしい
    this.shadow = this.attachShadow({ mode: 'open' })
    this.root = document.createElement('div')
    this.root.className = 'editor'

    // カーソルを設定
    this.cursor = new Cursor()
    this.cursor.className = 'cursor'
    this.cursor.input.oninput = (e) => this.onInput(e)
    this.cursor.input.onkeyup = (e) => this.keyUp(e)
    this.cursor.input.onkeydown = (e) => this.keyDown(e)
    this.root.appendChild(this.cursor)

    // 入力された文字列の幅を取得するためのspan
    this.rawString = document.createElement('span')
    this.rawString.className = 'raw-string'
    //this.root.appendChild(this.rawString)

    // スタイルを設定
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)

    this.newLine()

    this.shadow.appendChild(this.root)
  }

  public drawLines() {
    for (const line of this.lines) {
      this.root.appendChild(line)
    }
  }

  private keyUp(e): void {
    if (e.which === 13 && e.which !== this.keyDownCode) {
      // console.log('IME確定')
      // cursorの位置を入力された文字の幅分右に移動する
      const cursorPos: number = parseInt(this.cursor.style.left, 10)
      this.cursor.style.left = cursorPos + this.rawString.offsetWidth + 'px'
      this.inputTextToLine()
      this.resetInputAndRawString()
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
    this.putCursor(e)
    this.cursor.input.focus()
  }

  private inputTextToLine() {
    // input.valueを一文字ずつ分割してspan要素にする
    for (const char of this.cursor.input.value) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      if (this.currentChar) {
        this.currentLine.insertBefore(span, this.currentChar)
      } else {
        this.currentLine.appendChild(span)
      }
    }
  }

  /** textareaの幅と高さを入力された文字列に応じて変化させる */
  private resizeInput() {
    this.rawString.innerText = this.cursor.input.value
    this.cursor.input.style.width = this.rawString.offsetWidth + 'px'
    // this.cursor.input.style.height = this.rawString.offsetHeight + 'px'
  }

  /**
   * IME入力が決定したらinput.valueを初期化・inputをresize・currentLineからrawStringを削除する
   */
  private resetInputAndRawString(): void {
    this.cursor.input.value = '' // valueを初期化
    this.resizeInput()
    this.currentLine.removeChild(this.rawString)
  }

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
    this.lines.push(newLine)
    this.drawLines()
    this.currentLine = newLine
  }

  /**
   * カーソルを表示する場所を決めて表示する。テキストの挿入位置を決める
   */
  private putCursor(e: MouseEvent): void {
    // カーソルの移動位置が文字の上に重ならないように配置する
    const clickedElem = this.shadow.elementFromPoint(e.x, e.y)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char') {
      this.currentLine = clickedElem.parentElement // 現在のlineを登録
      const diffL = e.x - objL
      const diffR = objR - e.x
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
