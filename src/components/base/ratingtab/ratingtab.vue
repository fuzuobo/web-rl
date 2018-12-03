<template>
	<div id="ratingtab">
		<!-- 评论类型 -->
		<div class="rating-type">
			<!-- 全部 -->
			<span @click.stop="selected(2)" :class="{'active':selectType==2}" class="tabs all">
				全部
				<em>{{rating.length}}</em>
			</span>
			<!-- 好评 -->
			<span @click.stop="selected(0)" :class="{'active':selectType==0}" class="tabs positive">
				推荐
				<em>{{pos_l}}</em>
			</span>	
			<!-- 吐槽 -->
			<span @click.stop="selected(1)" :class="{'active':selectType==1}" class="tabs negative">
				吐槽
				<em>{{neg_l}}</em>
			</span>	
		</div>
		<!-- 只看有内容的评价 -->
		<div @click="toggleContent" class="switch" :class="{'tgc':toggletext}">
			<span class="icon-content"></span>
			<p class="text">
				只看有内容的评价
			</p>	
		</div>
		<!-- 评价列表 -->
		<div class="pj-list">
			<ul class="clearfix">
				<li  v-for="r in pj_maps(this.selectType)">
					<!-- 用户 -->
					<div class="user-xx">
						<span class="time fl">{{formateTime(r.rateTime)}}</span>
						<div class="fr">
							<span>{{r.username}}</span>
							<img class="img" :src="r.avatar">
						</div>
					</div>
					<!-- 评价内容 -->
					<div class="pjtext">
						<span class="pic"></span>
						<span class="text" v-if="r.text">{{r.text}}</span>
						<span class="text" v-else>暂时没有评价</span>
					</div>
				</li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	const pos=0;//正向
	const neg=1;//反向
	const all=2;//全部
	export default{
		name:'ratingtab',
		data(){
			return{
				pos_l:0,
				neg_l:0,
				all_l:0,
				selectType:2,
				toggletext:false
			}
		},
		components: {
			
		},
		props:{
			rating:{
				type:Array,
				default(){
					return []
				}
			}
		},
		created(){
			this.pos_fn();
			this.neg_fn();
		},
		methods:{
			//选项卡
			selected:function(selectType){
				this.selectType=selectType;
			},
			// 推荐
			pos_fn:function(){
				var pos_=[];
				this.rating.forEach((rat)=>{
					if(rat.rateType==0){
						pos_.push(1)
					}
				})
				this.pos_l=pos_.length
			},
			// 吐槽
			neg_fn:function(){
				var neg_=[];
				this.rating.forEach((rat)=>{
					if(rat.rateType==1){
						neg_.push(1)
					}
				})
				this.neg_l=neg_.length
				
			},

			//所需列表内容
			pj_maps:function(selectType){
				var rat=[];
				this.rating.forEach((rats)=>{
					if(selectType==2){
						rat.push(rats);
					}else if(selectType==0){
						if(rats.rateType==0){
							rat.push(rats);
						}
					}else{
						if(rats.rateType==1){
							rat.push(rats);
						}
					}
				})
				return rat;
			},
			formateTime:function(time){
				var t=new Date(time);
				var Y=t.getFullYear();
				var M=t.getMonth()+1;
				var d=t.getDate();
				var h=t.getHours();
				var f=t.getMinutes();
				return Y+"-"+M+"-"+d+"  "+h+":"+f  
			},
			toggleContent:function(){
				console.log('只显示有内容的')
			}
		}
	}
</script>
<style>

	#ratingtab{
		padding: 0px 18px;
	}
	.rating-content{
		width: 98%;
	}
	.rating-type {
		margin-top: 16px;
	}
	.rating-type span.tabs{
		display: inline-block;
		font-size: 12px;
		color:#fff;
		background: rgb(0,120,220,0.5);
		border-radius: 3px;
		line-height: 16px;
		padding: 8px 12px;

	}
	.rating-type span.all{
		background: rgba(0,120,220,0.5);
	}
	.rating-type span.positive{
		background: rgba(0,120,220,0.2);
		color:rgb(77,85,93);
	}
	.rating-type span.negative{
		background: rgba(77,85,94,0.2);
		color:rgb(77,85,93);
	}
	.rating-type span+span{
		margin-left: 8px;
	}

	.rating-type span.active{
		background: #0078dc;
		color: #fff;
	}

	span.icon-content{
		background: url(./icon2.png) no-repeat center;
		width: 20px;
		height: 24px;
		display: inline-block;
		background-size: 100%;
		vertical-align: bottom;
	}

	.switch{
		font-size: 0px;
		margin: 12px 0px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-bottom:15px;
	}

	.switch .icon-check_circle{
		font-size: 24px;
		color: rgb(147,153,159);
		display: inline-block;
		line-height: 24px;
		vertical-align: top;
	}
	.switch .text{
		display: inline-block;
		font-size: 14px;
		color: rgb(147,153,159);
		margin-left: 8px;
		line-height: 24px;
	}
	div.tgc span.icon-check_circle{
		color: #0078dc;
	}

	.pj-list{
		padding: 10px 0px
	}

	.pj-list li{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		padding: 10px 0px;
	}


	div.user-xx span{
		display: inline-block;
		font-size: 10px;
		line-height: 24px;
		color:rgb(143,153,169);
	}
	div.fr{
		float: right;
	}
	img.img{
		width: 24px;
		height: 24px;
	}
	.pjtext{
		margin-top: 9px;
	}
	.pjtext span{
		display: inline-block;
		line-height: 24px;
	}
	.pjtext span.text{
		font-size: 12px;
		color:#000;
	}



	.pjtext .pic{
		vertical-align: top;
	}

	.icon-thumb_up{
		color:rgb(0,160,200);
	}

	.icon-thumb_down{
		color:rgb(143,153,169);
	}

</style>