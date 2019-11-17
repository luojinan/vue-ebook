<template>
<div class="ebook-slide">
  <transition name="slide-right">
    <div class="toc-content">
      <!-- <p v-if="!bookAvailable">加载中...</p> -->
      <!-- 动态组件 -->
      <component v-if="false" :is="currentTab===1?toc:bookmark"></component>
      <!-- 目录加载中状态 -->
      <ebook-loading v-else></ebook-loading>
      
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
import EbookLoading from '../EbookLoading/index'
import { ebookMixin } from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  components:{
    EbookSlideContent,
    EbookLoading
  },
  props:{
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
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>