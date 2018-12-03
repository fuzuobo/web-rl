<template>
	<div id="login">
		<h3>用户登录</h3>
		<form v-on:submit.prevent="onSubmit">
			<div class="group">
				<label>用户名 :</label>
				<input type="text" name="name" v-model="name" ref="xm" />
			</div>
			<div class="group">
				<label>密&ensp;码 :</label>
				<input type="password" name="pass" v-model="pass" ref="mm"/>
			</div>
			<input class='sbt' type="submit" value="登录">
			<div class="ft">
				<router-link to="/register">还没有账号？马上注册</router-link>
			</div>
		</form>
	</div>
</template>
<script>
	import Axios from 'axios'
	import router from '../../../routes'
	export default{
		name:'login',
		data(){
			return{
				name:'',
				pass:''
				
			}
		},
		methods:{
			onSubmit:function(e){
				if(this.nameCheck() &&  this.mmCheck()){

				//	this.$emit("form",this.name,this.pass);  //emit触发函数   $emit("自定义事情"，‘ 附加参数都会传给监听器回调。’)
				e.preventDefault();

				var data={
					'usr':this.name,
					'pwd':this.pass
				}
				Axios.get('/mock/login.json').then(res=>{
					var res=res.data;
					//正式的调用接口
					for(var n in res){
						if(res[n].username==data.usr){
							sessionStorage.setItem('accessToken',res[n].access_token);
							sessionStorage.setItem('username',res[n].username)
							sessionStorage.setItem('uid', res[n]._id);
							alert("登录成功");
							this.$router.push({name:'wo'});
							/*传值到父级*/
							this.$emit("sessionName",data.usr);
							return;
						}else{
							console.log('登录失败')
						//	alert('登录失败');
						}
					}
				}).catch(err=>{
					console.log(err)
				})


			}else{
				return false
			}
			
			
		},
		nameCheck:function(){
			var v=this.$refs.xm.value;
			var v_len=v.length;
			if(!v){
				alert('用户名不能为空');
				this.$refs.xm.focus();
					//console.log(this.$refs.xm)
					return false;
					
					
				}

				if(v_len<3 || v_len>10){
					alert("用户名在3-10个字符中");
					this.$refs.xm.focus();
					return false;
				}

				return true;
				
			},
			mmCheck:function(){
				var v=this.$refs.mm.value;
				var v_len=v.length;
				if(!v){
					alert('密码不能为空');
					this.$refs.mm.focus();
					return false;
				}

				if(v_len<3 || v_len>20){
					alert("密码在3-20个字符中");
					this.$refs.mm.focus();
					return false;
				}

				return true;
			}
		}
	}
</script>
<style>
	#login{
		background: #f4f4f4;
		padding: 10px;
		text-align: center;
	}
	#login h3{
		font-size:14px;
		color: #808080;
		text-align: center;
		line-height: 26px;
	}
	.group{
		margin: 10px 0px;
	}
	.group input{
		width:60%;
		height:30px;
		border:0px;
		text-indent: 10px
	}


	input.sbt{
		width: 78%;
		height: 35px;
		border: 0px;
		background: #f0a70f;
		color: #fff;
	}


	.group label{
		color: #26a2ff;
		font-size: 14px
	}

	.ft{
		padding: 10px 0px;
	}

	a{
		color: #26a2ff;
		font-size: 12px
	}
</style>