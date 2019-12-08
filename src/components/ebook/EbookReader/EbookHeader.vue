<template>
  <div class="ebook-header">
    <p>{{chapterName}}</p>
  </div>
</template>

<script>
import { ebookMixin } from '@/utils/mixin.js'
export default {
  mixins: [ebookMixin],
  computed: {
    chapterName() {
      return this.section?this.navigation[this.section-1].label:this.section
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/global.scss';
.ebook-header{
  position: absolute;
  top: 0;
  left: 0;
  z-index:100;
  width: 100%;
  height: px2rem(28);
  padding: 0 px2rem(15);
  overflow: hidden;
  p{
    font-size: px2rem(12);
    color: #6d7178;
  }
}
</style>