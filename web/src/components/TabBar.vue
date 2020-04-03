<template>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="home" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" name=search to="/charts">图表</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data() {
      return {
        active: 'home'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>