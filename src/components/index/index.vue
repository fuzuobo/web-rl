<template>
	<div id="article">
		<!-- header -->
		<header class='header'>
			<h1>移动测试网8</h1>
			<span v-on:sessionName='changeValue' class="usrname" v-if="login_sucess">{{login_name}}</span>
		</header>
		<!-- 轮播图 -->
		<div class="slider">
			<mt-swipe :auto="3000">
				<mt-swipe-item v-for="item in swipeData" :key="item.pic">
					<img :src="item.pic">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 种类 -->
		<div class="type_articel">
			<TypeItem v-for="item in types" :key="item.ico" :ico="item.ico" :txt="item.txt"  @toList="toList(item)"></TypeItem> 
		</div>
		<!-- 猜你喜欢 -->
		<div class="merchant">
			<h3>猜你喜欢</h3>
			<ul class="clearfix">
				<li @click.stop="selectShop(it)" v-for="it in merchants">
					<img :src="it.img"/>
					<span class="name">{{it.name}}</span>
					<span class="summarty">{{it.summarty}}</span>
					<div class="price">
						<span class="discountedPrice">{{it.price|Price}}</span>  <span class="msPrice">门市价 {{it.mprice|Price}}</span>
						<span class="sell_p">已售 {{it.sell}}</span>
					</div>
				</li>
			</ul>
		</div>
		<!-- footer -->
		<Tabbar></Tabbar>
	</div>
</template>
<script>
	import TypeItem from '../base/types-item/types.vue'
	import Tabbar from '../base/tabbar/tab-bar.vue'
	import Shop from '../base/shop/shop.vue'
	import router from '../../routes'
	
	export default{
		name:'article',
		data(){
			return{
				login_sucess:false,
				login_name:'',
				merchants:[],
				seletedShop:{},
				swipeData:[
				{
					pic:require('./img/7.jpg')
				},
				{
					pic:require('./img/8.jpg')
				}
				],
				types:[

				{
					ico: require('./img/11.png'),
					txt: '美食'
				},
				{
					ico: require('./img/22.png'),
					txt: '猫眼电影',
					url:'video'
				},
				{
					ico: require('./img/33.png'),
					txt: '生鲜果蔬'
				},
				{
					ico: require('./img/44.png'),
					txt: '甜点饮品'
				},
				{
					ico: require('./img/55.png'),
					txt: '正餐优选'
				},
				{
					ico: require('./img/66.png'),
					txt: '美团专送'
				},
				{
					ico: require('./img/77.png'),
					txt: '能量西餐'
				},
				{
					ico: require('./img/88.png'),
					txt: '精品小吃'
				}

				
				]
			}
		},
		components: {
			TypeItem,Shop,Tabbar
		},
		created(){
			this.getSessionName(); //用户名
			this.getMerchants(); //获取接口数据
			
		},
		methods:{
			changeValue:function(user){
				this.login_name=user+"您好！"
				this.login_sucess=true
			},
			getSessionName:function(){
				var session_usr=sessionStorage.getItem('username');
				if(session_usr){
					this.login_name=session_usr+"您好！"
					this.login_sucess=true;
				}
			},
			getMerchants:function(){ //获取商家
				this.$http.get("/mock/merchant.json").then(function(data){
					var b=data.bodyText
					this.merchants=eval('(' + b + ')'); 
				})	
			},
			selectShop:function(shop){
				if(shop.goods){
					this.$router.push({name:'shop',params:{shopObject :shop }});
				}else{
					alert('该菜单暂时没有详细数据')
				}
			},
			toList:function(item){
				if(item){
					var path=item.url;
					console.log(path);
					this.$router.push({name:path}); //list 详情页
				}
			}

		}
	}
</script>
<style scoped>
	@import 'index.css';
</style>