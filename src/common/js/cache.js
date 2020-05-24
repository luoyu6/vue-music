//storage本地存储的逻辑处理
import storage from 'good-storage'
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200


export function loadPlay() {
    return storage.get(PLAY_KEY, [])
}

function insertArray(arr, val, compare, maxLen) {
    let index = arr.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

function deletFromArray(arr, val, compare, maxlen) {
    let index = arr.findIndex(compare)
    if (index > -1) {
        arr.splice(index, 1)
    }

}
export function savePlaySong(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (ele) => {
        return ele.id === song.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs)
    return songs
}
export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deletFromArray(songs, song, (ele) => {
        return ele.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}
export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (ele) => {
        return ele.id === song.id
    }, FAVORITE_MAX_LEN)
    storage.set(FAVORITE_KEY, songs)
    return songs

}