<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
 import MHeader from 'components/m-header/m-header'
 import Tab from 'components/tab/tab'
export default {
  components:{
    MHeader,
    Tab
  }
}
</script>

<style lang="stylus">
 html,body
  background #2C3E50
.iconfont
   font-size 24px

</style>
