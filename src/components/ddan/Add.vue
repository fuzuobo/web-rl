<template>
	<div id="add" v-if="flg">
		<h2>预约新增</h2>
		<form v-on:submit.prevent="onSubmit">
			<div class="group">
				<label>&emsp;&emsp;场所 :</label>
				<input type="text" name="cs" v-model="Base.cs" />
			</div>
			<div class="group">
				<label>预约日期 :</label>
				<input  type="text" name="ytime" @click="openPicker('ytime')" v-model="Base.ytime">  
			</div>
			<div class="group">
				<label>开始时间 :</label>
				<input readonly="" name="start" type="text"  @click="openPicker('stime')" v-model="Base.stime">  
			</div>
			<div class="group">
				<label>结束时间 :</label>
				<input readonly="" name="end" type="text"  @click="openPicker('etime')" v-model="Base.etime">  
			</div>
			<div class="group">
				<label>申请单位 :</label>
				<input type="text"  v-model="Base.sqdw">  
			</div>
			<div class="group">
				<label>&emsp; 联系人:</label>
				<input type="text"  v-model="Base.name">  
			</div>
			<div class="group">
				<label>&emsp;&emsp;人数 :</label>
				<input type="text"  v-model="Base.pnum">  
			</div>
			<div class="group">
				<label>&emsp; 手机号:</label>
				<input type="text"  v-model="Base.iphone">  
			</div>
			<div class="group groupHeight">
				<label>详情内容 :</label>
				<textarea rows="4" v-model="Base.text"></textarea>
			</div>
			<div class="btn_bottom">
				<input type="submit"  value="翻译">
				<input @click="hide()" type="button"  value="取消">
			</div>
		</form>
		<!-- 年月日 -->
		<mt-datetime-picker  ref="picker" v-model="ymValue" type="date" @confirm="handleConfirm"></mt-datetime-picker> 
		<!-- 开始和结束时间 -->
		<mt-datetime-picker  ref="hm" v-model="shValue" type="time" @confirm="ymConfirm" ></mt-datetime-picker> 
	</div>

</template>
<script>

	export default{
		name:'add',
		data(){
			return{
				flg:false,
			type: "", //当前选择时间的对象  
			ymValue: new Date(),
			shValue:'',
			ehValue:'',
			testTime:'',
			add_data:[], //新增加的数据
			Base:{
				cs:"",//场所
				ytime:"",//预约日期
				stime:"",//开始的时间段
				etime:"",//结束的时间段
				sqdw:"",//申请单位
				name:"",//联系人
				iphone:"",//联系电话
				pnum:0,//人数
				text:""//详情内容
			}
		}
	},
	components: {

	},
	created(){
		
	},
	methods:{
		onSubmit:function(e){
			var formText={
				"cs":this.Base.cs,
				"ytime":this.Base.ytime,
				"stime":this.Base.stime,
				"etime":this.Base.etime,
				"sqdw":this.Base.sqdw,
				"name":this.Base.name,
				"iphone":this.Base.iphone,
				"pnum":this.Base.pnum,
				"text":this.Base.text
			}
			this.$emit("formValue",formText);
			this.flg=!this.flg;
			e.preventDefault();
		},
		hide:function(){
			this.flg=!this.flg;
		},
		setNull:function(){
			this.Base.cs='';
			this.Base.ytime='';
			this.Base.stime='';
			this.Base.etime='';
			this.Base.sqdw='';
			this.Base.name='';
			this.Base.iphone='';
			this.Base.pnum='';
			this.Base.text='';
		},
		openPicker(type) {
		  // 打开时间选择器 
		  this.type=type;
		  if(type!='ytime'){
				this.$refs.hm.open(); //小时
			}else{
		  		this.$refs.picker.open();//年月
		  	}
		  },
		  handleConfirm(data) {
		  	let date =this.formatDate(data,'ytime');
		  	this.Base.ytime = date;
		  },
     	ymConfirm:function(data){ //时间
     		let date =this.formatDate(data);
     		if(this.type=='stime'){
     			this.Base.stime = date;
     		};
     		if(this.type=='etime'){
     			this.Base.etime = date;
     		};
     	},
     	formatDate(date,flg) {  
     		if(flg=='ytime'){
     			var y = date.getFullYear();  
     			var m = date.getMonth() + 1;  
     			var mm = m < 10 ? ('0' + m) : m;  
     			var d = date.getDate();  
     			var dd = d < 10 ? ('0' + d) : d; 
     			return y + '/' + mm+'/'+dd;
     		}else{
     			return date;
     		}
     	}
     }
 }
</script>
<style>
	#add{
		position: fixed;
		width: 100%;
		height: 100%;
		background: #e3e3e3;
		left: 0px;
		right: 0px;
		top: 0px;
		bottom: 0px;
	}

	.mint-field-core{
		background: #e1e1e1;
	}

	.btn_bottom{
		text-align: center;
		margin:10px auto;
	}

	.mint-cell-wrapper{
		font-size: 14px;
	}
	form {
		background: #efefff;
		padding: 10px;
		margin:auto;
	}
	form .group{
		margin: 10px 0px;
		padding:0px 20px;
		height:30px;
		line-height: 30px;
	}

	form .groupHeight{
		height:80px;
	}
	form .group label{
		font-size: 14px;
	}
	h2{
		background-color: #c4c4f8;
		padding: 10px 0px;
		text-align: center;
		font-size: 14px;
		font-weight: 700
	}

	form input{
		height: 22px;
		border: 0px;
		text-indent: 15px;
	}
</style>