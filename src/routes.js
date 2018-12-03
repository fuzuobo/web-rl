/*
1:路由懒加载:
用vue.js写单页面应用时，会出现打包后的JavaScript包非常大，
影响页面加载，我们可以利用路由的懒加载去优化这个问题
当我们用到某个路由后，才去加载对应的组件，这样就会更加高效，实现代码如下：
*/
import Axios from 'axios'
/*商品列表*/
const TypeList=(resolve)=>{
	import('./components/base/types-item/types_list.vue').then((module)=>{
		resolve(module)
	})
}


const Index=(resolve)=>{
	import('./components/index/index.vue').then((module)=>{
		resolve(module)
	})
}



const Find=(resolve)=>{
	import('./components/find/find.vue').then((module)=>{
		resolve(module)
	})
}


const Ddan=(resolve)=>{
	import('./components/ddan/ddan.vue').then((module)=>{
		resolve(module)
	})
}



const Wo=(resolve)=>{
	import('./components/wo/wo.vue').then((module)=>{
		resolve(module)
	})
}


const Login=(resolve)=>{
	import('./components/base/login/login.vue').then((module)=>{
		resolve(module)
	})
}



/*一个商家的页面，里面有商品，评论，商家等等*/

/*父*/
const Shop=(resolve)=>{
	import('./components/base/shop/shop.vue').then((module)=>{
		resolve(module)
	})
}


/*子*/
const Goods=(resolve)=>{
	import('./components/base/goods/goods.vue').then((module)=>{
		resolve(module)
	})
}

const Rating=(resolve)=>{
	import('./components/base/rating/rating.vue').then((module)=>{
		resolve(module)
	})
}

const Merchant=(resolve)=>{
	import('./components/base/merchant/merchant.vue').then((module)=>{
		resolve(module)
	})
}


// 猫眼

const Video=(resolve)=>{
	import('./components/base/video/video.vue').then((module)=>{
		resolve(module)
	})
}



export default[
{
	path:'/',
	component:Index,
	name:"index",
	meta:{title:"首页"}
},
{
	path:'/video',
	component:Video,
	name:'video',

},

{path:'/find',component:Find,meta:{title:"发现"}},
{path:'/ddan',component:Ddan,meta:{title:"订单"}}, 
{
	path:'/wo',
	name:"wo",
	component:Wo,
	meta:{title:"我的"},
	beforeEnter:(to,from,next)=>{
		let pattern=/^(\/w)/g
		let token=sessionStorage.getItem('accessToken'); 
		console.log('token--'+token)
		if(token){
			console.log('token++'+token)
			next();
		}else{
			next({name:'login'});
		}
		/*if(pattern.test(to.path)){
			//判读是否登录过
			Axios.get('http://localhost:7070/mock/isLogin.json',{access_token:token}).then(res=>{
				
					var res=res.data;
					if(res.code==0 && token==res.access_token){
						next()			
					}else{
						next({name:'login'})
					}
				}).catch(err => {
					

				})
		}*/
	}

},
	{path:'/typeList',component:TypeList},
	{path:'/login',component:Login,name:"login",meta:{title:"登录"}},
	{
		path:'/shop',
		component:Shop,
		name:"shop",
		meta:{title:"店面"},
		children : [
		{
			path : "/goods",
			component : Goods,
			name:"goods",
			meta:{title:"商品"}
		},
		{
			path : "/rating",
			component :Rating,
			name:"rating",
			meta:{title:"评论"}
		},
		{
			path : "/merchant",
			component :Merchant,
			name:"merchant",
			meta:{title:"商家"}
		}
		]
	}
	
	]







/*

1:菜单是对路由的直接体现，菜单控制实际上就是路由控制。
实现路由控制一个简单的方式是，
在路由的before钩子里校验当前即将跳转的路由地址是否有权访问，根据校验结果决定路由是否放行

2:这种实现方式既简单又直观，用于路由总数不多的系统非常合适，
但这么做本质上是将所有路由全部注册了，
直接带来的缺点有两个：
一、如果路由组件不是按需加载的话，应用将加载大量冗余代码；
二、每次跳转都要遍历一次完整路由，是对计算能力的浪费。



解决的方法：


http://vue-access-control.refined-x.com/#/

http://vue-access-control.refined-x.com/#/

*/