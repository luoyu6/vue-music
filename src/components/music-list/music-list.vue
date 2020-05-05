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
    <div class="listContent">
      <div class="sequence-play" v-show="listDetail.length" >
        <i class="iconfont icon-bofang1"></i>
        <span class="text">播放全部</span>
        <span class="count">(共{{listDetail.length}}首)</span>
     </div>
     <scroll :data='listDetail'>
     <songlist :songs='listDetail' @select='selectItem'></songlist>
     </scroll>
    </div>
  </div>
</transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getRecommendListDetail} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import {createRecommendListSong} from 'common/js/song.js'
import {mapGetters,mapMutations,mapActions} from 'vuex'
import songlist from 'base/song-list/song-list'
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
            'recommendListFlag',
            
        ]),
        bgStyle(){
            return `background-image: url(${this.musicList.picUrl})`
        },
    },
    watch:{
       
    },
    methods:{
        ...mapMutations({
          setRecommendListFlag:'SET_RECOMMOND_LIST_FLAg',
        }),
        ...mapActions([
           'selectPlay',
           

        ]),
        //存储播放列表，当前播放索引
        selectItem(item,index){
            this.selectPlay({
                list:this.listDetail,
                index:index
            })
        },
        back () {
            this.$emit('showRecommend',true)
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
                }
            })
        }
    },
    created(){
        
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
    position: absolute
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
.sequence-play
    background: #2c3e50;
    height: 40px;
    border-bottom: 1px solid #636060;
    padding: 13px 0 0 15px;
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