<template>
  <div class='recommend' ref='recommend' >
    <scroll ref="scroll" class="recommend-content" :data='recommendList' v-show='recommendFlag'>
      <div>
       <div v-if='banner.length' class="slider-wrapper" ref='sliderWrapper'>
          <slider>
            <div v-for='item in banner' :key='item.picUrl'>
              <a :href="item.linkUrl"><img class='sliderimg' :src='item.picUrl'/></a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="recommend-title">推荐歌单</h1>
          <ul class='clearfix'>
            <li v-for='item in recommendList' class='list-item clearfix' :key='item.id' @click='selectList(item)'>
              <div class='icon'>
                <img v-lazy="item.picUrl" :key='item.picUrl' alt="">
              </div>
              <div class="play-count">
                <i class="icon iconfont icon-remen"></i>
                <span class="desc">{{Math.floor(item.playCount/10000)}}万</span>
              </div>
              <div class='text'>
                <h2 class="name" >{{item.name}}</h2>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-songs">
          <h1 class="recommend-title">推荐歌曲</h1>
          <ul class='clearfix'>
            <li v-for='item in recommendSongs' class='list-item clearfix' :key='item.picUrl'>
              <div class='icon'>
                <img v-lazy="item.picUrl" :key='item.picUrl' alt="">
              </div>
              
              <div class='text'>
                <h2 class="name" >{{item.song.album.name}}</h2>
                <p class='artists'>{{item.song.album.artists[0].name}}</p>
              </div>
            </li>
          </ul>
        </div>
        

      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
 import Scroll from 'base/scroll/scroll'
 import Slider from 'base/slider/slider'
  import {getBanner,getRecommendList,getRecommendSongs} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {mapMutations,mapActions,mapGetters} from 'vuex'
  export default{
    data(){
     return {
       banner:[],
       recommendList:[],
       recommendSongs:[],
       recommendFlag:true,
     }
    },
    components: {
      Scroll,
      Slider
    },
    computed:{
      ...mapGetters(['recommendListFlag']),
    },
    methods:{
      ...mapMutations({
         setMusicList:'SET_MUSIC_LIST',
         setRecommendListFlag:'SET_RECOMMOND_LIST_FLAg',
    }),
      // ...mapActions(['setMusicList']),
      selectList(item){
        this.$router.push({
           path: `/recommend/${item.id}`,
        })
        this.setMusicList(item)
        this.setRecommendListFlag(false)
        this.showRecommend(false)
      },
      showRecommend(flag){
        debugger
        // this.recommendFlag=flag
      },
      getBanners(){
        getBanner().then(res=>{
         if(res.data.code==ERR_OK){
           this.banner=res.data.banners
         }
        })
      },
      getRecommendList(){
        getRecommendList().then(res=>{
         if(res.data.code==ERR_OK){
           this.recommendList=res.data.result
         }
        })
      },
      getRecommendSongs(){
        getRecommendSongs().then(res=>{
         if(res.data.code==ERR_OK){
           this.recommendSongs=res.data.result
         }
        })
      }

    },
    created() {
      this.getBanners()
      this.getRecommendList()
      this.getRecommendSongs()

    },
    mounted(){
debugger
      this.recommendListFlag
      this.$refs.recommend.widget
    }


  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .slider-wrapper
   position relative
   margin 10px 0 0 0
  .list-item
     width calc((100% - 28px)/3)
     height 178px
     float left
     position relative
     margin-left 7px
     cursor pointer
     border-radius 4px
  .list-item:nth-child(3n)
    margin-right 5px
   &.play-count
       position absolute
       top 5px
       font-size $font-size-small
       right 3px
      &i
       font-size $font-size-small-s  
   &.text
       font-size 12px
       line-height 17px
       margin: 7px 0 0 0
     &.artists
        overflow  hidden
        text-overflow  ellipsis
        -o-text-overflow  ellipsis
        white-space:nowrap
  &.icon img
     width 100%
     cursor pointer

 .recommend-title
  margin $m15
  color $color-theme

</style>
