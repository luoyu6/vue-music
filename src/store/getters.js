
export const musicList = state => state.musicList
export const recommendListFlag = state=>state.recommendListFlag
export const playlist = state => state.playlist
export const fullScreen= state => state.fullScreen
export const currentSong= state => state.playlist[state.currentIndex]||{}
