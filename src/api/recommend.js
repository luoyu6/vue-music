import {HOST} from './config'
import axios from 'axios'

export class Getbanner {
  constructor(url){
    this.url=url
  }
  getData(){
    return new Promise((resolve,reject)=>{
      axios.get( HOST+this.url).then(res=>{
        resolve(res.data)
      })
    })
  }

}
export function getBanner(){
  return axios.get(HOST+'/banner')
}
export function getRecommendList(){
  return axios.get(HOST+'/personalized')
}
export function getRecommendSongs(){
  return axios.get(HOST+'/personalized/newsong')
}
export function getRecommendListDetail(id){
  return axios.get(HOST+`/playlist/detail?id=${id}`)
}
