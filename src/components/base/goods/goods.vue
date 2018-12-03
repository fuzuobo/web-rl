<template>
	<div id="goods">
		<!-- left -->
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods"  class="item-li" :class="{'current':num==index}" @click="floor(index)">
					<span class="text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>

		</div>
		<!-- right -->
		<div class="good_wrapper" ref="menuWrapper">
			<ul class="clearfix">
				<li class="goods_list" v-for="(items,index) in goods" v-bind:key="index">
					<!-- 第一条 first-name -->
					<h3 class="name first-name" v-if="index==0">{{items.name}}</h3>
					<!-- 第二条 -->
					<h3 class="name first-name" v-else>{{items.name}}</h3>

					<!-- 商品详情 -->
					<div @click.stop="foodDetail(item)" v-for="item in items.foods " class="goods-detail">
						<img :src="item.icon" class="icon" />
						<div class="summarty">
							<h4>{{item.name}}</h4>
							<!-- 简介 -->
							<div v-if="item.description" class="description">
								<span>
									{{item.description}}
								</span>	
							</div>
							<!-- 交易 -->
							<div class="seller_">
								<span class="sellCount">月售{{item.sellCount}}份</span>
								<span class="rating">好评率{{item.rating}}</span>
							</div>
							<!-- 金额 -->
							<div class="price">
								<span class="newPrice">￥{{item.price}}</span>
								<span v-if="item.oldPrice" class="oldPrice">￥{{item.oldPrice}}</span>
							</div>
							<!-- 加减 -->
							<div class="shopcontrols">
								<Add :food="item"></Add>
							</div>
							
						</div>
					</div>
				</li>
			</ul>
		</div>
		<!-- 购物车 -->
		<Shopcart :selectfoods="selectfoods" :psPrice="seller_two.deliveryPrice" :minPrice="seller_two.minPrice"></Shopcart> 
		<!-- 菜单详情 -->
		<Food :food="this.foods" ref="food"></Food> 
	</div>
</template>
<script>
	import Add from '../AddControls/Add.vue'
	import Shopcart from '../shopcart/shopcart.vue'
	import Food from './food/food.vue'
	export default{
		name:'goods',
		data(){
			return{
				num:0, //菜单索引
				goods:[],
				h_Array:[], //高度集合
				seller_two:{},
				foods:{}
			}
		},
		components: {
			Add,Shopcart,Food
		},
		props:{
			seller:{
				type:Object /*数据从父级接收过来最大的对象*/
			}
		},
		computed:{
			selectfoods:function(){ //计算所有的数量
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods;
			},

		},
		created(){
			this.classMap=['decrease','discount','special','invoice','special'] //减分  特价 等
			this.goods=this.seller.goods;
			this.seller_two=this.seller.seller
			this.$nextTick(()=>{
				this.foodWrapper(); //所有的LI 高度放到一个数组里面去
			})
		},
		mounted:function(){
			var that=this;
			this.$nextTick(function(){
				this.$refs.menuWrapper.addEventListener('scroll',function(){
				 	var scroll_top=Math.floor(this.scrollTop); //滚动的距离
				 	for(var i=0;i<that.h_Array.length;i++){
				 		var a1=that.h_Array[i];
				 		var a2=that.h_Array[i+1];
				 		if(!a2 || (scroll_top>=a1 && scroll_top<=a2)){
				 			that.num=i;
				 			return i;
				 		}
				 	}
				 	return 0;
				 })
			})
		},
		methods:{
			foodWrapper:function(){
				let li_s=this.$refs.menuWrapper.getElementsByClassName('goods_list');
				let li_num=li_s.length;
				var height=0;
				this.h_Array.push(height);
				for(var i=0;i<li_num;i++){
					height+=li_s[i].clientHeight;
					this.h_Array.push(height);
				}
				this.h_Array
			},
			floor:function(index){
				var index_=index || 0;
				var h_map=this.h_Array.length>0 ? this.h_Array : [];
				this.$refs.menuWrapper.scrollTop=h_map[index]+2; 
			},
			// 详情
			foodDetail:function(food){
				if(food){
					this.foods=food;
					this.$refs.food.fooshow=true
				}
			}
		}
	}
</script>
<style scoped>
	@import 'goods.css';

</style>