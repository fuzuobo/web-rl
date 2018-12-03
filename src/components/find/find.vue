
<template>
  <div class="find">
    <table>
      <thead>
        <tr>
          <th v-for='col in columns'>
            {{col.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='(index,entry) in dataList'>
          <td v-for='col in columns'>
            <span v-if="col.iskey" @click='loadCustomer(index[col.name])' style="text-decoration:underline">{{index[col.name]}}</span>
            <button v-if='col.isDel' class="btn-danger" @click="deleteEntry(index)">delete</button>
            <span v-else>{{index[col.name]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-group">
      <button @click="isShow">Create</button>
    </div>
    <div v-show='createShow' class="dialog dialog-active">
      <div class="dialog-content">
        <div class="close rotate">
          <span class="iconfont icon-close"></span>
        </div>
        
        <header class="dialog-header">
          <h1 class="dialog-title">Create New Customer</h1>
        </header>
        <div class="dialog-body">
          <div class="form-group">
            <label>Customer Id</label>
            <input type="text" v-model="item.customerId" />
          </div>
          <div class="form-group">
            <label>Company Name</label>
            <input type="text" v-model="item.companyName" />
          </div>

          <div class="form-group">
            <label>Contact Name</label>
            <input type="text" v-model="item.contactName" />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input type="text" v-model="item.phone" />
          </div>
          <div class="form-group">
            <label></label>
            <button @click="cancel">取消</button>
            <button @click="createCustomer">Save</button>
          </div>
        </div>
      </div>
    </div>
    <div v-show='updateShow' class="dialog dialog-active">
      <div class="dialog-content">
        <div class="close rotate">
          <span class="iconfont icon-close"></span>
        </div>
        
        <header class="dialog-header">
          <h1 class="dialog-title">Update New Customer</h1>
        </header>
        <div class="dialog-body">
          <div class="form-group">
            <label>Customer Id</label>
            <input type="text" v-model="item.customerId" />
          </div>
          <div class="form-group">
            <label>Company Name</label>
            <input type="text" v-model="item.companyName" />
          </div>

          <div class="form-group">
            <label>Contact Name</label>
            <input type="text" v-model="item.contactName" />
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input type="text" v-model="item.phone" />
          </div>
          <div class="form-group">
            <label></label>
            <button @click="cancel">取消</button>
            <button @click="UpdateCustomer">确定</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'find',
    data:function(){
      return{
        columns: [{name:'customerId',iskey:true},{name:'companyName'} , {name:'contactName'}, {name:'phone'},{name:'Delete',isDel:true}],
        dataList: [],
        createShow:false,
        updateShow:false,
        apiUrl: 'http://211.149.193.19:8080/api/customers', //api总地址
        item:{}
      }
    },
    mounted: function() {
          this.getCustomer() //初始化
        },
        methods:{
          isShow:function(){
            this.createShow = true;
            this.item = {};
          },
          deleteEntry:function(entry){
           console.log(entry)
           
           this.$http.delete(this.apiUrl+'/'+entry.customerId,{emulateJSON: true})
           .then((response) => {
            this.getCustomers();
          })
           .catch(function(response){
            console.log("失败");
          })
         },
         UpdateCustomer:function(){
          this.$http.put(this.apiUrl+'/'+this.item.customerId,this.item,{emulateJSON: true})
          .then((response) => {
           console.log(this.item);
           
           this.getCustomers();
         })
          .catch(function(response){
            console.log("失败");
          })
        },
        loadCustomer:function(id){
          var vm = this;
          this.updateShow = true;
          this.dataList.forEach(function(item){
            if(item.customerId == id){
              vm.item = item;
            }
          })
        },
        getCustomer:function(){
          this.$http.get(this.apiUrl,{emulateJSON: true})
          .then((response) => {
            this.dataList=response.body;
            console.log(this.dataList)
                // this.$set('gridData', response.data)
              })
          .catch(function(response) {
            console.log(response)
          });
        },
        createCustomer:function(){
          this.$http.get(this.apiUrl,this.item,{emulateJSON: true})
          .then(function(response){
           
            this.getCustomer();
          }).catch(function(response){
            console.log("失败");
          });
          this.createShow = false;
        },
        cancel:function(){
          this.createShow = false;
          this.updateShow = false;
        }
      }
      
    }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: Helvetica, simhei, Arial, sans-serif;
    }

    html {
      font-size: 14px;
    }

    body {
      margin-top: 10px;
    }

    table,
    td,
    th {
      border-collapse: collapse;
      border-spacing: 0
    }

    table {
      width: 100%;
    }

    td,
    th {
      border: 1px solid #bcbcbc;
      padding: 5px 10px;
    }

    th {
      padding: 10px;
      font-weight: 400;
      color: #fff;
      background: #0090d3;
      cursor: pointer;
    }

    tr:nth-of-type(odd) {
      background: #fff
    }

    tr:nth-of-type(even) {
      background: #eee
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    input {
      outline: none
    }

    input[type=text] {
      padding: 3px 6px;
      font-size: 1.2rem;
      border: 1px solid #ccc;
    }

    input[type=text]:focus {
      border-color: #0090d3;
      transition: .3s ease-in;
    }

    button {
      display: inline-block;
      box-sizing: border-box;
      padding: 10px 30px;
      background: #0090d3;
      color: #fff;
      border: 1px solid #0090d3;
      border-radius: 3px;
      outline: 0;
      transition: .4s ease-out;
    }

    button:hover,
    button:focus {
      opacity: 0.8;
      cursor: pointer;
      transition: .15s ease-in;
    }

    template {
      display: none;
    }

    #app {
      margin: 0 auto;
      max-width: 700px;
    }

    .btn-danger {
      padding: 5px 15px;
      border: 1px solid salmon;
      background: salmon;
    }

    .btn-save {
      border: 1px solid #0090d3;
      background: #0090d3;
    }

    .btn-close {
      border: 1px solid #ccc;
      background: #ccc;
    }

    .container {
      padding-left: 15px;
      padding-right: 15px;
      margin: 20px;
    }

    .search-input {
      width: 80%;
    }

    .form-group {
      margin: 10px;
    }

    .form-group > label {
      display: inline-block;
      padding-right: 1rem;
      width: 10rem;
      text-align: right;
    }

    .form-group > input,
    .form-group > select {
      display: inline-block;
      height: 1.8rem;
      line-height: 1.8rem;
    }

    .text-center {
      text-align: center;
    }

    .dialog {
      width: 480px;
      position: fixed;
      left: 50%;
      top: 1.8em;
      transform: translateX(-50%);
      z-index: 2000;
      visibility: hidden;
      backface-visibility: hidden;
      perspective: 1300px;
    }

    .dialog-active {
      visibility: visible;
    }

    .dialog-active .dialog-content {
      opacity: 1;
      transform: rotateY(0);
    }

    .dialog-active ~ .dialog-overlay {
      opacity: 1;
      visibility: visible;
    }

    .dialog-content {
      border-radius: 3px;
      background: #fff;
      overflow: hidden;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      transition: .5s ease-in-out;
      opacity: 0;
      transform-style: preserve-3d;
      transform: rotateY(-70deg);
    }

    .dialog-header {
      background: #0090d3;
      color: #fff;
    }

    .dialog-title {
      margin: 0;
      font-size: 1.8em;
      text-align: center;
      font-weight: 200;
      line-height: 1.8em;
    }

    .dialog-body {
      padding: 2em;
    }

    .dialog-body .error {
      font-size: 1.2em;
      color: salmon;
    }

    .dialog-footer {
      margin: 0 2em;
      padding: 1em 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .dialog-overlay {
      content: "";
      position: fixed;
      visibility: hidden;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      opacity: 0;
      background: rgba(0, 0, 0, 0.5);
      transition: all .6s;
    }

    .close {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      position: absolute;
      top: .5rem;
      right: .5rem;
      transition: .8s ease all;
      -moz-transition: .8s ease all;
      -webkit-transition: .8s ease all;
      border: none;
      border-radius: 3px;
      color: #333;
      text-decoration: none;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }

    .close:hover {
      transition: .8s ease all;
      -moz-transition: .8s ease all;
      -webkit-transition: .8s ease all;
    }

    .close .iconfont {
      font-size: 2rem;
      color: #fff;
    }

    .rotate {
      cursor: pointer;
    }

    .rotate:hover {
      transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transition: transform 1.0s ease all;
      -moz-transition: -moz-transform 1.0s ease all;
      -webkit-transition: -webkit-transform 1.0s ease all;
    }

    .loading-overlay {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      opacity: 1;
      background: rgba(0, 0, 0, 0.5);
      transition: all .6s;
    }

    .sk-three-bounce {
      position: absolute;
      top: 50%;
      left: 50%;
    }

    .sk-three-bounce .sk-child {
      width: 20px;
      height: 20px;
      background-color: salmon;
      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
      animation: sk-three-bounce 1.4s ease-in-out 0s infinite both;
    }

    .sk-three-bounce .sk-bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .sk-three-bounce .sk-bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-three-bounce {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }

    @keyframes sk-three-bounce {
      0%,
      80%,
      100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }
  </style>







<!--


典型的增删改查 delete put  post  get








<template>
  <div id="find">
      find
   </div>
</template>

<script>

export default {
  name: 'find',
  components: {
 
  }
}
</script>

<style>



</style>



-->