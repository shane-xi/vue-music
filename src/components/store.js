const STORAGE_KEY = 'curd-data-vuejs'
export default {
  save(items) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  }
}