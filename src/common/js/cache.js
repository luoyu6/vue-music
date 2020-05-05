//storage本地存储的逻辑处理
import storage from 'good-storage'
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN=200

const FAVORITE_KEY='__favorite__'
const FAVORITE_MAX_LEN=200


export function loadPlay(){
    return storage.get(PLAY_KEY,[])
}
export function savePlaySong(song){
    let songs=storage.get(PLAY_KEY,[])
    let index=songs.findIndex((ele)=>{
        ele.id===song.id
    })
    if(index===0){
        return
    }
    if(index>0){
        songs.splice(index,1)
    }
    songs.unshift(song)
    if(PLAY_MAX_LEN && songs.length>PLAY_MAX_LEN){
        songs.pop()
    }
    storage.set(PLAY_KEY,songs)
    return songs
}