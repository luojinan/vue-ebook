// px转rem 单位带rem
export function px2rem(px) {
  const ratio = 375 / 10
  return px / ratio   // px * (10 / 375) 
}

// px转为自适应px 单位带px
export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth;
  return px * (maxWidth / 375);
}

export default {
  px2rem,
  realPx
}