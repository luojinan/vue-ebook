function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/fonts/themes/护眼.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/fonts/themes/金黄.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/fonts/themes/夜间.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/fonts/themes/默认.css`)
}

export function removeCss(href) {
  const link = document.getElementsByTagName('link')
  for (var i = link.length; i >= 0; i--) {
    if (link[i] && link[i].getAttribute('href') != null && link[i].getAttribute('href').indexOf(href) !== -1) {
      link[i].parentNode.removeChild(link[i])
    }
  }
}

export function addCss(href) {
  removeAllCss()
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  console.log(href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export default {
  addCss,
  removeCss
}