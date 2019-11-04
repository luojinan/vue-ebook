<template>
<transition name="popup-slide-up">
  <div class="setter-popup_list" v-show="fontFamilyVisible">
    <div class="setter-popup_title">
      <div class="setter-popup_title--icon" @click="closeFontFamilyPopup">
        <span class="icon-back icon"></span>
      </div>
      <p>选择字体</p>
    </div>
    <div class="setter-popup_list--wrapper">

    </div>
  </div>
</transition>
</template>
<script>
import {ebookMixin} from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  methods: {
    closeFontFamilyPopup(){
      this.setFontFamilyVisible(false)
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
    p{

    }
  }
  .setter-popup_list--wrapper{

  }
}
</style>