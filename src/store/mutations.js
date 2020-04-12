import * as types from './mutation-types'
const mutations={
    [types.SET_MUSIC_LIST] (state,musicList){
        debugger
        state.musicList = musicList
    },
    [types.SETTOPIMG](state,picUrl){
        debugger
        state.topimg=picUrl
    }
}
export default mutations
