<template>
    <div class="player" v-show="playlist.length > 0">
       <transition name='normal'>
           <div class="normal-player" v-show='fullScreen'>
               <div class="background">
                   <div class="filter"></div>
                   <img :src="currentSong.image" width="100%" height="100%">
               </div>
               <div class="top">
                   <div class="back">
                       <i class="iconfont icon-xiangxia"></i>
                       <h1 class="title" v-html='currentSong.name'></h1>
                   </div>
                   <h2 class="subtitle" v-html='currentSong.singer'></h2>
               </div>
            <!-- background -->
            <!-- top -->
            <!-- middle -->
            <!-- bottom -->
         </div>
       </transition>
        <audio></audio>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
data(){
    return {

    }
},
computed:{
    ...mapGetters([
        'playlist',
        'fullScreen',
        'currentSong',
        ])
},
created(){
}


}
</script>
<style scope lang="stylus">
@import '~common/stylus/variable'
 .normal-enter-active,.normal-leave-active{
 transition all 0.45s
}
 .normal-enter,.normal-leave-to{
 opacity 0.1  
}
.normal-player
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 z-index: 150;
 background: $color-background;
&.background
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
&.back
 padding 15px
 display: flex;
 & i 
  font-size $font-size-large
  flex 1
 & h1 
  flex 1
  font-weight: 700;
  margin-left -30px
.top .subtitle
 text-align center
&.filter
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .6;


</style>