import * as types from './mutation-types'
const mutations={
    [types.SET_MUSIC_LIST] (state,musicList){
        state.musicList = musicList
    }
}
export default mutations
