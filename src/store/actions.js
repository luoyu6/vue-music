
import * as types from './mutation-types'
export function setMusicList({commit,state},playload){
    commit(types.SET_MUSIC_LIST,playload)
    
}
export function selectPlay({commit,state},{list,index}){
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
}