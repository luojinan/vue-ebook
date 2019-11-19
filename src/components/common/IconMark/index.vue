<template>
  <div class="icon-mark" :style="{'border-color':watcherColor}" ref="iconMark"></div>
</template>

<script>
import { px2rem } from '@/utils/utils.js'
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    watcherColor() {
      return `${this.color} ${this.color} transparent ${this.color}`
    }
  },
  methods: {
    resetStyle() {
      if (this.width && this.height) {
        const borderWidth = `${px2rem(this.height - 5)}rem ${px2rem(this.width / 2)}rem ${px2rem(5)}rem ${px2rem(this.width / 2)}rem`
        this.$refs.iconMark.style.borderWidth = borderWidth
      }
    }
  },
  mounted() {
    this.resetStyle()
  }
}
</script>
<style lang="scss" scoped>
@import "../../../scss/global.scss";
.icon-mark {
  width: 0;
  height: 0;
  border-width: px2rem(50) px2rem(10) px2rem(10) px2rem(10);
  border-style: solid;
  border-color: #fff #fff transparent #fff;
}
</style>