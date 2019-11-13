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
import {getReadTime,saveReadTime} from '@/utils/myStorage.js'

export default {
  mixins: [ebookMixin],
  components:{
    EbookHeader,
    EbookFooter,
    EbookReader
  },
  data(){
    return {
      readTimer:null
    }
  },
  methods: {
    readTimerFn(){
      let time = getReadTime(this.fileName) // 本地缓存中获取阅读时间
      if(!time) time = 0  // 当本地缓存没有时间，重置为0开始计算
      this.readTimer = setInterval(()=>{
        time ++
        if(time%30===0) saveReadTime(this.fileName,time) // 30秒才把阅读时间存入本地缓存
      },1000)
    }
  },
  mounted(){
    this.readTimerFn()  // 开启计时
  },
  beforeDestroy(){
    if(this.readTimer) clearInterval(this.readTimer)  // 清除定时器
  }
}
</script>
<style lang="scss" scoped>
.ebook {
}
</style>