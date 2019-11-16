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
      <ebook-setting-progress v-if="settingVisible==2&&isShowSet"></ebook-setting-progress>
    </div>
  </transition>

  <ebook-setting-font-popup v-if="settingVisible==4"></ebook-setting-font-popup>

</div>
</template>
<script>
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSettingFontPopup from '@/components/ebook/EbookSettingFontPopup'
import EbookSettingTheme from '@/components/ebook/EbookSettingTheme'
import EbookSettingProgress from '@/components/ebook/EbookSettingProgress'
import {ebookMixin} from '@/utils/mixin.js'

export default {
  mixins: [ebookMixin],
  components:{
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress
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
    // 切换底部操作栏-同时显示相应设置部分
    showSet(type){
      if(!this.isShowSet) {
        this.setSettingVisible(type)
        this.isShowSet = true
        if(type==1) this.setMenuVisible(false)
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