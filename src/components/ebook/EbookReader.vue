<template>
  <div class="ebook-reader">
    <div id="reader"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
export default {
  data() {
    return {
      rendition:''
    }
  },
  methods: {
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
.ebook-reader {
  p {
    color: green;
  }
}
</style>