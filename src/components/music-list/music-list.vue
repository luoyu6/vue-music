<!-- 歌曲列表 -->
<template>
 <transition name="slide" mode="out-in">
  <div class="music-list" ref='music-list'>
    <div class='header' @click="back">
        <i class='iconfont icon-fanhui'></i>
        <span>{{title}}</span>
    </div>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
       <div class='playCount'>
           <p>{{musicList.name}}</p>
           <p class="count"> <i class="icon iconfont icon-remen"></i>{{Math.floor(musicList.playCount/10000)}}万</p>
       </div>
    </div>
   <songlist :songs='listDetail'></songlist>
  </div>
</transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getRecommendListDetail} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import {createRecommendListSong} from 'common/js/song.js'
import {mapGetters} from 'vuex'
import songlist from 'components/song-list/song-list'
export default {
    components:{
        Scroll,
        songlist
    },
    data(){
        return {
            title:'歌单',
            listDetail:[]
        }
    },
    computed:{
        ...mapGetters([
            'musicList',
            'topimg',
        ]),
        bgStyle(){
            debugger
           this.topimg 
            return `background-image: url(${this.musicList.picUrl})`
        },
    },
    watch:{
        'musicList.picUrl':{
            handler(val){
                
                this.imageUrl=url
            }

        }
    },
    methods:{
        back () {
            
            // this.$router.back()
            this.$router.push('/recommend')
        },
        _getRecommendListDetail(id){
            
            if(!id){
                this.$router.push('/recommend')
            }
            getRecommendListDetail(id).then(res=>{
                if(res.status==200){
                 this.listDetail=res.data.result.tracks.map(ele=>{
                   return (createRecommendListSong(ele))  
                 })
                 debugger
                }
            })
        }
    },
    created(){
        
        this.musicList
        this._getRecommendListDetail(this.musicList.id)
    }
}
</script>
<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
.music-list
    position: fixed
    top: 0
    z-index: 100
    width 100%
&.header
    height: 60px;
    padding: 0 0 0 15px;
    font-size: 15px;
    line-height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
.bg-image
    background-repeat: repeat;
    background-size: cover;
    height: 320px
    background-position: 30% 32%;
    position relative
&.playCount
     position absolute
     bottom: 15px
     left: 15px
  &.count 
    font-size 14px
    margin: 5px 0;
    & i 
      font-size 14px
</style>