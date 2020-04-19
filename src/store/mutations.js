import * as types from './mutation-types'
const mutations={
    [types.SET_MUSIC_LIST] (state,musicList){
        debugger
        state.musicList = musicList
    },
    [types.SET_RECOMMOND_LIST_FLAg](state,flag){
        debugger
        state.recommendListFlag=flag
    },
    [types.SET_PLAYLIST](state,list){
        debugger
        state.playlist=list
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen=flag
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex=index
    },

}
export default mutations
