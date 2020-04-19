// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import 'common/fonts/iconfont.css'
import 'common/stylus/index.styl'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
     loading: require('common/image/default.jpg'),//加载中图片，一定要有，不然会一直重复加载占位图
     error: require('common/image/default.jpg')  //加载失败图片
});
// import VueJsonp from 'vue-jsonp'
// import axios from 'axios'
// Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
// Vue.use(VueJsonp)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
