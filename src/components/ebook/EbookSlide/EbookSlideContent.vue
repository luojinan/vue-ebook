<template>
  <div class="toc-content_wrapper">
    <!-- 头部搜索部分 -->
    <div class="toc-content_serach">
      <span class="icon-menu" />
      <input type="text" :placeholder="$t('book.searchHint')" @click="showCancel=true">
      <p v-show="showCancel" @click="showCancel=false">{{$t('book.cancel')}}</p>
    </div>
    <!-- 头部图书信息卡片 -->
    <!-- <div
      class="toc-content_item"
      v-for="(item,index) in navigation.toc"
      :key="index"
      @click="toPage(item)"
    >
      <span>{{item.label}}</span>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCancel:false
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";

.toc-content_wrapper {
  width: 100%;
  height: 100%;
  overflow: auto; // 超出部分加滚动条
  .toc-content_serach{
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding-right: px2rem(15);
    box-sizing: border-box;
    .icon-menu{
      flex: 0 0 px2rem(28);
      @include center;
    }
    input{
      height: px2rem(24);
      flex: 1;
      align-self: center;
      background: transparent;
      border: px2rem(1) solid #ccc;
    }
    p{
      flex: 0 0 px2rem(50);
      font-size: px2rem(12);
      @include center;
    }
  }
  .toc-content_item {
    border-bottom: px2rem(1) solid #f4f4f4;
    padding: px2rem(20) px2rem(20);

    span {
      font-size: px2rem(14);
      color: #333;
    }
  }

  p {
    @include center;
    font-size: px2rem(16);
    color: #333;
  }
}
</style>