import Storage from './StorageClass'
const myStorage = new Storage

// 多本电子书，需要操作一下数据结构xxxBook:{font:{}}
export function setBookStorage(fileName,key,value){
  // 先判断是否已有该书本地缓存对象
  let book = myStorage.get(`${fileName}Book`)
  if(!book) book = {}
  book[key] = value
  myStorage.set(`${fileName}Book`,book)
}
// 先判断是否已有该书本地缓存对象，再去取书的设置值
export function getBookStorage(fileName,key){
  let book = myStorage.get(`${fileName}Book`)
  if(book) return book[key]
  else return null
}
/************************************************/
export function getFontFamily(fileName){
  // 获取指定电子书的值
  return getBookStorage(fileName,'fontFamily')
}
export function setFontFamily(fileName,font){
  console.log(fileName);
  return setBookStorage(fileName,'fontFamily',font)
}
export function getTheme(fileName) {
  return getBookStorage(fileName, 'theme')
}

export function saveTheme(fileName, theme) {
  setBookStorage(fileName, 'theme', theme)
}

export function getFontSize(fileName) {
  return getBookStorage(fileName, 'fontSize')
}

export function saveFontSize(fileName, fontSize) {
  setBookStorage(fileName, 'fontSize', fontSize)
}
// export function getLocale() {
//   return getLocalStorage('locale')
// }

// export function saveLocale(locale) {
//   return setLocalStorage('locale', locale)
// }

export function getLocation(fileName) {
  return getBookStorage(fileName, 'location')
}

export function saveLocation(fileName, location) {
  setBookStorage(fileName, 'location', location)
}

export function getBookmark(fileName) {
  return getBookStorage(fileName, 'bookmark')
}

export function saveBookmark(fileName, bookmark) {
  setBookStorage(fileName, 'bookmark', bookmark)
}

export function getReadTime(fileName) {
  return getBookStorage(fileName, 'time')
}

export function saveReadTime(fileName, theme) {
  setBookStorage(fileName, 'time', theme)
}

export function getProgress(fileName) {
  return getBookStorage(fileName, 'progress')
}

export function saveProgress(fileName, progress) {
  setBookStorage(fileName, 'progress', progress)
}

export function getNavigation(fileName) {
  return getBookStorage(fileName, 'navigation')
}

export function saveNavigation(fileName, navigation) {
  setBookStorage(fileName, 'navigation', navigation)
}

export function getMetadata(fileName) {
  return getBookStorage(fileName, 'metadata')
}

export function saveMetadata(fileName, metadata) {
  setBookStorage(fileName, 'metadata', metadata)
}

export function getCover(fileName) {
  return getBookStorage(fileName, 'cover')
}

export function saveCover(fileName, cover) {
  setBookStorage(fileName, 'cover', cover)
}
export default {
  setBookStorage, // 保存单本电子书对象
  getBookStorage, // 获取单本电子书对象
  getFontFamily,
  setFontFamily,
  getTheme,
  saveTheme,
  getFontSize,
  saveFontSize,
  getLocation,
  saveLocation,
  saveBookmark,
  getBookmark,
  getReadTime,
  saveReadTime,
  getProgress,
  saveProgress,
  getNavigation,
  saveNavigation,
  getMetadata,
  saveMetadata,
  getCover,
  saveCover
}