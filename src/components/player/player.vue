<template>
    <div class="player" v-show="playlist.length > 0">
       <transition name='normal'>
           <div class="normal-player" v-show='fullScreen' @touchstart.once="firstPlay">
               <div class="background">
                   <div class="filter"></div>
                   <img :src="currentSong.image" width="100%" height="100%">
               </div>
               <div class="top">
                   <div class="back" @click="back">
                       <i class="iconfont icon-xiangxia"></i>
                   </div>
                   <div class="misicTitle">
                       <h1 class="title" v-html='currentSong.name'></h1>
                       <h2 class="subtitle" v-html='currentSong.singer'></h2>
                   </div>
               </div>
               <div class="middle">
                   <div class="cd-wraper">
                       <img :src="currentSong.image"/>
                   </div>
                   <div class="lyric-wraper"></div>
               </div>
               <div class="bottom">
                   <div class="progress-wrapper"></div>
                   <div class="operators">
                       <div class="left">
                       <i class="iconfont " :class="modeIcon" @click="changeMode"></i>
                       </div>
                       <div class="left">
                       <i class="iconfont icon-xiayishou1" @click='prev'></i>
                       </div>
                       <div class="center">
                       <i class="iconfont " @click="togglePlaying" :class='playIcon'></i>
                       </div>
                       <div class="right">
                       <i class="iconfont icon-xiayishou" @click='next'></i>
                       </div>
                       <div class="right">
                       <i class="iconfont " @click='toggleFavorite' :class='favoriteIcon()'></i>
                       </div>
                   </div>
               </div>
         </div>
       </transition>
       <transition name='mini'>
            <div class='mini-player' v-show='!fullScreen' @click='toFullScreen'>
                <div class='icon'><img :src='currentSong.image'/></div>
                <div class='text'>
                    <h1 class="title" v-html='currentSong.name'></h1>
                    <h2 class="subtitle" v-html='currentSong.singer'></h2>
                </div>
                <div class='control'>
                    <i class='iconfont' :class='playIcon' @click.stop="togglePlaying"></i>
                </div>
                <div class='control' @click.stop="showPlaylist"><i class='iconfont icon-caidan'></i></div>
            </div>
       </transition>
        <playList ref="playListCom"></playList>
        <audio id="music-audio" ref="audio" autoplay @canplay="ready"></audio>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getSong} from 'api/song.js'
import {playMode} from 'api/config.js'
import {shuffle} from 'common/js/util.js'
import commonMixVue from '../../base/widget/commonMix.vue'
import playList from 'components/play-list/play-list'
import { nextTick } from 'q';
export default {
    mixins:[commonMixVue],
data(){
    return {
        url:'',
        songReady:false,
    }
},
components:{
    playList,
},
watch:{
    currentSong(newVal, oldVal){//当前播放歌曲
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
        this.getSongURL(newVal.id)
    },
    url(newUrl){      
        this.$refs.audio.src=newUrl
        this.setPlayingState(true)
    }

},
computed:{
    ...mapGetters([
        'playlist',
        'fullScreen',
        'currentSong',
        'playing',//是否播放
        'currentIndex',//当前播放索引
        'mode',
        'favoriteList',
        'sequenceList',
        ]),
     playIcon(){
        return this.playing?'icon-bofang':'icon-zanting'
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
methods:{
    ...mapMutations({
        setFullScreen:'SET_FULL_SCREEN',
        setPlayingState:'SET_PLAYING_STATE',
        setCurrentIndex:'SET_CURRENT_INDEX',
        setPlayMode:'SET_PLAY_MODE',
        setPlayList:'SET_PLAY_LIST'
    }),
    ...mapActions([
        'savePlayHistory',
        'deleteFavoriteSongs',
        'saveFavoriteSongs',
    ]),
    toFullScreen(){
        
        this.setFullScreen(true)
    },
    showPlaylist () {
        
        this.$refs.playListCom.show()

    },
    favoriteIcon(){
        if(this.isFavorite(this.currentSong)){
            return 'icon-like'
        }else{
            return 'icon-dislike'
        }
    },
    isFavorite(){
        let index=this.favoriteList.findIndex((ele)=>{
            return ele.id===this.currentSong.id
        })
        return index>-1
    },
    toggleFavorite(){
        if(this.isFavorite(this.currentSong)){
            this.deleteFavoriteSongs(this.currentSong)
        }else{
            this.saveFavoriteSongs(this.currentSong)
        }
    },
    changeMode(){
        let mode=(this.mode+1)%3
        this.setPlayMode(mode)
        let songList=[]
        if(mode==playMode.random){//随机模式
          songList=shuffle(this.sequenceList)
        }else{
          songList=this.sequenceList
        }
        
        this.resetCurrenIndex(songList)
        this.setPlayList(songList)
    },
    resetCurrenIndex(songList){
        
        let index=songList.findIndex((ele)=>{
            ele.id===this.currentSong.id
        })
        this.setCurrentIndex(index)
        
    },
    firstPlay () {
      this.$refs.audio.play()
    },
    togglePlaying(){
        const audio = this.$refs.audio
        this.setPlayingState(! this.playing )
        this.playing ? audio.play() : audio.pause()
    },
    ready(currentSong){
        this.songReady = true
        this.savePlayHistory(this.currentSong)
    },
    prev(){
        let index=this.currentIndex-1
        if( index===-1){
             index=this.playlist.length-1
        }
        this.setCurrentIndex(index)
        if(!this.playing){
            this.togglePlaying()
        }
        this.songReady = false
    },
    next(){
        
        let index=this.currentIndex+1
        if(index==this.playlist.length){
            index=0
        }
        this.setCurrentIndex(index)
        if(!this.playing){
            this.togglePlaying()
        }
        
    },
    getSongURL(id){
        getSong(id).then(res=>{
            this.url=res.data.data[0].url
        })
    },
    back(){
        this.setFullScreen(false)
    }
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
.mini-enter-active,.mini-leave-active{
    transition all 0.45
}
.mini-enter,.mini-leave-to{
    opacity 0.1
}
.mini-player
    position: fixed;
    z-index: 180;
    bottom: 0;
    height: 60px;
    background: hsla(210, 33%, 29%, .85);
    width: 100%;
    align-items: center;
    display: flex;
    
.mini-player .icon
    width: 40px;
    padding: 0px 10px 0 20px;
.mini-player .icon img
        width: 100%;
        border-radius: 100%;
.mini-player .text
    flex: 1;
    line-height: 14px;
.mini-player .text .title
    font-size 14px
.mini-player .text .subtitle 
   font-size 11px
.mini-player .control
    width: 30px;
    padding: 0 10px;
.player .normal-player
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 z-index: 150;
 background:  #f2f3f4;

&.background
      position: absolute;
      left: -50%;
      top: -50%;
      width: 300%;
      height: 300%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(30px);
&.misicTitle
    padding: 10px 0 0 0;
    line-height: 22px;
    text-align: center;
    width: calc(100% - 50px);
    margin: 0 0 0 -25px;
.operators i 
  font-size $font-size-large
  flex 1
 & .title 
  font-weight: 700
  font-size: $font-size-large-s
.top .subtitle
 text-align center
 font-size $font-size-small
.top
 display flex
 & .back
    line-height: 50px
    width: 50px;
    text-align: center;
&.filter
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .6;
    background-color #000
.middle
 position: fixed;
 border: 15px solid hsla(0,0%,100%,.1);
 width: 70%;
 top: 50%;
 margin-top: -50%;
 left: 50%;
 margin-left: -38%;
 border-radius: 50%;
 & .cd-wraper
    & img
        width: 100%;
        border-radius: 50%;
.bottom
 position absolute
 bottom 50px
 width 100%
 & .operators
   display flex
   &>div.center i
     font-size 40px
   & .left,.right
     line-height 40px
   &>div
     flex 1
     text-align center
     & >i 
       font-size 30px
     &i.center
      font-size 40px
     &i.left
      text-align right 
      font-size 30px
     &i.right
      text-align left 
      font-size 30px
.icon-like
  color:#c76b6b



</style>