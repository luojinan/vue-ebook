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
export default {
  mixins: [ebookMixin],
  components: {
    IconMark
  },
  computed:{
    fixedStyle(){
      return {
         position: 'fixed',
         top: 0
      }
    }
  },
  data() {
    return {
      color: '#fff',
      text: this.isBookmark?this.$t('book.pulldownDeleteMark'):this.$t('book.pulldownAddMark'),
      isFixed:false
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
        if(!this.isBookmark) {
          // 当前页面不是书签页（添加书签）
          this.color = '#346cbc'  // 书签颜色变蓝色
          this.$refs.iconDown.style.transform = 'rotate(180deg)' // ↓变为↑
          this.text = this.$t('book.releaseAddMark') // '下拉添加'变为'释放添加'
          this.isFixed = true
        }
        else {
          // 当前页面已经是书签页（移除书签）
          this.color = '#fff'  // 书签颜色变蓝色
          this.$refs.iconDown.style.transform = 'rotate(180deg)' // ↓变为↑
          this.text = this.$t('book.releaseDeleteMark') // '下拉添加'变为'释放添加'
          this.isFixed = false
        }
      } else if (val === 0) {
          this.$refs.iconDown.style.transform = 'rotate(0)' // ↑复位为↓
          if(!this.isBookmark) this.setIsBookMark(true)
          else this.setIsBookMark(false)
      }
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