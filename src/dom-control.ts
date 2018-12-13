
export default {
  id(id: string) { return document.getElementById(id) },
  /**
   * createElementはHTMLElement型を返すのでinputとtextinputの時は型変換
   */
  makeEl(name: string): any {
    const result = document.createElement(name)
    if (name === ('input' || 'textarea')) {
      return (<HTMLInputElement> result)
    } else { return result }
  },
}
