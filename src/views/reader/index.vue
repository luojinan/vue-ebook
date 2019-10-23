<template>
  <div class="ebook">
    <ebook-header v-show="menuVisible"></ebook-header>
    <ebook-reader></ebook-reader>
    <ebook-footer :isShow="menuVisible"></ebook-footer>
  </div>
</template>

<script>
import EbookHeader from '@/components/ebook/EbookHeader'
import EbookFooter from '@/components/ebook/EbookFooter'
import EbookReader from '@/components/ebook/EbookReader'
import {ebookMixin} from '@/utils/mixin.js'

export default {
  mixins: [ebookMixin],
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