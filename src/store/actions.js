
import * as types from './mutation-types'
import {savePlaySong} from 'common/js/cache'
import {playMode} from 'api/config'
import {shuffle} from 'common/js/util'
export function setMusicList({commit,state},playload){
    commit(types.SET_MUSIC_LIST,playload)
    
}
export function selectPlay({commit,state},{list,index}){
    let songList=[]
    if(state.mode==playMode.random){
        songList=shuffle(list)
    }else{
        songList=list
    }
    commit(types.SET_PLAY_LIST, songList)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
}
export  function savePlayHistory({commit,state},currentSong){
    commit('SET_PLAY_HISTORY',savePlaySong(currentSong))

}