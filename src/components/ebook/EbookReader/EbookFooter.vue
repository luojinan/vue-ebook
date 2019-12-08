<template>
  <div class="ebook-footer">
    <p>{{progress?`${progress}%`:'加载中...%'}}</p>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin]
}
</script>

<style lang="scss" scoped>
@import '../../../scss/global.scss';
.ebook-footer{
  position: absolute;
  bottom: 0;
  right: 0;
  z-index:100;
  height: px2rem(28);
  padding: 0 px2rem(15);
  overflow: hidden;
  p{
    font-size: px2rem(12);
    color: #6d7178;
  }
}
</style>