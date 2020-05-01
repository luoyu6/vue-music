import axios from 'axios'
import {HOST} from './config'

export function getSong(id){
    const url=HOST + `/music/url?id=${id}`
  return axios.get(url)
}
