import Vue from 'vue'
import Router from 'vue-router'
// import Recommend from '@/components/recommend/recommend'
// import Singer from '@/components/singer/singer'
// import Rank from '@/components/rank/rank'
// import Search from '@/components/search/search'

Vue.use(Router)
const Recommend = (resolve) => {
  import('components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('components/singer/singer').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('components/rank/rank').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}
const MusicList=(resolve)=>{
  import('components/music-list/music-list').then((module)=>{
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend',
    },
    {
      path: '/recommend',
      name:'推荐',
      component: Recommend,
      children:[
        {
          path:':id',
          component: MusicList,
        }
      ]
    },
     {
      path: '/singer',
      name:'歌手',
      component: Singer
    },
     {
      path: '/rank',
      name:'排名',
      component: Rank
    },
     {
      path: '/search',
      name:'搜索',
      component: Search
    }
  ]
})
