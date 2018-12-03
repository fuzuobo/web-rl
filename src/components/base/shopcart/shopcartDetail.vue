<template>
	<div id="shopcartDetail" class="zz-fixed" v-if="scd">
		<div class="shopcartDetail">
			<!-- 标题 -->
			<div class="title">
				<div class="name">已选商品</div>
				<div class="empty" @click="empty">清空</div>
			</div>
			<!-- 列表 -->
			<div class="list-shop">
				<ul>
					<li v-for="food in selectfoods">
						<div class="shopname">{{food.name}}</div>
						<div class="price">￥{{food.price*food.count}}元</div>
						<!-- 加减 -->
						<div class="shopcontrols">
							<Add  class='gw-detail'  :food="food" :totalCount="totalCount" v-on:parentsElement="count_residue"></Add>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import Add from '../AddControls/Add.vue'
	export default{
		name:'shopcartDetail',
		data(){
			return{
				scd:false
			}
		},
		props:{
			// 接收父级的数据
			selectfoods:{
				type:Array
			},
			totalCount:{
				type:Number
			}

		},
		methods:{
			empty:function(){
				if(confirm("确定要清空购物车吗？")){
					this.selectfoods.forEach((food)=>{
						food.count=0;
					})	
					this.scd=!this.scd;
				}
			},
			count_residue:function(count){
				var c=count
				if(c==0){
					this.scd=!this.scd;
				}
			}
		},
		components:{
			Add
		},

		computed:{

			
		}
	}
</script>


<style>

	/style>