import {loadPlay} from 'common/js/cache'
import {playMode} from 'api/config'
const state={
    musicList:{},
    recommendListFlag:true,
    playlist: [], //播放列表
    fullScreen: false,  //是否全屏播放
    currentIndex:-1 ,//当前歌曲播放索引
    playing: false,// 是否播放
    playHistory:loadPlay(),//历史播放记录
    mode:playMode.sequence,

}
export default state