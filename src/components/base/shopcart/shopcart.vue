<template>
	<div id="shopcart">
		<!-- 购物车 -->
		<div class="shopcart-content">
			<!-- left -->
			<div class="left-content" @click="showDetail">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightlight':totalCount>0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<!-- 数量 -->
					<em class="num">{{totalCount}}</em> 
				</div>
				<!-- 金额 -->
				<div class="price" :class="{'hightlight':totalPrice>0}">
					￥{{totalPrice}}元 
				</div>
				<div class="desc">另需配送费￥{{psPrice}}元</div> 
			</div>
			<!-- right -->
			<div class="right-content">
				<div class="pay" :class="fullMoney">{{payDesc}}</div> 
			</div>
		</div>
		<!-- 购物车详情 -->
		<ShopcartDetail ref="ShopcartDetail" :selectfoods="selectfoods" :totalCount="totalCount"></ShopcartDetail>
	</div>
</template>
<script>
	import ShopcartDetail from './ShopcartDetail';
	export default{
		name:'shopcart',
		data(){
			return{
				
			}
		},
		components: {
			ShopcartDetail
		},
		props:{
			selectfoods:{  /*接收*/
				type:Array,
				default(){
					return [
					10,2
					]
				}
			},
			minPrice:{
				type:Number
			},
			psPrice:{
				type:Number
			}
		},
		created:function(){
			console.log(this.selectfoods)
		},
		methods:{
			showDetail:function(){
				if(this.totalCount>0){
					this.$refs.ShopcartDetail.scd=true;	
				}
			}
		},
		computed:{
			
			totalPrice:function(){
				let total_price=0;
				this.selectfoods.forEach((food)=>{
					total_price+=food.price*food.count;
				})
				return total_price
			},
			totalCount:function(){
				
				let count=0;
				this.selectfoods.forEach((food)=>{
					count+=food.count;
				})
				return count
			},
			payDesc:function(){
				if(this.totalPrice==0){
					return  '￥'+this.minPrice+'元起送'
				}else if(this.totalPrice<this.minPrice){
					return '还差'+(this.minPrice-this.totalPrice)+'元'
				}else{
					
					return '结算'
				}
			},
			fullMoney:function(){
				if(this.minPrice<=this.totalPrice){
					return 'y'
				}else{
					return 'n'
				}
			}

		}
	}
</script>
<style scoped>
	@import 'shopcart.css';
</style>