<template>
	<div id="video">
		<h2>电影</h2>
		<!-- 轮播图 -->
		<div class="slider">
			<mt-swipe :auto="3000">
				<mt-swipe-item v-for="item in swipeData" :key="item.pic">
					<img :src="item.pic">
				</mt-swipe-item>
			</mt-swipe>
		</div>
		<!-- 关闭 -->
		<div class="closes" @click="close_"></div>

		<!-- hot -->
		<div class="hot">
			<div class="name">
				<h3>热门电影</h3>
				<span @click="moreVideo(50)" class='more'>{{moreText}}</span>
			</div>
			<ul>
				<li v-for="movie in hot">
					<img :src="movie.img" width="100%" height="100%">
					<div class="star-scroe">
						{{movie | filterStatu}}
					</div>
					<div class="name">
						{{movie.nm}}
					</div>
				</li>
			</ul>
		</div>
		
	</div>
</template>
<script>
	import router from '../../../routes'
	
	export default{
		name:'video',
		data(){
			return{
				hot:[],
				moreflg:1,
				moreText:'查看更多+',
				defaultNum:4,
				swipeData:[
				{
						pic:require('./1.jpg') //require加载 
					},
					{
						pic:require('./2.jpg')
					}
					]

				}
			},
			created(){
				var that=this;
				this.video_hot(that.defaultNum);
			},
			computed:{

			},
			components: {
				router
			},
			filters: {  
				filterStatu: function (value) {  
					var m_items=value || {};
					var sc=m_items.sc;
					var preSale=m_items.preSale;
					var wish=m_items.wish;
					if(preSale==0){
						if(sc!=0){
							return sc+"分";
						}else{
							return wish+"人想看";
						}
					}else{
						if(sc!=0){
							return '点映'+sc+"分";
						}else{
							return wish+"人想看";
						}
					}

					
				}  
			},
			methods:{
				video_hot:function(num){
				//跨域处理
				var limit=num;
				this.$http.get('/api/movie/list.json?type=hot&offset=0&limit='+limit).then((d)=>{
					var txt=eval('(' + d.bodyText + ')');
					var imgobg=txt.data.movies;
					this.hot=imgobg;
				});	
			},
			close_:function(){
				this.$router.go(-1) //返回 
			},
			moreVideo:function(all){
				var that=this;
				//查看更多
				this.moreflg++;
				if(this.moreflg%2==0){
					this.moreText='查看更多+'
					this.video_hot(all);
				}else{
					this.moreText='查看前5条'
					this.video_hot(that.defaultNum);
					
				}	
				
			}
			
			
		}
	}
</script>
<style>
	#app{
		margin-top: 2px;
	}
	.slider{
		width:100%;
		height:150px;
	}

	#video h2{
		font-size: 16px;
		text-align: center;
		font-weight: 400;
		color:#fff;
		background: #06c1ae;
		height: 40px;
		line-height: 40px;
		width:100%;
		margin: 0px auto 10px;
		position: relative;
	}

	.closes{
		position: absolute;
		left: 10px;
		top: 12px;
		width: 42px;
		height: 20px;
		background: url(./back_video.png) no-repeat center;
		background-size: 100%
	}
	.hot {
		padding: 0px 10px;
		margin-bottom: 10px;
	}
	.hot ul{
		padding: 0px;
		margin: 0px;
	}
	.hot li{
		float:left;
		width:22%;
		margin:20px 5px;
		height:125px;
		position: relative;
	}

	div.name{
		height:40px;
		line-height: 40px;
		position: relative;
		font-size: 14px;
		font-weight: 400;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	div span.more{
		position: absolute;
		right: 10px;
		top:2px;
		font-size:12px;
	}

	.star-scroe{
		color:#e6a52f;
		position: absolute;
		bottom: 2px;
		left:5px;
		font-size: 12px;
	}



	/*视频更多*/

	#vmore{
		position: fixed;
		width:100%;
		height:100%;
		background: #1e1c1c;
		left:0px;
		right:0px;
		top:0px;
		bottom: 0px;
		opacity: 0.8;
		color:#fff;
	}

</style>