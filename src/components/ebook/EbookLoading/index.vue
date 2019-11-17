<template>
  <div class="ebook-loading">
    <div class="ebook-loading_wrapp">
      <div class="ebook-loading_left-right" v-for="(innerList,index1) in lines" :key="index1">
        <div class="ebook-loading_item" v-for="(item,index) in innerList" :key="index"></div>
      </div>
      <div class="ebook-loading_center"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lines: [[1, 1, 1], [2, 2, 2]]
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";
.ebook-loading {
  position: relative;
  width: px2rem(63);
  height: px2rem(40);
  border: px2rem(1.5) solid #d7d7d7;
  border-radius: px2rem(3);
  .ebook-loading_wrapp{
    display: flex;
    height: 100%;
    width: 100%;
    .ebook-loading_left-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 px2rem(7);
      .ebook-loading_item{
        height: px2rem(2);
        width: px2rem(18);
        background-color: #d7d7d7;
      }
    }
    .ebook-loading_center{
      position: absolute;
      left: 50%;  //左右居中
      top: 0;
      height: 100%;
      width: px2rem(1.5);
      background-color: #d7d7d7;
    }
  }
}
</style>