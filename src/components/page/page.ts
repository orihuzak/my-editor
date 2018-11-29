const style = require('./style.css')
import $ from 'dom-control'

export default function createPage() {
  const page = $.makeEl('div')
  page.className = 'page'
  return page
}