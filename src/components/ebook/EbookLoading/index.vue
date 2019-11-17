<template>
  <div class="ebook-loading">
    <div class="ebook-loading_wrapp">
      <div class="ebook-loading_left-right" v-for="(innerList,index1) in lines" :key="index1">
        <div class="ebook-loading_item" v-for="(item,index) in innerList" :key="index">
          <div class="ebook-loading_item--line" ref="line"></div>
          <div class="ebook-loading_item--mask" ref="mask"></div>
        </div>
      </div>
      <div class="ebook-loading_center"></div>
    </div>
  </div>
</template>
<script>
import {px2rem} from '@/utils/utils.js'
export default {
  data() {
    return {
      lines: [[1, 1, 1], [2, 2, 2]],
      maskLineWidth:[0,0,0,0,0,0],
      lineWidth:[16,16,16,16,16,16],
      turnBack:false  // 转向
    }
  },
  mounted(){
    this.task = setInterval(() => {
      this.$refs.mask.forEach((maskDom,index)=>{
        // 每个500毫秒，line、mask长度变化
        const lineDom = this.$refs.line[index]
        // 先让第一个动画动
        if(index===0){
          if(!this.turnBack&&this.maskLineWidth[index]<=16){
            this.maskLineWidth[index]++
            this.lineWidth[index]--
          }else if(this.turnBack&&this.lineWidth[index]<=16){
            this.maskLineWidth[index]--
            this.lineWidth[index]++
          }
        }else{
          if(!this.turnBack&&this.maskLineWidth[index]<=16){
            // 当上一个蒙板大于8的时候，再开始动自己index的蒙板线
            if(this.maskLineWidth[index-1]>=8){
              this.maskLineWidth[index]++
              this.lineWidth[index]--
            }
          }else if(this.turnBack&&this.lineWidth[index]<=16){
            if(this.lineWidth[index-1]>=8){
              this.maskLineWidth[index]--
              this.lineWidth[index]++
            }
          }
        }
        maskDom.style.width=`${px2rem(this.maskLineWidth[index])}rem`
        lineDom.style.width=`${px2rem(this.lineWidth[index])}rem`
        if(this.maskLineWidth[index]===16) this.turnBack = true
        if(this.maskLineWidth[index]===0) this.turnBack = false
      })
    }, 20);
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
      padding: px2rem(7);
      .ebook-loading_item{
        flex: 1;
        display: flex;
        .ebook-loading_item--line{
          height: px2rem(2);
          width: px2rem(18);
          background-color: #d7d7d7;
        }
        .ebook-loading_item--mask{
          height: px2rem(2);
          width: 0;
        }
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