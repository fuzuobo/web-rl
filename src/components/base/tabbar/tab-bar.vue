<template>
	<div id="tabBar">
		<router-link class="index" tag="li" to="/">
      		<i class="iconfont icon-shouye"></i>
      		<span>首页</span>
    	</router-link>

	    <router-link class="find" tag="li" to="/find">
	  	  <i class="iconfont icon-faxian-copy"></i>
	      <span>发现</span>
	    </router-link>

	    <router-link class="ddan" tag="li" to="/ddan">
	      <i class="iconfont icon-dingdan"></i>
	      <span>订单</span>
	    </router-link>

	    <router-link class="wo" tag="li" to="/wo">
	      <i class="iconfont icon-wo"></i>
	      <span>我的</span>
	    </router-link>
	</div>
</template>

<script>

	export default{
		name:'tabBar',
		data(){
			return{
				
			}
		}
	}
</script>
<style scoped>
  @import 'iconfont.css';
</style>