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

enum Key {
  tab = 'Tab',
  delete = 'Backspace',
  enter = 'Enter',
  space = ' ',
  left = 'ArrowLeft',
  right = 'ArrowRight',
  up = 'ArrowUp',
  down = 'ArrowDown',
}

export default class Editor extends HTMLElement {
  private lines: HTMLDivElement
  private shadow: ShadowRoot
  private cursor: Cursor
  private rawStr: HTMLSpanElement // 入力された生の文字列の幅を取得するためのspan
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
    this.cursor.input.addEventListener('compositionend',
                                        (e) => this.writeToLine())

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
    this.lines.appendChild(newLine)

    // 画面読み込み時の処理
    window.onload = () => {
      const text = this.lines.firstElementChild.getElementsByClassName('text')[0]
      text.insertBefore(this.rawStr, text.firstChild)
      this.drawCursor()
    }
  }

  private keyDown(e): void {
    if (e.defaultPrevented) { return }
    const curText = this.rawStr.parentNode
    print(`${e.type}: ${e.key}`)
    if (!e.isComposing) { // IME入力中は発動しない
      switch (e.key) {
        case 'Tab': {
          if (e.shiftKey) {
            if (this.canUnindent()) {
              this.unindent()
            }
          } else if (curText.firstChild === this.rawStr) {
            this.indent()
          }
          break
        } case 'Backspace': {
          this.onDeleteKey()
          break
        } case 'Enter': {
          this.insertNewLine()
          break
        } case ' ': {
          if (curText.firstChild === this.rawStr) {
            this.indent()
          }
          break
        } case 'ArrowLeft': {
          if (e.ctrlKey) {
            this.unindent()
          } else if (e.metaKey) {
            this.moveToLineStart()
          } else { // 左入力のみ
            this.cursorLeft()
          }
          break
        } case 'ArrowRight': {
          if (e.ctrlKey) {
            this.indent()
          } else if (e.metaKey) {
            this.moveToLineEnd()
          } else {
            this.cursorRight()
          }
          break
        } case 'ArrowUp': {
          if (e.metaKey) {
            this.moveToPageStart()
          } else {
            this.cursorUp()
          }
          break
        } case 'ArrowDown': {
          if (e.metaKey) {
            this.moveToPageEnd()
          } else {
            this.cursorDown()
          }
          break
        } case 'a': {
          if (e.ctrlKey) {
            this.moveToLineStart()
          }
          break
        } case 'e': {
          if (e.ctrlKey) {
            this.moveToLineEnd()
          }
          break
        }
      }
    }
    e.preventDefault()
  }

  private keyPress(e): void {
    // print(`${e.type}: ${e.key}: ${e.which}`)
  }

  private keyUp(e: KeyboardEvent): void {
    print(`${e.type}: ${e.key}`)
  }

  private onInput(e): void {
    // print(`${e.type}: ${e.inputType}: ${e.dataTransfer}: ${e.data}: ${e.isComposing}`)
    if (this.rawStr.parentElement.firstChild === this.rawStr
        || this.rawStr.previousElementSibling.className === 'indent') {
      if (e.data === ' ' || e.data === '\u3000') {
        // 行の先頭に半角/全角スペースが入らないようにする措置
        this.cursor.resetValue()
      }
    } else if (e.data === '\u3000') {
      this.writeToLine() // 下のresizeInputが二重になってるのでreturnを入れた
      return
    }
    this.resizeInput()
  }

  private onClick(e): void {
    this.insertRawStr(e)
    if (this.cursor.style.display === 'none') {
      this.cursor.style.display = 'inline-block'
    }
    this.drawCursor()
  }

  private writeToLine(): void {
    // print(e.type)
    this.insertTextToLine()
    this.cursor.resetValue() // valueを初期化
    this.resizeInput()
    this.drawCursor()
  }

  /** カーソルを左に動かす */
  private cursorLeft(): void {
    const text = this.rawStr.parentNode
    const prevChar = this.rawStr.previousSibling
    if (prevChar) {
      text.insertBefore(this.rawStr, prevChar)
    } else {
      const prevLine = text.parentNode.previousSibling
      if (prevLine) {
        prevLine.lastChild.appendChild(this.rawStr)
      }
    }
    this.drawCursor()
  }

  /** カーソルを右に動かす */
  private cursorRight(): void {
    const text = this.rawStr.parentNode
    const nextChar = this.rawStr.nextSibling
    if (nextChar) {
      text.insertBefore(this.rawStr, nextChar.nextSibling)
    } else {
      const nextLine = text.parentNode.nextSibling
      if (nextLine) {
        const nextText = nextLine.lastChild
        nextText.insertBefore(this.rawStr, nextText.firstChild)
      }
    }
    this.drawCursor()
  }

  /** カーソルを上に動かします */
  private cursorUp(): void {
    const text = this.rawStr.parentNode
    const curLine = text.parentNode
    const preLine = curLine.previousSibling
    if (preLine) {
      const preText = preLine.lastChild
      const preChars = preText.childNodes
      if (preChars) {
        const index = [...text.childNodes].indexOf(this.rawStr)
        const tgt = preChars.item(index)
        preText.insertBefore(this.rawStr, tgt)
      } else {
        preText.appendChild(this.rawStr)
      }
    } else {
      this.moveToLineStart()
    }
    this.drawCursor()
  }

  private cursorDown(): void {
    const curText = this.rawStr.parentNode
    const curLine = curText.parentNode
    const nextLine = curLine.nextSibling
    if (nextLine) {
      const nextText = nextLine.lastChild
      const nextChars = nextText.childNodes
      if (nextChars) {
        const curLoc = [...curText.childNodes].indexOf(this.rawStr)
        const tgt = nextChars.item(curLoc)
        nextText.insertBefore(this.rawStr, tgt)
      } else {
        nextText.appendChild(this.rawStr)
      }
    } else {
      this.moveToLineEnd()
    }
    this.drawCursor()
  }

  private onDeleteKey() {
    const text = this.rawStr.parentElement
    if (this.rawStr.previousSibling) {
      this.deleteLeft()
    } else {
      if (this.canUnindent()) {
        this.unindent()
      } else {
        const currentLine = text.parentElement
        if (currentLine !== this.lines.firstChild) {
          const children = [...text.children]
          const prevLine = currentLine.previousElementSibling
          const prevText = prevLine.getElementsByClassName('text')[0]
          for (const child of children) {
            prevText.appendChild(child)
          }
          this.lines.removeChild(currentLine)
          this.drawCursor()
        }
      }
    }
  }

  /** 左の文字を削除 */
  private deleteLeft(): void {
    const text = this.rawStr.parentElement
    text.removeChild(this.rawStr.previousSibling)
    this.drawCursor()
  }

  private indent(): void {
    const indent = this.rawStr.parentElement.previousSibling
    const space = document.createElement('pre')
    space.className = 'space'
    space.innerText = ' '
    if (!indent.firstChild) {
      const mark = document.createElement('span')
      mark.className = 'indent-mark'
      space.appendChild(mark)
    }
    indent.insertBefore(space, indent.firstChild)
    this.drawCursor()
  }

  /** unindentできるかどうかbooleanで返すメソッド（実はindentの数で判定しているだけ） */
  private canUnindent(): boolean {
    const numOfIndents = this.rawStr.parentNode.previousSibling.childNodes.length
    return numOfIndents > 0 ? true : false
  }

  private unindent(): void {
    const indent = this.rawStr.parentElement.previousElementSibling
    indent.removeChild(indent.firstChild)
    this.drawCursor()
  }

  /** ページ頭へ移動 */
  private moveToPageStart(): void {
    const firstLine = this.lines.firstChild
    const firstLineText = firstLine.lastChild
    if (firstLineText.firstChild !== this.rawStr) {
      firstLineText.insertBefore(this.rawStr, firstLineText.firstChild)
      this.drawCursor()
    }
  }

  /** ページ末へ移動 */
  private moveToPageEnd(): void {
    const lastLine = this.lines.lastChild
    const lastLineText = lastLine.lastChild
    if (lastLineText.lastChild !== this.rawStr) {
      lastLineText.appendChild(this.rawStr)
      this.drawCursor()
    }
  }

  private moveToLineStart(): void {
    const curText = this.rawStr.parentNode
    if (curText.firstChild !== this.rawStr) {
      curText.insertBefore(this.rawStr, curText.firstChild)
      this.drawCursor()
    }
  }

  private moveToLineEnd(): void {
    const curText = this.rawStr.parentNode
    if (curText.lastChild !== this.rawStr) {
      curText.appendChild(this.rawStr)
      this.drawCursor()
    }
  }

  /**
   * 現在のlineのtext部に入力が決定した文字列を1文字ずつ分割したspan要素にして入れる
   */
  private insertTextToLine(): void {
    const chars = [...this.cursor.getValueExcludedReturnCodes()]
    const lastIndex = chars.length - 1
    const currentTextPart = this.rawStr.parentElement
    const nextChar = this.rawStr.nextSibling
    for (const [i, char] of chars.entries()) {
      const span = document.createElement('span')
      span.className = 'char'
      span.innerText = char
      if (nextChar) {
        currentTextPart.insertBefore(span, nextChar)
        if (i === lastIndex) {
          currentTextPart.insertBefore(this.rawStr, nextChar)
        }
      } else {
        currentTextPart.appendChild(span)
        if (i === lastIndex) {
          currentTextPart.appendChild(this.rawStr)
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
  private insertNewLine(): void {
    const newLine = this.makeNewLine()
    const currentLine = this.rawStr.parentElement.parentElement
    const text = this.rawStr.parentElement
    const chars = [...text.children]
    const index = chars.indexOf(this.rawStr)
    const newChildren = chars.slice(index)
    const newText = newLine.getElementsByClassName('text')[0]
    for (const child of newChildren) {
      newText.appendChild(child)
    }
    this.lines.insertBefore(newLine, currentLine.nextSibling)
    const indent = text.previousSibling
    for (const child of indent.childNodes) {
      this.indent()
    }

    this.drawCursor()
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
    // lineにindent部とtext部を追加
    const indent = document.createElement('span')
    indent.className = 'indent'
    const text = document.createElement('span')
    text.className = 'text'
    newLine.appendChild(indent)
    newLine.appendChild(text)
    return newLine
  }

  /** クリックされた位置にspan.rawStrを挿入し、カーソルの移動位置が文字の上に重ならないように配置する */
  private insertRawStr(e): void {
    const clickedElem = this.shadow.elementFromPoint(e.x, e.y)
    const objL: number = clickedElem.getBoundingClientRect().left
    const objR: number = clickedElem.getBoundingClientRect().right
    if (clickedElem.className === 'char') {
      const diffL = e.x - objL
      const diffR = objR - e.x
      if (diffR <= diffL) {
        clickedElem.parentNode.insertBefore(this.rawStr, clickedElem.nextSibling) // rawStrを追加
      } else {
        clickedElem.parentNode.insertBefore(this.rawStr, clickedElem) // rawStrを追加
      }
    } else if (clickedElem.className === 'indent') {
      const text = clickedElem.nextSibling
      text.insertBefore(this.rawStr, text.firstChild)
    } else if (clickedElem.className === 'line') {
      const text = clickedElem.getElementsByClassName('text')[0]
      text.appendChild(this.rawStr) // rawStrを挿入
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
