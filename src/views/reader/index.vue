<template>
  <div class="ebook">
    电子书阅读器页面
    <p>测试scss</p>
    <ebook-reader></ebook-reader>
  </div>
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader'

export default {
  components:{
    EbookReader
  }  
}
</script>
<style lang="scss" scoped>
.ebook {
  p{
    color: red;
  }
}
</style>