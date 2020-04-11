<template>
  <div class='tab'>
    <div class='tabbox'>
      <router-link tag='div' to='/recommend' class='tab-item'>
        <span class='tab-link'>推荐</span>
      </router-link>
      <router-link tag='div' to='/singer' class='tab-item'>
        <span class='tab-link'>歌手</span>
      </router-link>
      <router-link tag='div' to='/rank' class='tab-item'>
        <span class='tab-link'>排行</span>
        </router-link>
      <router-link tag='div' to='/search' class='tab-item'>
        <span class='tab-link'>搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped lang='stylus'>
  @import "~common/stylus/variable";
  .tabbox
    display:flex
    font-size $font-size-small
   &.tab-item
     flex 1
     color $color-text
     text-align center
   &.router-link-active .tab-link
     padding 3px 0
     border-bottom:2px solid $color-theme

</style>
