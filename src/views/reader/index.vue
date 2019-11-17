<template>
  <div class="ebook" ref="ebook">
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
  watch:{
    offsetY(val){
      if(val>0) this.moveDown(val)
      else if(val==0) this.moveBack()
    }
  },
  methods: {
    moveDown(val){
      this.$refs.ebook.style.top = `${val}px`
    },
    moveBack(){
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all .2s linear'
      setTimeout(()=>{
        this.$refs.ebook.style.transition=''
      },200)
    },
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
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>