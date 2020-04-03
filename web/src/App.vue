<template>
  <div id="app">
    <router-view></router-view>
    <tab-bar />
  </div>
</template>

<script>
  import TabBar from './components/TabBar.vue'

  export default {
    name: 'app',
    components: {
      TabBar
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>