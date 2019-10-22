<template>
  <div class="ebook">
    <ebook-header></ebook-header>
    <ebook-reader></ebook-reader>
    <ebook-footer></ebook-footer>
  </div>
</template>

<script>
import EbookHeader from '@/components/ebook/EbookHeader'
import EbookFooter from '@/components/ebook/EbookFooter'
import EbookReader from '@/components/ebook/EbookReader'

export default {
  components:{
    EbookHeader,
    EbookFooter,
    EbookReader
  }  
}
</script>
<style lang="scss" scoped>
.ebook {
}
</style>