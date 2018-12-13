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
  private currentLine: HTMLElement
  private inputMemo: string = ''
  private rawString: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
  private keyDownCode: string
  constructor() {
    super()
    // コンストラクターの中でシャドウルートをつくる必要があるらしい
    this.shadow = this.attachShadow({ mode: 'open' })
    this.root = document.createElement('div')
    this.root.className = 'editor'

    // 入力された文字列の幅を取得するためのspan
    this.rawString = document.createElement('span')
    this.rawString.className = 'raw-string'
    this.root.appendChild(this.rawString)

    // カーソルを設定
    this.cursor = new Cursor()
    this.cursor.className = 'cursor'
    this.cursor.input.oninput = (e) => this.onInput(e)
    this.cursor.input.onkeyup = (e) => this.keyUp(e)
    this.cursor.input.onkeydown = (e) => this.keyDown(e)
    this.root.appendChild(this.cursor)

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
      const cursorPosition: number = parseInt(this.cursor.style.left, 10)
      this.cursor.style.left = cursorPosition + this.rawString.offsetWidth - 1 + 'px'
      this.textInput() // lineに書き込み
      this.resizeInput()
    }
    // console.log(e.type + `: ` + e.which)
  }

  private keyDown(e): void {
    this.keyDownCode = e.which
    // console.log(e.type + ': ' + e.which)
  }

  private onInput(e) {
    this.resizeInput()
  }

  private onClick(e) {
    this.cursor.input.focus() // inputにfocusを当てる
    this.putCursor(e)
  }

  private textInput() {
    // input.valueを一文字ずつ分割してspan要素にする
    for (const char of this.cursor.input.value) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      // console.log(char)
      this.lines[0].appendChild(span)
    }
    // this.lines[0].innerText += this.cursor.input.value
    this.cursor.input.value = '' // valueを初期化
  }

  /** textareaの幅と高さを入力された文字列に応じて変化させる */
  private resizeInput() {
    this.rawString.innerText = this.cursor.input.value
    this.cursor.input.style.width = this.rawString.offsetWidth + 'px'
    // this.cursor.input.style.height = this.rawString.offsetHeight + 'px'
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

  // カーソルを移動させるメソッド
  private putCursor(e: MouseEvent) {
    // カーソルの移動位置が文字の上に重ならないように配置する
    const clickedElem = this.shadow.elementFromPoint(e.x, e.y)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char') {
      const diffL = e.x - objL
      const diffR = objR - e.x
      if (diffR <= diffL) {
        this.cursor.style.left = objR - 1 + 'px' // マイナス1は見た目の調整用
      } else {
        this.cursor.style.left = objL - 1 + 'px'
      }
    } else if (clickedElem.className === 'line') {
      const child = clickedElem.lastElementChild
      if (child) {
        this.cursor.style.left = child.getBoundingClientRect().right - 1 + 'px'
      } else {
        this.cursor.style.left = objL + 'px'
      }
    }
  }
}

// 登録
customElements.define('my-editor', Editor)
