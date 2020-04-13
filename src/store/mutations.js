import * as types from './mutation-types'
const mutations={
    [types.SET_MUSIC_LIST] (state,musicList){
        debugger
        state.musicList = musicList
    },
    [types.SETTOPIMG](state,picUrl){
        debugger
        state.topimg=picUrl
    },
    [types.SET_RECOMMOND_LIST_FLAg](state,flag){
        debugger
        state.recommendListFlag=flag
    }
}
export default mutations
