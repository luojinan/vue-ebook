<template>
  <div class="test-localstorage">
    <p>本地缓存方法封装</p>
    <button @click="setStorage">添加本地缓存</button>
    <button @click="getStorage">获取本地缓存</button>
  </div>
</template>

<script>
import Storage from '@/utils/StorageClass'
export default {
  data(){
    return {
      msg:'我是值',
      storage: new Storage 
    }
  },
  methods: {
    setStorage(){
      console.log(this.storage.set('key1',{val1:'val'},60))
    },
    getStorage(){
      console.log(this.storage.get('key1')) 
    }
  }
}
</script>
<style lang="scss" scoped>
.test-localstorage{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  p,button{
    margin-bottom: 20px;
  }
}
</style>