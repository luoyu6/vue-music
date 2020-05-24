<template>
    <transition name='playlist-slide' class='playlist-slide' >
       <div class='play-list' v-show="showFlag" @click="showFlag=false">
        <div class="list-wrapper" @click.stop>
            <div class="list-header">
                <i class="iconfont titleicon" :class='modeIcon'></i>
                <p class='text'>{{modeText}}</p>
                <i class="iconfont icon-shanchu delete"></i>
            </div>
            <div class="list-content">
              <scroll class="scroll" ref='scroll'>
               <transition-group tag='ul'>
                    <li v-for='(item,index) in sequenceList' :key='item.name' class='songitem' @click="selectItem(index)">
                      <i class="iconfont icon-shengyin current" v-show='item.id==currentSong.id'></i>
                      <span class="text">{{item.name}}</span>
                      <i class="iconfont icon-shanchu2 delete"></i>
                    </li>
               </transition-group>
              </scroll>
            </div>
            <div class="list-close"></div>
        </div>
        </div>
    </transition>

</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'api/config.js'
import Scroll from 'base/scroll/scroll'
export default {
    data(){
        return {
            showFlag:false
        }
    },
    components:{
        Scroll
    },
 computed:{
    ...mapGetters([
        'playlist',
        'mode',
        'sequenceList',
        'currentSong'
        ]),
    
    modeText(){
          return this.mode===playMode.sequence?'顺序播放':this.mode===playMode.loop?'单曲循环':'随机播放'
        },
    modeIcon(){
        if(this.mode===playMode.sequence){
            return 'icon-xunhuan2'
        }else if(this.mode===playMode.loop){
            return 'icon-danquxunhuan'
        }else{
            return 'icon-suiji1'
        }
    },

    },
    created(){
    },
   methods: {
       ...mapMutations({
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex:'SET_CURRENT_INDEX',
    }),
    selectItem(index){
        
        this.setCurrentIndex(index)
        this.setPlayingState(true)
    },
      show(){
          
        this.showFlag=true
    },
    
  },
}
</script>
<style lang="stylus" >
@import '~common/stylus/variable.styl'
.play-list
    position: fixed
    bottom : 0
    z-index: 200
    background-color: rgba(0,0,0,.3)
    width: 100%
    height: 100%;
.list-wrapper
    position: fixed;
    bottom: 0;
    width 100%
    background-color $theme-background
&.list-content
    max-height  240px
    width 100%
    overflow hidden
  & li.songitem
    font-size 14px
    height: 40px;
    background: #2c3e50;
    display: flex;
    align-items: center;
    padding: 0 30px 0 20px;
.list-content .scroll
   max-height 240px
.list-header
    display: flex;
    background: #2e3f50;
    height: 50px;
    align-items: center;
    padding: 0 30px 0 20px;
&.titleicon
    color $color-theme
    padding-right 10px
&.text
    flex 1
    font-size: 14px;
&.delete
    font-size 20px
    color $color-theme
.songitem .delete,.songitem .current
    font-size 14px
    color $color-theme
    padding-right 5px


 
 

    
    
</style>

