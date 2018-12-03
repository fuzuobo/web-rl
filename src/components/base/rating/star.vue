<template>
	<div id="star">
		<span id="num" :class="item" v-for="item in stars">
			
		</span>
	</div>
</template>
<script>

	export default{
		name:'star',
		data(){
			return{
				star_score:0,
				stars:[]
			}
		},
		props:{
			wjScore:{
				type:Number
			}
		},
		created:function(){
			if(this.wjScore){
				var sArray=[];
				var s=this.wjScore+'';
				var s_=s.split('.');
				if(s_.length>1){
					var s_t=s_[0];
					var s_t1=s_[1];
					// 整数
					var c=Number(s_t);
					if(c!=0){
						for(var i=0;i<c;i++){
							this.stars.push('on');
						}
					}

					if(s_t1==5){
						this.stars.push('half');
					}else if(s_t1<5){
						this.stars.push('half1');
					}else{
						this.stars.push('half3');
					}

				
				}else{

					
				}
				
			}

		},
		
		methods:{
			
		}


	}
</script>
<style>
span#num{
	width:16px;
	height:16px;
	display: inline-block;

}


#star{
	height: 24px;
	margin-top: -2px;
}

.on{
	background: url(./star24_on@2x.png) no-repeat center;
	background-size: 100%;
}
.half1{
	background: url(./star24_half1@2x.png) no-repeat center;
	background-size: 100%;
}


.half{
	background: url(./star24_half@2x.png) no-repeat center;
	background-size: 100%;
}

.half3{
	background: url(./star24_half3@2x.png) no-repeat center;
	background-size: 100%;
}
.off{
	background: url(./star24_off@2x.png) no-repeat center;
	background-size: 100%;
}

</style>