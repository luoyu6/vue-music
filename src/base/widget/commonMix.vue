<script>
import {playMode} from 'api/config.js'
import {shuffle} from 'common/js/util.js'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default{
    data(){

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
    methods:{

    
    
    }
}
</script>