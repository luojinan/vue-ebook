<template>
  <!-- 设置主题颜色部分 -->
  <div class="ebook-footer_theme">
    <div
      class="ebook-footer_theme--item"
      v-for="(item,index) in themeList"
      :key="index"
      @click="setTheme(index)"
    >
      <div
        class="theme-item_preview"
        :class="{'no-border':item.style.body.background!='#fff'}"
        :style="{'background':item.style.body.background}"
      ></div>
      <p :class="{'selected-theme':defaultTheme==index}">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
import {ebookMixin} from '@/utils/mixin.js'
import {ThemeList} from '@/utils/config.js'
export default {
  mixins: [ebookMixin],
  data(){
    return {
      themeList:ThemeList
    }
  },
  methods: {
    setTheme(index){
      console.log('选中的主题',this.themeList[index]);
      this.setDefaultTheme(index)
      this.currentBook.rendition.themes.select(this.themeList[index].name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/global.scss";
// 主题设置内容部分
.ebook-footer_theme {
  display: flex;
  height: 100%;
  .ebook-footer_theme--item {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: px2rem(5);
    box-sizing: border-box;
    .theme-item_preview {
      flex: 1;
      border: px2rem(1) solid #ccc;
      box-sizing: border-box;
      &.no-border {
        border: none;
      }
    }
    p {
      flex: 0 0 px2rem(18);
      font-size: px2rem(14);
      text-align: center;
      line-height: px2rem(18);
      color: #ccc;
      &.selected-theme {
        color: #333;
      }
    }
  }
}
</style>