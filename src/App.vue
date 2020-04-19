<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
    
  </div>
</template>

<script>
 import MHeader from 'components/m-header/m-header'
 import Tab from 'components/tab/tab'
 import Player from 'components/player/player'
export default {
  components:{
    MHeader,
    Tab,
    Player,
  }
}
</script>

<style lang="stylus">
 html,body
  background #2C3E50
.iconfont
   font-size 24px

</style>
