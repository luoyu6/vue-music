<template>
 <transition name='slide'>
    <div class="user">
      <div class='title-warpper'>
         <div class="back" @click="back">
            <i class="iconfont icon-fanhui"></i>
         </div>
         <div class='switches-wrapper'>
            <switches :switches='switches' @select="switchItem" :currentIndex='currentIndex'></switches>
         </div>
         
      </div>
      <div class="playCount">
             
      </div>
      <div class='songlist'>
        <scroll :data='favoriteList' v-if='currentIndex===0'>
            <div class="list-inner">
              <song-list :songs='favoriteList'></song-list>
            </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex === 1" :data="playHistory">
         <div class="list-inner">
            <song-list :songs='playHistory'></song-list>
         </div>
        </scroll>
      </div>
    </div>
 </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { mapGetters,mapActions,mapMutations } from 'vuex'

export default{
    data(){
        return{
            switches:[
                {name:'我的收藏'},
                {name:'最近播放'}
            ],
            currentIndex:-1,
            favoriteList:[
                {name:'32423',singer:'534534444'}
            ]
        }
    },
    computed:{
        ...mapGetters(['playHistory'])
    },
    methods:{
        back(){
            this.$router.back()
        },
        switchItem(index){
            this.currentIndex=index
        }
    },
    components:{
        Switches,
        Scroll,
        SongList,
    }
}
</script>

<style scoped lang='stylus'>
.user
    position: fixed
    background: #2c3e50
    top: 0
    width: 100%
    height 100%
.slide-enter-active,.slide-leave-active{
    transition all .2s
}
.slide-enter,.slide-leave-to{
    transform translate3d(50%,0,0);
    opacity 0
}
.title-warpper
    display: flex;
    line-height: 40px;
 &.back
    width: 10%;
    text-align: center;
 &.switches-wrapper
   width: 90%;
</style>