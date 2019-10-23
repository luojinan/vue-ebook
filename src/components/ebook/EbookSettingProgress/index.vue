<template>
  <!-- 设置进度部分 -->
  <div class="setter-progress">
    <div class="setter-progress_wrapper" v-if="bookAvailable">
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
      {{progress+'%'}}
    </div>
    <p v-else>加载中...</p>
  </div>
</template>
<script>
import {ebookMixin} from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  methods: {
    // 拖动进度条时触发的事件
    progressChange(e){
      // js动态修改dom的样式
      this.$refs.progress.style.backgroundSize = `${e.target.value}% 100%`
    },
    // ？？？有没松开进度条才触发的事件
    progressInput(e){
      const progress = e.target.value
      this.setProgress(progress)  //修改底部操作栏样式
      const precentage = progress/100 // 转换为0.xx
      const locationPage = precentage>0?this.currentBook.locations.cfiFromPercentage(precentage):0  // 某进度dom对象
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
    padding-top: px2rem(10);
  }
  .setter-progress_wrapper {
    width: 100%;
    height: 100%;
    @include center;
    padding: 0 px2rem(30);
    box-sizing: border-box;
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
</style>