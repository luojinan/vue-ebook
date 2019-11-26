<template>
  <div class="ebook-background">
    <div class="ebook-background_top" ref="ebookBackgroundTop">
      <div class="ebook-background_top--text">
        <span ref="iconDown">↓</span>
        <p>{{text}}</p>
      </div>
      <div class="ebook-background_top--icon" :style="isFixed?fixedStyle:{}">
        <icon-mark :color="color"></icon-mark>
      </div>
    </div>
    <div class="ebook-background_bottom">
      <p>{{$t('book.pullupToBack')}}</p>
    </div>
  </div>
</template>
<script>
import IconMark from '@/components/common/IconMark'
import { ebookMixin } from '@/utils/mixin.js'
import { getBookmark, saveBookmark } from '@/utils/myStorage.js'
export default {
  mixins: [ebookMixin],
  components: {
    IconMark
  },
  data() {
    return {
      color: this.isBookmark ? '#fff': '#346cbc',
      text: this.isBookmark?this.$t('book.pulldownDeleteMark'):this.$t('book.pulldownAddMark'),
      isFixed:false,
      fixedStyle:{
        position: 'fixed',
        top: 0
      }
    }
  },
  watch: {
    offsetY(val) {
      // 出现卡顿是因为val>这个值要转换好单位与原top的值相同
      if (val > 50 && val < 70) {
        // 1、处于超过icon高度，未到达添加书签高度的阶段
        this.$refs.ebookBackgroundTop.style.top = `${-val}px`
        let iconDown = this.$refs.iconDown.style.transform
        // 1).手指拖动不松手，由下往上回去(相当于取消下拉!=移除书签)
        if (iconDown === 'rotate(180deg)') {
          this.$refs.iconDown.style.transform = 'rotate(0)'
        }
        //当前页是书签页（移除书签）
        if(this.isBookmark){
          this.text = this.$t('book.pulldownDeleteMark') // '下拉移除'
          this.color = '#346cbc'
        }else{
          this.text = this.$t('book.pulldownAddMark') // '下拉移除'
          this.color = '#fff'
        }
      } else if (val >= 70) {
        this.$refs.ebookBackgroundTop.style.top = `${-val}px`
        // 2、到达添加书签的高度，添加成功样式
        this.$refs.iconDown.style.transform = 'rotate(180deg)' // ↓变为↑
        if(!this.isBookmark) {
          // 当前页面不是书签页（添加书签）
          this.color = '#346cbc'  // 书签颜色变蓝色
          this.text = this.$t('book.releaseAddMark') // '下拉添加'变为'释放添加'
          this.isFixed = true
        }else {
          // 当前页面已经是书签页（移除书签）
          this.color = '#fff'  // 书签颜色变蓝色
          this.text = this.$t('book.releaseDeleteMark') // '下拉添加'变为'释放添加'
          this.isFixed = false
        }
      } else if (val === 0) {
        // 3、松手页面复位到0时，存入vuex是否书签
        this.$refs.iconDown.style.transform = 'rotate(0)' // ↑复位为↓
        if(!this.isBookmark) this.setBookMark()
        else this.removeBookMark()
      }
    },
    // 当页面有书签时，样式进行改变
    isBookmark(val) {
      this.isFixed = val;
      // this.color = val ? BLUE : WHITE;
    }
  },
  methods:{
    // 存入书签(vuex、本地缓存)
    setBookMark(){
      // 获取当前cfi的同时，获取当前页面的文本内容
      const {start,end} = this.currentBook.rendition.currentLocation()
      const cfiBase = start.cfi.replace(/!.*/,"").replace("epubcfi(","")
      const cfiStart = start.cfi.replace(/.*!/, "").replace(/\)/, "")
      const cfiEnd = end.cfi.replace(/.*!/,"").replace(/\)/,"")
      // 用于获取当前页面文本内容的cfi字符串
      const cfiRangeString = `epubcfi(${cfiBase}!,${cfiStart},${cfiEnd})`
      let bookMarks = getBookmark(this.fileName) || []  // 本地缓存中的书签数组
      // console.log(cfiRangeString,'cfi字符串');
      console.log('存入缓存的cfi',start.cfi);
      // 获取当前页面的文本内容range
      this.currentBook.getRange(cfiRangeString).then(range=>{
        console.log(range,'获取页面文本内容');
        bookMarks.push({
          cfi: start.cfi,
          text: range.toString().replace(/\s\s/,"")
        })
        this.setIsBookMark(true)  // 存入vuex（只当前页书签标志符，不需要数组）
        saveBookmark(this.fileName, bookMarks)  // 本地缓存中的书签数组
      })
    },
    // 移除书签（vuex、本地缓存）
    removeBookMark(){
      const {start} = this.currentBook.rendition.currentLocation()
      let bookMarks = getBookmark(this.fileName) || []  // 本地缓存中的书签数组

      // 移除当前书签对象后的书签数组
      const newArr = bookMarks.filter(item=>{
        return item.cfi !== start.cfi
      })

      this.setIsBookMark(false)  // 存入vuex（只当前页书签标志符，不需要数组）
      saveBookmark(this.fileName, newArr) // 存入本地缓存
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";
.ebook-background {
  .ebook-background_top {
    position: absolute;
    top: px2rem(-50);
    height: px2rem(50);
    left: 0;
    width: 100%;
    z-index: 200;
    .ebook-background_top--text {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      color: #fff;
      span {
        display: block;
        font-size: px2rem(18);
        margin-right: px2rem(4);
        transition: all 0.2s linear;
      }
    }
    .ebook-background_top--icon {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }
  .ebook-background_bottom {
    position: absolute;
    bottom: px2rem(-40);
    height: px2rem(40);
    left: 0;
    width: 100%;
    z-index: 200;
    text-align: center;
    line-height: px2rem(40);
    color: #fff;
  }
}
</style>