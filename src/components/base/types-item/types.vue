<template>
	<div id="types">
		<div class="types-items" @click="toList">
			<img :src="ico"/>
			<span>
				{{txt}}
			</span>
		</div>
	    
	</div>
</template>
<script>

	export default{
		name:'types',
		data(){
			return{
				
			}
		},
		components: {
			
		},
		props:{
			ico:{
				type:String,
				default:''
			},
			txt:{
				type:String,
				default:''
			}
		},
		created(){
			
		},
		methods:{
			toList:function(){
				this.$emit('toList');
			}
		}
	}
</script>
<style>
#article{
	width:98%;
	margin:auto;
	text-align: left;
}



#types{
	width:25%;
	float:left;
	height:70px;
	text-align: center;
	margin:10px 0px;
}
#types img{
	display: block;
	margin:2px auto;
	width:44px;
	height:45px;
}


</style>