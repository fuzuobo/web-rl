import axios from 'axios'
import store from './store/store.js'
import types from './store/type.JS'
import routes from './routes'



/*axios 拦截  http:*/

axios.interceptors.request.use(function(config){

	let token=sessionStorage.getItem('accessToken'); 
		console.log('axios---')
	if(token){
			console.log('axios+++')
		// // 判断是否存在token，如果存在的话，则每个http header都加上token
	   //config.headers.Authorization = `token ${store.state.token}`;
	}
	return  config;
	err => {
        return Promise.reject(err);
    };

})




// Add a response interceptor
axios.interceptors.response.use(function (response) {
    console.log(response)
    return response;
  }, function (error) {
   if(error.response){
		switch(error.response.status){
			case 401:
		 	// 返回 401 清除token信息并跳转到登录页面
			//  store.commit(types.LOGOUT);
            	next({name:'login'});
		}
	}
    return Promise.reject(error);
  });

export default axios;