import * as types from './mutation-types'
const mutations={
    [types.SET_MUSIC_LIST] (state,musicList){
        state.musicList = musicList
    },
    [types.SET_PLAY_LIST](state,list){
        state.playlist=list
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen=flag
    },
    //改变播放状态
    [types.SET_PLAYING_STATE](state,flag){
        state.playing=flag
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex=index
    },
    [types.SET_PLAY_HISTORY](state,history){
        state.playHistory=history
    },
    [types.SET_PLAY_MODE](state,mode){//播放模式
        debugger
        state.mode=mode
    }

}
export default mutations
