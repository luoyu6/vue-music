<template>
   <div class='song-list'>
       <ul>
           <li v-for="(song, index) in songs" :key="song.id" class="item clearfix" @click="selectItem(song, index)">
            <p class="songindex fl">{{index + 1}}</p>
            <div class="content fl">
                <h2 class="name">{{song.name}}</h2>
                <p class="desc">{{getDesc(song)}}</p>
            </div>
           </li>
       </ul>
   </div> 
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        songs:Array
    },
   created(){
    },
    methods:{
      selectItem(item,index){
        this.$emit('select',item,index)
      },
      getDesc (song) {
      if (song.aliaName) {
        return `${song.singer} - ${song.aliaName}`
      } else {
        return `${song.singer}`
      }
    }
    }
}
</script>
<style lang="stylus" scope>
@import "~common/stylus/variable";
.song-list
 background #2c3e50
.item
    padding: 6px;
    line-height: 22px;
    border-bottom: 1px solid #636060;
    height: 45px;
.song-list .content
  width: calc(100% - 50px);
&.name,.desc
 overflow: hidden;
 text-overflow:ellipsis;
 white-space: nowrap;
 &.desc
  font-size $font-size-small
.songindex
    width 50px
    text-align center
    line-height 50px
</style>