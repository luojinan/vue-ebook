<template>
<div class="ebook-slide">
  <transition name="slide-right">
    <div class="toc-content">
      <!-- <p v-if="!tocAvailable">加载中...</p> -->
      <!-- 动态组件 -->
      <component :is="currentTab===1?toc:bookmark"></component>
      <!-- 底部选项卡部分 -->
      <div class="toc-fotter">
        <p :class="{'selected':currentTab===1}" @click="currentTab=1">{{$t('book.navigation')}}</p>
        <p :class="{'selected':currentTab===2}" @click="currentTab=2">{{$t('book.bookmark')}}</p>
      </div>
    </div>
  </transition>
</div>
</template>
<script>
import EbookSlideContent from './EbookSlideContent.vue'
export default {
  components:{
    EbookSlideContent
  },
  props:{
    navigation:{
      type:Object,
      default:()=>{}
    },
    tocAvailable:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      currentTab:1,
      toc:EbookSlideContent,
      bookmark:null
    }
  },
  methods:{
    toPage(item){
      console.log('跳转到页面',item);
      this.$emit('toPage',item)
    }
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>