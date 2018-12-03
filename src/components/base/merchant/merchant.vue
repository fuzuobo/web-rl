<template>
	<div id="merchant">
		<!-- module-one -->
		<div class="module-one">
			<div class="address span-wrapper">
				<span class="add-icon"></span>
				<span class="add-txt">{{this.merchant.address}}</span>
				<span class="add-map" @click="map(address_txt)">[ {{map_txt}} ]</span>
			</div>
			<div class="spqn span-wrapper">
				<span class="sp-icon"></span>
				<span class="spqn-txt">查看食品安全档案</span>
			</div>
		</div>
		<!-- module-two -->
		<div class="module-one">
			<div class="ps span-wrapper">
				<span class="ds-icon"></span>
				<span class="ds-txt">配送服务 : {{this.merchant.dService}}</span>
			</div>
			<div class="pstime span-wrapper">
				<span class="dt-icon"></span>
				<span class="dt-txt">配送时间 : {{this.merchant.dServiceTime}}</span>
			</div>
		</div>
		<!-- module-two -->
		<div class="module-one bottom_pic">
			<div class="ps span-wrapper">
				<span class="ds-icon"></span>
				<span class="ds-txt">商家服务 : 到店自取</span>
			</div>
			<div class="mjian span-wrapper">
				<span class="mjian-icon"></span>
				<span class="ds-txt">{{this.merchant.discounts}}</span>
			</div>
			<div class="phone span-wrapper">
				<span class="phone-icon"></span>
				<span class="phone-txt">{{this.merchant.shopIphone}}</span>
			</div>
		</div>
		<!-- map -->
		<div class="map">
			 <div id="allmap" ref="amap"></div> 
		</div>
		
	</div>
</template>
<script>

	export default{
		name:'merchant',
		data(){
			return{
				merchant:{},
				address_txt:'',
				allmap_flg:false,
				map_txt:"查看地图",
				map_flag:1
			}
		},
		props:{
			seller:{
     			type:Object
   			}
		},
		created(){
			this.merchant=this.seller.seller;
			this.address_txt=this.merchant.address
			
		},
		methods:{
			map:function(txt){
				this.map_flag=this.map_flag+1;
				if(this.map_flag%2==0){
					this.$refs.amap.className='mapshow';
					this.map_txt='取消地图'
				}else{
					this.$refs.amap.className='';
					this.map_txt='查看地图'
				}
				var txt=txt || '';
				//百度地图API功能
				var map = new BMap.Map("allmap");  // 创建Map实例
				map.centerAndZoom(txt,15);      // 初始化地图,用城市名设置地图中心点
			}
		}
	}
</script>
<style>


#merchant{
	padding: 20px 10px;
	background: #efefef
}

.module-one{
	background: #fff;
	padding:10px;
	margin:10px auto;
}
.span-wrapper span{
	display: inline-block;
	color: #000;
}
.span-wrapper span.sp-icon,.span-wrapper span.add-icon,span.ds-icon,span.dt-icon,span.mjian-icon,span.phone-icon{

	width:20px;
	height:30px;
}
.address span.add-icon{
	background:url(./address_bg.jpg) no-repeat center;
	background-size: 100%;
}
.spqn span.sp-icon{
	background:url(./spaq_bg.jpg) no-repeat center;
	background-size: 100%;
}


span.ds-icon{
	background:url(./pservice_bg.jpg) no-repeat center;
	background-size: 100%;
}

span.dt-icon{
	background:url(./pstime_bg.jpg) no-repeat center;
	background-size: 100%;
}

span.mjian-icon{
	background:url(./jian_bg.jpg) no-repeat center;
	background-size: 100%;
}

.phone-icon{
	background:url(./ip_bg.jpg) no-repeat center;
	background-size: 100%;
}


span.add-txt,span.ds-txt{
    vertical-align: top;
    margin-top: 5px;
    padding-left: 10px;
}

span.spqn-txt,span.dt-txt,span.phone-txt{
    vertical-align: top;
    margin-top: 5px;
    padding-left: 10px;
}



#allmap{
    overflow: initial !important;
    position: fixed !important;
    z-index: 0;
    background-color: rgb(243, 241, 236);
    color: rgb(0, 0, 0);
    text-align: left;
    top: 384px;
    height: 350px;
    width:95%;
    display: none
}

.mapshow{
	display: block !important
}


.bottom_pic{
	border-bottom: 1px solid #a9b2c7
}

span.add-map{
	float: right;
    padding-top: 4px;
    color: red;
}

</style>