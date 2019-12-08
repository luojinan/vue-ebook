import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
// json转js对象
function loadLocaleMessages () {
  // 👇返回一个：所有文件在一个函数里(是个require函数)
  // 后面可以跟require.context(文件夹,正则)(文件)得到里面的值json被转为js对象？
  const locales = require.context('./', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  // 函数的keys()返回文件名数组
  console.log('文件名数组',locales.keys())  
  locales.keys().forEach(key => {
    console.log('key',key)  // './cn.json'
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)  // match匹配出xx,会分割成数组
    console.log('fileName Array',matched) // ['cn','cn']
    if (matched && matched.length > 1) {
      const locale = matched[1] // 文件名 'cn'
      messages[locale] = locales(key)
      console.log('locales函数(传入路径key)',locales(key))
    }
  })
  return messages
}

export default new VueI18n({
  locale: 'cn',
  messages: loadLocaleMessages()
})
