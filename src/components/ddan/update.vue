<template>
	<div id="update"  v-if="flg">
		<h2>预约修改</h2>
		<div class="list">
			<form name="form" v-on:submit.prevent="upSubmit">
				<!-- 场所 -->
				<div class="group">
					<label>&emsp;&emsp;&emsp; 场所:</label>
					<input type="text"  v-model="editData.cs"> 
				</div>
				<!-- 开始的时间段 -->
				<div class="group">
					<label>&emsp; 开始时间:</label>
					<input type="text"  v-model="editData.stime"> 
				</div>
				<!-- 结束的时间段 -->
				<div class="group">
					<label>&emsp; 结束时间:</label>
					<input type="text"  v-model="editData.etime"> 
				</div>
				<!-- 申请单位 -->
				<div class="group">
					<label>&emsp; 申请单位:</label>
					<input type="text"  v-model="editData.sqdw"> 
				</div>
				<!-- 联系人 -->
				<div class="group">
					<label>&emsp; &emsp;联系人:</label>
					<input type="text"  v-model="editData.name">
				</div>
				<!-- 联系电话 -->
				<div class="group">
					<label>&emsp; 联系电话:</label>
					<input type="text"  v-model="editData.iphone"> 
				</div>
				<!-- 人数 -->
				<div class="group">
					<label>&emsp;&emsp;&emsp; 人数:</label>
					<input type="text"  v-model="editData.pnum"> 
				</div>
				<!-- 详情内容 -->
				<div class="group">
					<label>&emsp; 详情内容:</label>
					<input type="text"  v-model="editData.text"> 
				</div>
			</form>
		</div>
		<!-- 按钮 -->
		<div class="btn">
			<button class="sure"    @click="sure()">确定</button>
			<button class="cancel"  @click="cancel()">取消</button>
		</div>
	</div>
</template>
<script>

	export default{
		name:'update',
		data(){
			return{
				flg:false
			}
		},
		components: {
			
		},
		props:{
			editData:{
				type:Object,
				default:{}
			}
		},
		created(){
			
		},
		methods:{
			/*
			正式的要发送请求返回数据
			this.$http.put(this.apiUrl+'/'+this.formText.id,this.formText,{emulateJSON: true})//修改
			this.$http.post()//保存 
			this.$http.get(this.apiUrl) //获取
			this.$http.delete(this.apiUrl+'/'+this.formText.id,{emulateJSON: true})//删除
			*/ 
			sure:function(evnet){
				var formText={
					"id":this.editData.id,
					"cs":this.editData.cs, 
					"ytime":this.editData.ytime,
					"stime":this.editData.stime,
					"etime":this.editData.etime,
					"sqdw":this.editData.sqdw,
					"name":this.editData.name,
					"iphone":this.editData.iphone,
					"pnum":this.editData.pnum,
					"text":this.editData.text
				}
				this.$emit("UpdateValue",formText);
			    this.flg=!this.flg;//取反
			    evnet.preventDefault();
			},
			cancel:function(){
				this.flg=!this.flg //取反
			}

		}
	}
</script>
<style>
	#update{
		position: fixed;
		width: 100%;
		height: 100%;
		background: #e3e3e3;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}

	h2{
		background-color: #c4c4f8;
		padding: 10px 0px;
		text-align: center;
		font-size: 14px;
		font-weight: 700;
	}

	button{
		padding: 3px 18px;
		border: 0px;
		margin: 10px 0px;
	}
	button.sure{
		background: #f49e0c;
		color: #fff;
	}

	button.cancel{
		background: #dd4c4c;
		color: #fff;
	}

	div.group{
		width:95%;
		margin: 10px 0px;
		text-align: left
	}
	div.group input{
		height: 24px;
		width:60%;
		border: 0px;
		text-indent: 15px;
	}
	div.btn{
		text-align: center;
	}

	form{
		background: #e3e3e3;
	}
</style>