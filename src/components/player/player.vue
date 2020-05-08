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
                       <i class="iconfont icon-aixin"></i>
                       </div>
                   </div>
               </div>
         </div>
       </transition>
        <audio id="music-audio" ref="audio" autoplay @canplay="ready"></audio>
    </div>
</template>
<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getSong} from 'api/song.js'
import {playMode} from 'api/config.js'
import {shuffle} from 'common/js/util.js'
export default {
data(){
    return {
        url:'',
        songReady:false,
    }
},
watch:{
    currentSong(newVal, oldVal){//当前播放歌曲
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
        this.getSongURL(newVal.id)
    },
    url(newUrl){
        debugger
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
    ]),
    changeMode(){
        let mode=(this.mode+1)%3
        this.setPlayMode(mode)
        let songList=[]
        if(mode==playMode.random){//随机模式
          songList=shuffle(this.sequenceList)
        }else{
          songList=this.sequenceList
        }
        this.resetCurrenIndex()
        this.setPlayList(songList)

    },
    resetCurrenIndex(){
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
        debugger
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
        debugger
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
 & i 
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



</style>