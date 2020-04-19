export default class Song{
   constructor ({id,mid, singer, name, album, duration, image, url, aliaName}){
       this.id=id
       this.singer=singer
       this.name=name
       this.album=album
       this.image=image
   }
}
export function createRecommendListSong(song){
    return new Song({
        id: song.id,
        singer: singerName(song.artists),
        name: song.name,
        album: song.album.name,
        image: song.album.picUrl
    })
}
function singerName (arr) {
    let name = []
    name = arr.map((item) => {
      return item.name
    })
  
    return name.join('/')
  }