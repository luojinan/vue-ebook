<template>
  <!-- 设置进度部分 -->
  <div class="setter-progress">
    <p v-if="bookAvailable">章节名</p>
    <div class="setter-progress_wrapper" v-if="bookAvailable">
      <div class="icon-back icon" @click="preChapter"></div>
      <div class="progress_input">
        <input
          type="range"
          max="100"
          min="0"
          step="1"
          @change="progressChange"
          @input="progressInput"
          :value="progress"
          :disabled="!bookAvailable"
          ref="progress"
        />
        <p>{{`${chapterName}(${progress}%)`}}</p>
      </div>
      <p class="icon-go" @click="nextChapter">></p>
    </div>
    <p v-else>加载中...</p>
  </div>
</template>
<script>
import { ebookMixin } from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  computed: {
    chapterName() {
      if (this.section) {
        const sectionObj = this.currentBook.section(this.section)
        if (sectionObj && sectionObj.href) {
          // 通过章节href获取目录，获取当前章节名
          return this.currentBook.navigation.get(sectionObj.href).label
        }
      }
      return ''
    }
  },
  methods: {
    preChapter() {
      if (this.bookAvailable && this.section > 0) {
        this.setSection(this.section - 1)  // 存入vuex
        this.displaySection()
      }
    },
    nextChapter() {
      if (this.bookAvailable && this.section < this.currentBook.spine.length - 1) {
        this.setSection(this.section + 1)  // 存入vuex
        this.displaySection()
      }
    },
    displaySection() {
      const sectionObj = this.currentBook.section(this.section) // 传入数字获取epub章节对象
      if (sectionObj && sectionObj.href) {
        this.currentBook.rendition.display(sectionObj.href).then(() => {
          // 刷新进度显示
          this.refreshLocation()
        })
        console.log('要切换到第几章节', this.section)
      }
    },
    // 拖动进度条时触发的事件
    progressChange(e) {
      // js动态修改dom的样式
      this.$refs.progress.style.backgroundSize = `${e.target.value}% 100%`
    },
    // ？？？有没松开进度条才触发的事件
    progressInput(e) {
      const progress = e.target.value
      this.setProgress(progress)  //修改底部操作栏样式
      const precentage = progress / 100 // 转换为0.xx
      const locationPage = precentage > 0 ? this.currentBook.locations.cfiFromPercentage(precentage) : 0  // 某进度dom对象
      this.currentBook.rendition.display(locationPage)  // 重新渲染dom对象
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";
// 进度设置内容部分
.setter-progress {
  position: relative;
  width: 100%;
  height: 100%;
  p {
    text-align: center;
    font-size: px2rem(12);
    padding-top: px2rem(10);
  }
  .setter-progress_wrapper {
    width: 100%;
    @include center;
    .icon-back {
      flex: 0 0 px2rem(30);
      font-size: px2rem(14);
      margin-top: px2rem(-12);
    }
    .icon-go {
      flex: 0 0 px2rem(30);
      font-size: px2rem(20);
      padding-top: 0;
      margin-top: px2rem(-16);
    }
    .progress_input {
      flex: 1;
      input {
        width: 100%;
        height: px2rem(2);
        -webkit-appearance: none; // 覆盖默认样式
        background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        background-size: 0 100%; // 占比一定要在最后面，否则颜色无效
        &:focus {
          outline: none;
        }
        // 进度值手柄
        &::-webkit-slider-thumb {
          -webkit-appearance: none; // 覆盖默认样式（缺一不可）
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
  }
}
</style>