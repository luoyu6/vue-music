<!-- 歌曲列表 -->
<template>
 <transition name="slide">
  <div class="music-list" ref='music-list'>
    <div class='header'>
        <i class='iconfont icon-fanhui'></i>
        <span>{{title}}</span>
    </div>
    <scroll class="list" 
    @scroll="scroll"
    :probe-type="probeType"
    :listen-scroll="listenScroll"
    :data="listDetail"
    ref="list">
    <div class="music-list-wrapper">
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class='headerDesc'>
                <p class='desc'>{{musicList.name}}</p>
            </div>
        </div>
        <div></div>

    </div>
    </scroll>
        
        
    </div>
</transition>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import {getRecommendListDetail} from 'api/recommend.js'
import {ERR_OK} from 'api/config.js'
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            title:'歌单',
            listDetail:[]
        }
    },
    computed:{
        ...mapGetters([
            'musicList'
        ]),
        bgStyle(){
            return `background-image: url(${this.musicList.picUrl})`
        },
    },
    watch:{
        'musicList.picUrl':{
            handler(val){
                debugger
                this.imageUrl=url
            }

        }
    },
    methods:{
        
        _getRecommendListDetail(id){
            
            if(!id){
                this.$router.push('/recommend')
            }
            getRecommendListDetail(id).then(res=>{
                
                if(res.status==200){
                    
                 this.listDetail=res.data.result.tracks

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
.bg-image
    background-repeat: repeat;
    background-size: cover;
    padding: 20% 0% 0 0;
    background-position: 30% 0;

</style>