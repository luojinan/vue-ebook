<template>
  <div class="ebook-reader">
    {{$route.params.filename}}
    <p>图书组件</p>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.ebook-reader{
  p{
    color: green;
  }
}
</style>