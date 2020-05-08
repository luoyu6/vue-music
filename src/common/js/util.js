//歌曲顺序洗牌
export function shuffle(arr){
    let _arr=arr.slice(0)
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        let j=getRadomInt(i,0)
        let t=_arr[i]
        arr[j]=_arr[i]
        _arr[j]=t
    }
    return _arr
}
export function getRadomInt(max,min){
 return Math.floor(Math.random()*(max-min)+min)
}