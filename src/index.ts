import Page from './components/page/page'
const css = require('./style.css').toString()

function main() {
  const body = document.body
  const page = new Page()

  const style = document.createElement('style')
  style.textContent = css
  body.appendChild(style)

  body.appendChild(page)
}

main()
