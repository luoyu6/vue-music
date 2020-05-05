
import * as types from './mutation-types'
import {savePlaySong} from 'common/js/cache'
export function setMusicList({commit,state},playload){
    commit(types.SET_MUSIC_LIST,playload)
    
}
export function selectPlay({commit,state},{list,index}){
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
}
export  function savePlayHistory({commit,state},currentSong){
    commit('SET_PLAY_HISTORY',savePlaySong(currentSong))

}