<template>
	<transition name="left-animate">
   <div   id="shop">
    <!-- 头部 -->
    <v-header :seller="shopObject"></v-header> 
    <!-- 导航 -->
    <div class="tab">
     <div class="tab-item"><router-link to="/goods">商品</router-link></div>
     <div class="tab-item"><router-link to="/rating">评论</router-link></div>
     <div class="tab-item"><router-link to="/merchant">商家</router-link></div>
   </div>
   <!-- 内容 -->
   <div class="content">
     <router-view :seller="shopObject"></router-view>
   </div>
   <!-- 关闭 -->
   <div class="close" @click="close_"><i class="iconfont icon-fanhuijiantou"></i></div>
 </div>
</transition>
</template>
<script>
  import header from '../header/header'
  import router from '../../../routes'
  export default{
    name:'shop',
    data(){
     return{
      shopObject:{}
    }
  },
  
  components: {
    "v-header":header
  },
  created:function(){
   this.shopObject=this.$route.params.shopObject
         this.$router.push({name:'goods'}) //动态加载子页面goods
       },
       methods:{
         close_:function(){
  				this.$router.push({name:'index'});//首页
  				//this.$router.go(-1);



          /*
     
          5000

          */
        }
      }
    }
  </script>
  <style scoped>
    @import 'shop.css';
  </style>