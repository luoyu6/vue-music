import * as types from './mutation-types'
const mutations = {
    [types.SET_MUSIC_LIST](state, musicList) {
        state.musicList = musicList
    },
    [types.SET_PLAY_LIST](state, list) {
        state.playlist = list
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    //改变播放状态
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_CURRENT_INDEX](state, index) {

        state.currentIndex = index
    },
    [types.SET_PLAY_HISTORY](state, history) {
        state.playHistory = history
    },
    [types.SET_PLAY_MODE](state, mode) { //播放模式
        state.mode = mode
    },
    [types.SET_FAVORITE_LIST](state, list) {
        state.favoriteList = list
    },
    [types.SET_SONG_LIST_PAGE](state, flag) {
        state.isSongListPage = flag
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },

}
export default mutations