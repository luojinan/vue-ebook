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


export default {
  setBookStorage, // 保存单本电子书对象
  getBookStorage, // 获取单本电子书对象
  getFontFamily,
  setFontFamily
}