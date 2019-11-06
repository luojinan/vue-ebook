<template>
<transition name="popup-slide-up">
  <div class="setter-popup_list" v-show="fontFamilyVisible">
    <div class="setter-popup_title">
      <div class="setter-popup_title--icon" @click="closeFontFamilyPopup">
        <span class="icon-back icon"></span>
      </div>
      <p>{{$t('book.selectFont')}}</p>
    </div>
    <div class="setter-popup_list--wrapper">
      <div 
        class="setter-popup_list--item" 
        v-for="(item,index) in fontFamilyList" 
        :key="index"
        @click="selectedFontFamily(item)">
        <p :class="{'selected':defaultFontFamily==item}">{{item}}</p>
        <p class="selected" v-if="defaultFontFamily==item">✔</p>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import {ebookMixin} from '@/utils/mixin.js'
import {setFontFamily} from '@/utils/myStorage.js'
import {fontFamilyList} from '@/utils/config.js'
export default {
  mixins: [ebookMixin],
  data(){
    return {
      fontFamilyList
    }
  },
  methods: {
    closeFontFamilyPopup(){
      this.setFontFamilyVisible(false)
    },
    selectedFontFamily(item){
      this.setFDefaultFontFamily(item)  // 存入vuex
      setFontFamily(this.fileName,item) // 存入本地缓存
      this.currentBook.rendition.themes.font(item)
    }
  },
  created () {
    console.log(this.fontFamilyVisible,'vuex')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/global.scss';
.setter-popup_list{
  position:fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 300;
  background-color: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .1);
  .setter-popup_title{
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: 1px solid #b8b9bb;
    text-align: center;
    .setter-popup_title--icon{
      position: absolute;
      top: 0;
      left: px2rem(15);
      height: 100%;
      @include center;
    }
  }
  .setter-popup_list--wrapper{
    .setter-popup_list--item{
      display: flex;
      justify-content: space-between;
      padding: px2rem(15);
      .selected{
        color: #346cb9;
        font-weight: bold;
      }
    }
  }
}
</style>