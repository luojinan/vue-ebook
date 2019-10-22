<template>
  <div class="ebook-reader">
    <div id="reader"></div>
    <div class="ebook-mask">
      <div class="ebook-mask_left" @click="prePage"></div>
      <div class="ebook-mask_center" @click="showControl"></div>
      <div class="ebook-mask_right" @click="nextPage"></div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
export default {
  data() {
    return {
      rendition: '',
      isShowControl: false
    }
  },
  methods: {
    // 点击中间蒙板，显示隐藏上下控制栏，带动画效果
    showControl() {
      console.log('点击显示上下控制栏');
      this.isShowControl = !this.isShowControl
    },
    // 点击左边蒙板，触发ebook类的上一页方法
    prePage() {
      console.log('上一页');
      if (this.rendition) {
        this.rendition.prev()
        this.isShowControl && (this.isShowControl = false)
      }
    },
    // 点击左边蒙板，触发ebook类的下一页方法
    nextPage() {
      console.log('下一页');
      if (this.rendition) {
        this.rendition.next()
        this.isShowControl && (this.isShowControl = false)
      }
    },
    initEpub(bookName) {
      const url = `http://localhost:8084/${bookName}.epub`
      const book = new Epub(url)
      this.rendition = book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      })
      // 把生成的dom渲染进页面
      this.rendition.display()
    }
  },
  mounted() {
    const bookName = this.$route.params.filename.split('|').join('/')
    console.log(bookName)
    this.initEpub(bookName)
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/global.scss";
.ebook-reader {
}
</style>