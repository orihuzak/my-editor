const css = require('./line.css').toString()

export default class Line extends HTMLElement {
  private value: string
  constructor() {
    super()
    this.innerText = ''
  }
  public addText(str: string): void {
    this.innerText += str
  }
  public getValue(): string {
    return this.innerText
  }

  public drawLine(): void {
    this.innerText = this.value
  }
}

customElements.define('my-line', Line)
