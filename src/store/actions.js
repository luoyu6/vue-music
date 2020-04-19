
import * as types from './mutation-types'
export function setMusicList({commit,state},playload){
    debugger
    commit(types.SET_MUSIC_LIST,playload)
    
}
export const selectPlay=function({commit,state},{list,index}){
    debugger
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
}