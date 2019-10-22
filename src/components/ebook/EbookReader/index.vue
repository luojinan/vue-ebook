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
import { ebookMixin } from '@/utils/mixin.js'
import Epub from 'epubjs'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      rendition: ''
    }
  },
  methods: {
    // 点击中间蒙板，显示隐藏上下控制栏，带动画效果
    showControl() {
      console.log('点击显示上下控制栏');
      this.setMenuVisible(!this.menuVisible)
    },
    // 点击左边蒙板，触发ebook类的上一页方法
    prePage() {
      console.log('上一页');
      if (this.rendition) {
        this.rendition.prev()
        this.menuVisible && (this.setMenuVisible(false))
      }
    },
    // 点击左边蒙板，触发ebook类的下一页方法
    nextPage() {
      console.log('下一页');
      if (this.rendition) {
        this.rendition.next()
        this.menuVisible && (this.setMenuVisible(false))
      }
    },
    initEpub() {
      const url = `http://localhost:8084/${this.fileName}.epub`
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
    this.setFileName(bookName)
    this.initEpub()
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/global.scss";
.ebook-reader {
  position: relative;
  .ebook-mask {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .ebook-mask_left {
      flex: 0 0 px2rem(100);
    }
    .ebook-mask_center {
      flex: 1;
    }
    .ebook-mask_right {
      flex: 0 0 px2rem(100);
    }
  }
}
</style>