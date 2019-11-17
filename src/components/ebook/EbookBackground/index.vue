<template>
  <div class="ebook-background">
    <div class="ebook-background_text">
      <span>↓</span>
      <p>{{text}}</p>
    </div>
    <div class="ebook-background_icon">
      <icon-mark></icon-mark>
    </div>
  </div>
</template>
<script>
import IconMark from '@/components/common/IconMark'
// import IconMark from '../../common/IconMark'
export default {
  components:{
    IconMark
  },
  data(){
    return {
      text: this.$t('book.pulldownAddMark')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";

.ebook-background{
  position: absolute;
  top: px2rem(-35);
  height: px2rem(35);
  left: 0;
  width: 100%;
  z-index: 200;
  .ebook-background_text{
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    color: #fff;
    span{
      display: block;
      font-size: px2rem(18);
      margin-right: px2rem(4);
      transition: all .2s linear;
    }
  }
  .ebook-background_icon{
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>