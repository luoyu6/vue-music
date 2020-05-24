export const musicList = state => state.musicList
export const recommendListFlag = state => state.recommendListFlag
export const playlist = state => state.playlist
export const fullScreen = state => state.fullScreen
export const currentIndex = state => state.currentIndex
export const currentSong = state => state.playlist[state.currentIndex] || {}
export const playing = state => state.playing //播放状态
export const playHistory = state => state.playHistory
export const mode = state => state.mode
export const sequenceList = state => state.sequenceList
export const favoriteList = state => state.favoriteList
export const isSongListPage = state => state.isSongListPage