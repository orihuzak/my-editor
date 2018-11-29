
export default {
  id(id: string) {
    return document.getElementById(id)
  },
  makeEl(name: string) {
    return document.createElement(name)
  },
}