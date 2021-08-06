import Vue from 'vue'
import App from './App'
import  {appConfig}  from './config/config.js'
import axios from 'axios'

import qs from 'qs'
Vue.prototype.$qs = qs

// import Vconsole from 'vconsole';
// new Vconsole();

import blogHome from './pages/home/home.vue'
Vue.component('blogHome',blogHome)
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import zhouWeiNavBar from "./components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);

// import infiniteScroll from 'vue-infinite-scroll'
// // 懒加载
// Vue.use(infiniteScroll)

Vue.config.productionTip = false
// import hljs from 'highlight.js/lib/highlight';

// import 'highlight.js/styles/zenburn.css'

// import 'static/css/ckeditor.css'
// import 'static/css/emoji.css'
// import 'static/css/index.css'

// 工具类注册
import prototype from './utils/prototype'
Vue.use(prototype)
Vue.prototype.appConfig = appConfig;

Vue.config.productionTip = false;
Vue.prototype.$axios = axios

// Vue.directive('highlight', function (el) {
//   let blocks = el.querySelectorAll('pre code');
//   console.log("获取的列表", el)
//   blocks.forEach((block) => {
//     hljs.highlightBlock(block)
//   })
// })

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()

 



