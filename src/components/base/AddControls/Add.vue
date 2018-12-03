<template>
	<div id="add">
		<!-- transition 平移和旋转动画效果-->
		<transition name="fade">
			<!-- 减 -->
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"  @click.stop="removeCart" ref="jian">
				-
			</div>
		</transition>
		<!-- count -->
		<div class="cart-count" v-show="food.count>0">
			{{food.count}}
		</div>
		<!-- 加 -->
		<div class="cart-add icon-add_circle" @click.stop="addCart">+</div>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default{
		name:'add',
		data(){
			return{
				
			}
		},
		components: {
			
		},
		props:{
			food:{
				type:Object
			},
			totalCount:{
				type:Number
			}
		},
		created(){
			
		},
		methods:{
			addCart:function(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}else{
					this.food.count++;
				}
			},
			removeCart:function(){
				if(this.food.count){
					this.food.count--;
					 var count=this.totalCount-1; //底部数量
					 
					 this.$emit('parentsElement',count);
					}
				}
			}
		}
	</script>
	<style scoped>
		@import 'add.css';
	</style>>