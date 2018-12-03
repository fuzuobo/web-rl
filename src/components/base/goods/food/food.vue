<template>
	<transition name="left-animate">
		<div v-if="fooshow" id="food">
			<!-- 内容 -->
			<div class="food-content">
				<!-- 图片 -->
				<div class="imgae-header">
					<img :src="food.image"/>
					<div @click.stop="back" class="back">关闭</div>
				</div>
				<!-- 文章 -->
				<div class="article fcontent">
					<h1 class="title">{{food.name}}</h1>
					<!-- 售卖 -->
					<div class="details">
						<span class="sell-count">月售{{food.sellCount}}</span>
						<span class="good-rating">好评率{{food.rating}}%</span>
					</div>
					<!-- 金额 -->
					<div class="price">
						<span class="newPrice">￥{{food.price}}</span>
						<span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<!-- 购物车 -->
					<div class="gwc">
						<transition name="gwc-animate">
              				<span  @click.top="addgwc" v-if="!food.count || food.count===0 ">加入购物车</span>
            			</transition>
					</div>	
					<!-- 加减控件 -->
					<div class="shopcontrols">
	 					<Add  class='gw-detail'  :food="food" v-if="food.count"></Add>
	 				</div>
				</div>
				<!-- 分割线 -->
				<div class="fgc"></div>
				<!-- 商品介绍 -->
				<div class="foods-wrapper">
					<h2 class="js_name">
						商品介绍
					</h2>
					<p class="js-summarty">
						{{food.info}}
					</p>
				</div>
				<!-- 分割线 -->
				<div class="fgc"></div>
				<div class="foods-pjia">
					<h2 class="pjia_name">
						商品评价
					</h2>
					<!-- 评价组件 -->
					<RatingTab :rating="food.ratings"></RatingTab>
				</div>
			</div>
			
		</div>
	</transition>
</template>
<script>
	import Add from '../../AddControls/Add.vue'
 	import Vue from 'vue'
 	import RatingTab from '../../ratingtab/ratingtab.vue'
	export default{
		name:'food',
		data(){
			return{
				fooshow:false
			}
		},
		components:{
			Add,RatingTab 
		},
		props:{
			food:{
     			type:Object 
   			}
		},
		created:function(){
			//console.log(this.food)
		},
		methods:{
			addgwc:function(){
				if(!this.food.count){
					Vue.set(this.food,'count',1);
				}
			},
			back:function(){
				this.fooshow=!this.fooshow;
			}
		}
	}
</script>
<style>
#food{
 	position: fixed;
    left: 0px;
    bottom: 54px;
    top: 0px;
    z-index: 9;
    width: 100%;
    background: #fff;
    overflow-y: scroll;
    padding-bottom: 80px;
}

.back{
    position: relative;
    margin: 0px auto;
    bottom: 20px;
    color: #fff;
    background: #000000;
    padding: 5px 10px;
    text-align: center;
    height: 20px;
}


.left-animate-enter-active,.left-animate-leave-active{
 	transition: all 0.3s linear;
}

.left-animate-enter,.left-animate-leave-active {
	opacity: 0;
	transform:translate3d(100%,0,0); 
}


.gwc-animate-enter-active,.gwc-animate-leave-active{
  transition: all 0.3s linear;
}

.gwc-animate-enter-active,.gwc-animate-leave-active {
 opacity: 0;
 transform:translate3d(100%,0,0) rotate(180deg); 
 /*平移和旋转*/
}
.imgae-header{
  position: relative;
  width: 100%;
  height: 0px;
  padding-top: 100%;
}

.imgae-header img{
  position: absolute;
  height: 100%;
  width: 100%;
  left:0px;
  top:0px;
}

.back{
  position: absolute;
  top:10px;
  left:2px;
}

.back .icon-arrow_lift{
  display: block;
  padding: 12px;
  font-size: 20px;
  color:#fff;
}
.foods-contentm,.fcontent{
  position: relative;
}

.fcontent h1.title,h2.js-name,h2.pj-name{
   font-size:14px;
   padding-left:17px;
   padding-top: 18px;
   font-weight: 700;
   color:rgb(7,17,27);
   line-height: 28px;
}

h2.js_name,h2.pjia_name{
  padding-left: 0px;
  font-size: 14px;
  padding-bottom: 10px;
}

h2.pjia_name{
  padding:10px 18px;
}
.fcontent .details span.sell-count,.fcontent .details span.good-rating{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 20px;
  padding:8px; 
  padding-left:16px;
}


.price .newPrice{
  color:red;
  font-size:14px;
  font-weight: 700;
  padding-left:16px;
  line-height: 28px;
}

.price .oldPrice{
  color:rgb(147,153,159);
  font-size:12px;
  font-weight: 400;
  line-height: 28px;
}

.gwc{
  position: absolute;
  right: 10px;
  bottom: 2px;
}
.gwc span{ 
    display: block;
    background: rgb(0,160,220);
   -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 48px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    -webkit-transition: all 0.6 linear;
    transition: all 0.6 linear;
    padding: 5px 10px;
}

.fgc{
  height: 16px;
  background:#f3f5f7;
  border:1px solid rgba(7,17,27,0.1);
  margin-top:18px;
}

.foods-content #shopcontrols{
    right: 10px;
    bottom: 2px;
    position: absolute;
}


.foods-wrapper{
  padding:18px;
}

.foods-pjia{
 
}


.js-summarty{
  font-size: 12px;
  line-height: 24px;
  font-weight: 200;
  color:rgb(77,85,93);
}



</style>