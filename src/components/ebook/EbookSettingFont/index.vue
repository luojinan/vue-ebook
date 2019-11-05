<template>
  <div class="setting-font">
    <!-- 设置字号大小部分 -->
    <div class="setter-fontsize">
      <!-- 左边最小字号预览 -->
      <div class="setter-fontsize_preview" :style="{fontSize:`${fontSizeList[0]}px`}">A</div>
      <!-- 中间线条选择字号 -->
      <div class="setter-fontsize_for--firstchild">
        <div class="setter-fonsize_select" v-for="(item,index) in fontSizeList" :key="index">
          <!-- 每一段为 ' —O— ' -->
          <div class="setter-fontsize_selected--warapper">
            <!-- 左横线 -->
            <div class="selected-line"></div>
            <!-- 竖线部分 -->
            <div class="selected-point_wrapper" @click="setFontSize(item)">
              <!-- 圆形部分 -->
              <div class="selected-point" v-show="defaultFontSize==item">
                <div class="selected-point_brackpoint"></div>
              </div>
            </div>
            <!-- 右横线 -->
            <div class="selected-line"></div>
          </div>
        </div>
      </div>
      <!-- 右边最大字号预览 -->
      <div
        class="setter-fontsize_preview"
        :style="{fontSize:`${fontSizeList[fontSizeList.length-1]}px`}"
      >A</div>
    </div>
    <div class="setter-fontfamily" @click="showFontFamilyPopup">
      {{defaultFontFamily}}
    </div>
  </div>
</template>

<script>
import {ebookMixin} from '@/utils/mixin.js'
import {saveFontSize} from '@/utils/myStorage.js'
export default {
  mixins: [ebookMixin],
  data(){
    return {
      fontSizeList:[14,16,18,20,22,24]
    }
  },
  methods:{
    // 选中字号
    setFontSize(fontSize){
      this.setDefaultFontSize(fontSize) // 存入vuex
      saveFontSize(this.fileName,fontSize)  // 存入本地缓存
      this.currentBook.rendition.themes.fontSize(`${fontSize}px`)
    },
    showFontFamilyPopup(){
      console.log('点击选择字体')
      this.setFontFamilyVisible(true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";
.setting-font {
  height: 100%;
  display: flex;
  flex-direction: column;
  .setter-fontsize {
    flex: 2;
    display: flex;
    // 字号选择，左右A预览部分
    .setter-fontsize_preview {
      flex: 0 0 px2rem(40);
      @include center;
    }
    .setter-fontsize_for--firstchild {
      flex: 1;
      display: flex;
      .setter-fonsize_select {
        flex: 1;
        display: flex;
        &:first-child {
          .selected-line {
            &:first-child {
              // background-color: red;
              border: none;
            }
          }
        }
        &:last-child {
          .selected-line {
            &:last-child {
              // background-color: red;
              border: none;
            }
          }
        }
        .setter-fontsize_selected--warapper {
          flex: 1;
          display: flex;
          align-items: center;
          // 字号选择横线样式
          .selected-line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          // 字号选择竖线样式
          .selected-point_wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            // 字号选择圆形样式
            .selected-point {
              position: absolute;
              top: px2rem(-7);
              left: px2rem(-10);
              width: px2rem(18);
              height: px2rem(18);
              border-radius: 50%;
              background-color: #fff;
              border: px2rem(1) solid #ccc;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
              @include center;
              .selected-point_brackpoint {
                width: px2rem(5);
                height: px2rem(5);
                background-color: #000;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
  .setter-fontfamily{
    flex: 1;
    @include center;
  }
}
</style>