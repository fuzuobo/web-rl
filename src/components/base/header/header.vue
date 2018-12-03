<template>
	<div  id="header">
		<div class="avatar">
			<img :src="this.ShopDetail.avatar" width="64" height="64">
		</div>
		<div class="content">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{this.ShopDetail.name}}</span>
			</div>
			<div class="description">
				{{this.ShopDetail.description}}/{{this.ShopDetail.deliveryTime}}分钟送达
			</div>
			<div v-if="this.ShopDetail.supports" class="support">
				<span class="icon" :class="classMap[this.ShopDetail.supports[0].type]"></span>
				<span class="text">
					{{this.ShopDetail.supports[0].description}}
				</span>
			</div>
			<div v-if="this.ShopDetail.supports" class="seller-counter"  @click="showDetail">
				<span class="count">{{this.ShopDetail.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
			
		</div>
		<div style="clear:both"></div>
		<div class="buller-wrapper"  @click="showDetail">
			<span class="buller-title"></span> 
			<span class="buller-text">{{this.ShopDetail.bulletin|sbstr}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div> 
		<div class="background"></div>
	</div>
</template>
<script>

	export default{
		name:'header',
		data(){
			return{
				ShopDetail:{}
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		created:function(){
			this.ShopDetail=this.seller.seller;
      this.classMap=['decrease','discount','guarantee','invoice','special'] //减分 特价 等
  },
  methods:{
  	showDetail:function(){
  		alert('暂时没有开发');
  	}
  }
}
</script>


<style scoped>
	@import 'iconfont.css';
	@import 'header.css';
</style>