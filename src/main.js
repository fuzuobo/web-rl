/*main.js 文件需要引入 必要的自带组件*/
import Vue from 'vue'
import VueResource from 'vue-resource'
import axios from './http'
import store from './store/store.js'
import vueRouter from 'vue-router'
import App from './App'
import Routes from './routes'

/*Mint插件*/
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { DatetimePicker } from 'mint-ui';
import { MessageBox } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);


Vue.config.productionTip = false

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;

/*组件使用中*/
Vue.use(VueResource)
Vue.use(vueRouter)
Vue.use(Mint)


/*创建路由 const意思就是不变的意思  这里指的是router这个路由是不变的*/
const router=new vueRouter({
	routes:Routes,
	mode:"history" /*去除#号*/
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	
	axios,
	router:router,  /*使用路由*/
	store,
	template: '<App/>',
	components: { App },
})







/*过滤*/

// Vue.filter('Price',function(value){
//   return value+'元'

// })


// Vue.filter('sbstr',function(value){
//   return value.slice(0,25)+'...'
// })



