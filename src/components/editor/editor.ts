const css = require('./editor.css').toString()
import Cursor from 'components/cursor/cursor'
import Line from 'components/line/line'
import { v4 } from 'uuid'

const print = console.log

interface IeditorSetting {
  indentIsSpaces: boolean,
  indentSize: number
}

function getIndent(setting: IeditorSetting): string {
  if (setting.indentIsSpaces) {
    return ' '.repeat(setting.indentSize)
  } else {
    return '\t'.repeat(setting.indentSize)
  }
}

const indentSetting: IeditorSetting = {
  indentIsSpaces: true,
  indentSize: 2
}

export default class Editor extends HTMLElement {
  private lines: HTMLDivElement
  private shadow: ShadowRoot
  private cursor: Cursor
  private rawStr: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
  private keyDownCode: number
  private inputData: string
  constructor() {
    super()
    // コンストラクターの中でシャドウルートをつくる必要があるらしい
    this.shadow = this.attachShadow({ mode: 'open' })

    this.lines = document.createElement('div')
    this.lines.className = 'lines'

    // カーソルを設定
    this.cursor = new Cursor()
    this.cursor.className = 'cursor'
    this.cursor.input.oninput = (e) => this.onInput(e)
    this.cursor.input.onkeydown = (e) => this.keyDown(e)
    this.cursor.input.onkeypress = (e) => this.keyPress(e)
    this.cursor.input.onkeyup = (e) => this.keyUp(e)
    this.cursor.input.addEventListener('compositionend', (e) => this.writeToLine())
    this.shadow.appendChild(this.cursor)

    // 入力された文字列の幅を取得するためのspan
    this.rawStr = document.createElement('span')
    this.rawStr.className = 'raw-string'

    // スタイルを設定
    const style = document.createElement('style')
    style.textContent = css
    this.shadow.appendChild(style)
    this.shadow.appendChild(this.lines)

    // 最初の行を追加
    const newLine = this.makeNewLine()
    newLine.appendChild(this.rawStr)
    this.lines.appendChild(newLine)

    // 画面読み込み時の処理
    window.onload = () => {
      this.drawCursor()
    }
  }

  private keyDown(e: KeyboardEvent): void {
    print(`${e.type}: ${e.key}: ${e.which}`)
    this.keyDownCode = e.which
    const currentLine = this.rawStr.parentElement
    if (e.which === 8) { // バックスペース入力
      if (currentLine === this.lines.firstChild) {
        if (currentLine.firstChild !== this.rawStr) {
          currentLine.removeChild(this.rawStr.previousSibling)
        }
      } else {
        if (currentLine.firstChild === this.rawStr) {
          const children = [...currentLine.children]
          const prevLine = currentLine.previousSibling
          for (const child of children) {
            prevLine.appendChild(child)
          }
          this.lines.removeChild(currentLine)
        } else {
          currentLine.removeChild(this.rawStr.previousSibling)
        }
      }
      this.drawCursor()
    } else if (e.which === 9) { // tab入力
      if (currentLine.firstChild === this.rawStr
          || this.rawStr.previousElementSibling.className === 'indent') {
        this.insertIndent()
      }
    } else if (e.which === 13) { // return入力
      this.cursor.input.value = '' // これいる？
      this.insertNewLine(this.makeNewLine())
      this.drawCursor()
    } else if (e.which === 32) { // スペースキー入力
      if (currentLine.firstChild === this.rawStr
        || this.rawStr.previousElementSibling.className === 'indent') {
        this.insertIndent()
      }
    } else if (e.which === 37) { // 左入力
      const prevChar = this.rawStr.previousSibling
      if (prevChar) {
        currentLine.insertBefore(this.rawStr, prevChar)
      } else {
        const prevLine = currentLine.previousSibling
        if (prevLine) {
          prevLine.appendChild(this.rawStr)
        }
      }
      this.drawCursor()
    } else if (e.which === 38) { // 上入力
      const prevLine = currentLine.previousElementSibling
      if (prevLine) {
        const prevChildren = [...prevLine.children]
        if (prevChildren) {
          const index = [...currentLine.children].indexOf(this.rawStr)
          const target = prevChildren[index]
          prevLine.insertBefore(this.rawStr, target)
        } else {
          prevLine.appendChild(this.rawStr)
        }
      }
      this.drawCursor()
    } else if (e.which === 39) { // 右入力
      const nextChar = this.rawStr.nextSibling
      if (nextChar) {
        currentLine.insertBefore(this.rawStr, nextChar.nextSibling)
      } else {
        const nextLine = currentLine.nextSibling
        if (nextLine) {
          nextLine.insertBefore(this.rawStr, nextLine.firstChild)
        }
      }
      this.drawCursor()
    } else if (e.which === 40) { // 下入力
      const nextLine = currentLine.nextElementSibling
      if (nextLine) {
        const nextChildren = [...nextLine.children]
        if (nextChildren) {
          const index = [...currentLine.children].indexOf(this.rawStr)
          const target = nextChildren[index]
          nextLine.insertBefore(this.rawStr, target)
        } else {
          nextLine.appendChild(this.rawStr)
        }
      } else {
        currentLine.appendChild(this.rawStr)
      }
      this.drawCursor()
    }
  }

  private keyPress(e): void {
    // print(`${e.type}: ${e.key}: ${e.which}`)
  }

  private keyUp(e): void {
    // print(`${e.type}: ${e.key}: ${e.which}`)
  }

  private onInput(e): void {
    // print(`${e.type}: ${e.inputType}: ${e.dataTransfer}: ${e.data}: ${e.isComposing}`)
    if (this.rawStr.parentElement.firstChild === this.rawStr
      || this.rawStr.previousElementSibling.className === 'indent') {
      if (e.data === ' '
      || e.data === '\u3000') {
        this.cursor.resetValue()
      }
    }
    if (e.data === '\u3000') {
      this.writeToLine() // 下のresizeInputが二重になってるのでreturnを入れた
      return
    }
    this.resizeInput()
  }

  private onClick(e): void {
    // this.putCursor(e.x, e.y)
    this.insertRawStr(e.x, e.y)
    this.drawCursor()
  }

  private writeToLine(): void {
    // print(e.type)
    this.inputTextToLine()
    this.cursor.resetValue() // valueを初期化
    this.resizeInput()
    this.drawCursor()
  }

  private insertIndent(): void {
    const currentLine = this.rawStr.parentElement
    const indent: HTMLSpanElement = document.createElement('pre')
    indent.className = 'indent'
    indent.textContent = getIndent(indentSetting)
    currentLine.insertBefore(indent, this.rawStr)
    this.drawCursor()
  }

  /**
   * 現在のlineに入力が決定した文字列を1文字ずつ分割したspan要素にして入れる
   */
  private inputTextToLine() {
    const chars = [...this.cursor.getValueExcludedReturnCodes()]
    const lastIndex = chars.length - 1
    const currentLine = this.rawStr.parentElement
    const nextChar = this.rawStr.nextSibling
    for (const [i, char] of chars.entries()) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      if (nextChar) {
        currentLine.insertBefore(span, nextChar)
        if (i === lastIndex) {
          currentLine.insertBefore(this.rawStr, nextChar)
        }
      } else {
        currentLine.appendChild(span)
        if (i === lastIndex) {
          currentLine.appendChild(this.rawStr)
        }
      }
    }
  }

  /** textareaの幅と高さを入力された文字列に応じて変化させる */
  private resizeInput() {
    this.rawStr.innerText = this.cursor.getValueExcludedReturnCodes()
    this.cursor.input.style.width = this.rawStr.offsetWidth + 'px'
  }

  /** 新しいlineを現在カーソルがある行の次の要素として挿入しつつ、カーソルより後にあるspan.charを全て新しい行に挿入する */
  private insertNewLine(newLine: HTMLDivElement): void {
    const currentLine = this.rawStr.parentElement
    const bros = [...currentLine.children]
    const index = bros.indexOf(this.rawStr)
    const newChildren = bros.slice(index)
    for (const child of newChildren) {
      newLine.appendChild(child)
    }
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

  /** クリックされた位置にspan.rawStringを挿入し、カーソルの移動位置が文字の上に重ならないように配置する */
  private insertRawStr(x: number, y: number): void {
    const clickedElem = this.shadow.elementFromPoint(x, y)
    print(clickedElem.className)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char'
        || clickedElem.className === 'indent') {
      const diffL = x - objL
      const diffR = objR - x
      if (diffR <= diffL) {
        clickedElem.parentNode.insertBefore(this.rawStr, clickedElem.nextSibling) // rawStrを追加
      } else {
        clickedElem.parentNode.insertBefore(this.rawStr, clickedElem) // rawStrを追加
      }
    } else if (clickedElem.className === 'line') {
      clickedElem.appendChild(this.rawStr) // rawStrを挿入
    }
  }

  /** span.rawStrの右端の位置にcursorを表示する */
  private drawCursor(): void {
    const rawStrRect = this.rawStr.getBoundingClientRect()
    this.cursor.style.left = rawStrRect.right + 'px'
    this.cursor.style.top = rawStrRect.top + 'px'
    this.cursor.input.focus()
  }
}

// 登録
customElements.define('my-editor', Editor)
