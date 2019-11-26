<template>
  <div class="ebook-slide_mark">
    <h1>{{$t('book.bookmark')}}·{{bookmarkList?bookmarkList.length:0}}</h1>
    <div class="ebook-slide_mark--list">
      <div 
        class="ebook-slide_mark--item" 
        v-for="(item,index) in bookmarkList" 
        :key="index"
        @click="toBookMarkCfi(item.cfi)">
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin.js'
import { getBookmark } from '@/utils/myStorage.js'
export default {
  mixins: [ebookMixin],
  data(){
    return {
      bookmarkList: null
    }
  },
  methods: {
    // 跳转到书签页
    toBookMarkCfi(cfi){
      this.setSettingVisible(null)
      this.currentBook.rendition.display(cfi).then(() => {
        // 刷新进度显示
        this.refreshLocation()
      });
    }
  },
  created () {
    this.bookmarkList = getBookmark(this.fileName)
  }
}
</script>
<style lang="scss" scoped>
@import './EbookSlideMark.scss';
</style>