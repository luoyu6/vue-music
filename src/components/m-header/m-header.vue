<template>
  <div class='m-header '>
    <div class="headerbox clearfix clearfix">
      <img src="./luoyu6.jpg" width="40px" height="40px" class='headerimg'>
      <span class='headertitle'>Monkey Music</span>
    </div>
    <router-link tag='div' class='myicon clearfix' to='/user'>
      <i class='headericon iconfont icon-geren'></i>
    </router-link>
  </div>
</template>

<script>
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
 .m-header
    height: 60px;
    display: flex;
    position: fixed;
    top: 0;
    z-index: 3;
    background: #2c3e50;
    width: 100%;
    background: $theme-background
  &.headerbox
   width 50%
   margin 0 auto
   line-height: 54px;
  &.myicon
   float right
   padding 0 20 0 0
 .headerimg
    border-radius: 100%;
    float: left;
    margin: 8px 8px 0 0;
 .headertitle
   color $color-highlight
    float: left;
    margin: 0 0 0 10px;
    line-height: 54px;
.headericon
  color :$color-lowlight
  margin: 0 10px 0 0;
  line-height: 54px;





</style>
