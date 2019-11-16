<template>
  <div class="toc-content_wrapper">
    <!-- 头部搜索部分 -->
    <div class="toc-content_serach">
      <span class="icon-menu" />
      <input 
        type="text" 
        :placeholder="$t('book.searchHint')" 
        v-model="searchText"
        @click="showCancel=true"
        @keyup.enter.exact="keyEnterFn()"
      >
      <p v-show="showCancel" @click="cancelSearch">{{$t('book.cancel')}}</p>
    </div>
    <!-- 搜索内容部分 -->
    <div class="search-list" v-show="showCancel">
      <p 
        class="search-list_item"
        v-for="(item,index) in searchList"
        :key="index" v-html="item.excerpt"></p>
    </div>
    <!-- 头部图书信息卡片 -->
    <div class="toc-content_bookinfo" v-show="!showCancel">
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
      v-show="!showCancel"
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
import { px2rem } from '@/utils/utils.js'
import {getReadTime} from '@/utils/myStorage.js'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      showCancel:false,
      searchText:'',
      searchList:null
    }
  },
  methods: {
    // 点击回车键
    keyEnterFn(){
      if (!this.searchText && !this.searchText.length) return
      console.log(this.searchText,'搜索文本');
      this.doSearch(this.searchText).then(res=>{
        // console.log('搜索到的列表，且转换为一维数组',res);
        this.searchList = res
        this.searchList.map(item => {
          item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
          return item
        })
      })
    },
    doSearch(searchText){
      console.log(searchText)
      // 使用epub的搜索功能，是promise事件
      // 且没有直接全文搜索的api，而是需要一章一章的搜索，因此需要遍历
      return Promise.all(
        // spine是章节列表，item是每个章节项
        this.currentBook.spine.spineItems.map(item=>{
          // 章节.load获取到章节内容对象，bind修正this指向
          // 获取到章节内容后即可使用章节.find这个api
          // 每一章搜索结束之后，有finally这个api去释放掉章节内容对象(庞大)
          return item.load(this.currentBook.load.bind(this.currentBook))
                      .then(item.find.bind(item,searchText))
                      .finally(item.unload.bind(item))
        })
      ).then(res=>{
        // 一章一章的搜索结果是二维数组，而展示需要的一维数组
        return Promise.resolve([].concat.apply([],res))
      })
    },
    cancelSearch(){
      this.searchText = ''
      this.showCancel = false
    },
    // 缩进方法
    tocItemStyle(item){
      return {paddingLeft:`${px2rem(item.level*15+20)}rem`}
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