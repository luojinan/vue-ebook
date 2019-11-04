<template>
<div class="ebook-footer_wrapper">
  <!-- 底部操作栏部分 -->
  <transition name="slide-up">
    <div class="ebook-footer" v-show="isShow" :class="{'hide-box-shadow':isShowSet||!isShow}">
      <div class="ebook-footer_icon"><span class="icon-menu icon" @click="showSet(1)"></span></div>
      <div class="ebook-footer_icon"><span class="icon-progress icon" @click="showSet(2)"></span></div>
      <div class="ebook-footer_icon"><span class="icon-bright icon" @click="showSet(3)"></span></div>
      <div class="ebook-footer_icon"><span class="icon-a icon" @click="showSet(4)">A</span></div>
    </div>
  </transition>
  <!-- 设置部分 -->
  <transition name="slide-up">
    <div class="ebook-footer_setter" v-show="isShowSet&&settingVisible != 1">
      <ebook-setting-font v-if="settingVisible==4"></ebook-setting-font>
      <ebook-setting-theme v-if="settingVisible==3"></ebook-setting-theme>
      <ebook-setting-progress v-if="settingVisible==2"></ebook-setting-progress>
    </div>
  </transition>
  <!-- 设置目录部分 -->
  <toc 
    v-if="isShowSet&&settingVisible==1"
    :navigation="navigation"
    :tocAvailable="bookAvailable"
    @toPage="toPage"
  ></toc>
  <transition name="fade">
    <div class="toc-mask" v-show="isShowSet&&settingVisible==1" @click="isShowSet = false"></div>
  </transition>

  <ebook-setting-font-popup v-if="settingVisible==4"></ebook-setting-font-popup>

</div>
</template>
<script>
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSettingFontPopup from '@/components/ebook/EbookSettingFontPopup'
import EbookSettingTheme from '@/components/ebook/EbookSettingTheme'
import EbookSettingProgress from '@/components/ebook/EbookSettingProgress'
import Toc from './Toc.vue'
import {ebookMixin} from '@/utils/mixin.js'

export default {
  mixins: [ebookMixin],
  components:{
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    Toc
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    themeList:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return {
      isShowSet:false,  // 设置部分(不是底部操作栏)的显示隐藏
    }
  },
  methods:{
    // 跳转到目录页
    toPage(item){
      this.setMenuVisible(false)
      this.currentBook.rendition.display(item.href).then(() => {
        this.updateProgress();
        // 利用then，只有输入进度改变页面，页面改变没有去获取新的进度
      });
    },
    updateProgress() {
      const curLocation = this.currentBook.rendition.currentLocation()  // 获取当前进度对象
      const percentage = this.bookAvailable // 确保而已，实际一定为true
        ? this.currentBook.locations.percentageFromCfi(curLocation.start.cfi) // 获取进度的具体比例%
        : 0;
      this.setProgress(Math.round(percentage * 100))   // 进度比例转化为数值
    },
    // 切换底部操作栏-同时显示相应设置部分
    showSet(type){
      if(!this.isShowSet) {
        this.setSettingVisible(type)
        this.isShowSet = true
        return
      }
      if(this.isShowSet&&(!this.settingVisible||this.settingVisible == type)) this.isShowSet = false
      this.setSettingVisible(type)
    }
  },
  watch:{
    // 监听页面显示隐藏底部操作
    isShow(newVal){
      if(!newVal) this.isShowSet = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/index';
</style>