<template>
  <div class="toc-content_wrapper">
    <!-- 头部搜索部分 -->
    <div class="toc-content_serach">
      <span class="icon-menu" />
      <input type="text" :placeholder="$t('book.searchHint')" @click="showCancel=true">
      <p v-show="showCancel" @click="showCancel=false">{{$t('book.cancel')}}</p>
    </div>
    <!-- 头部图书信息卡片 -->
    <div class="toc-content_bookinfo">
      <div class="toc-content_bookinfo--left">
        <img :src="cover" alt="">
        <div class="bookinfo-left_wrapper">
          <h3>{{metadata.title}}</h3>
          <p>{{metadata.creator}}</p>
        </div>
      </div>
      <div class="toc-content_bookinfo--right">
        <p>11%{{$t('book.haveRead2')}}</p>
        <p>{{initReadTime()}}</p>
      </div>
    </div>
    <!-- 目录列表部分 -->
    <div
      class="toc-content_item"
      :class="{'selected':section===index+1}"
      :style="item.level?tocItemStyle(item):null"
      v-for="(item,index) in navigation"
      :key="index"
      @click="toPage(item)"
    >
      <span>{{item.label}}</span>
    </div>
  </div>
</template>
<script>
import { ebookMixin } from '@/utils/mixin.js'
import {getReadTime} from '@/utils/myStorage.js'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      showCancel:false
    }
  },
  methods: {
    // 缩进方法
    tocItemStyle(item){
      return {paddingLeft:`${(item.level*15)+20}px`}
    },
    initReadTime(){
      return this.$t('book.haveRead').replace('$1',this.readTimeToMinute())
    },
    // 本地缓存时间秒转为分钟
    readTimeToMinute(){
      const readTime = getReadTime(this.fileName)
      if(!readTime) return 0
      else return Math.ceil(readTime/60)
    },
    // 跳转到目录页
    toPage(item){
      this.setSettingVisible(null)
      this.currentBook.rendition.display(item.href).then(() => {
        // 刷新进度显示
        this.refreshLocation()
      });
    }
  },
  created () {
    console.log('触发组件创建，并刷新阅读时间');
    this.initReadTime()
  }
}
</script>
<style lang="scss" scoped>
@import "./EbookSlideContent.scss";
</style>