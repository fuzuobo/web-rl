<template>
  <div id="app">
    <!--路由机制-->
    <router-view></router-view>
  </div>
</template>

<script>
  import Index from './components/index/index'

  export default {
    name: 'app',
    data(){
      return{
        
      }
    },
    components: {Index},
    methods:{}

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
  ul,li{
    list-style-type: none
  }

  #tabBar li.router-link-active i, #tabBar li.router-link-active span{
    color: #06c1b5
  }


  header{
    width:100%;
    height: 40px;
    background: #24dac8;
    line-height: 40px;
  }
  header.header{
    top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 10;
  }

  header h1{
    color:#fff;
    font-size: 14px;
    font-weight: 400;
    text-align: center
  }

  span.usrname{
    position: absolute;
    right: 10px;
    top: 0px;
    color: #ffe547;
  }


</style>
