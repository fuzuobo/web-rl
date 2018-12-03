<template>
  <div id="ddan">
    <h5>预约 功能</h5>
    <!-- btns -->
    <div class="btns">
      <div class="btn-first">
        <mt-button @click="btn('pre')" size="small">上一周</mt-button>
        <mt-button @click="btn('next')" size="small">下一周</mt-button>
        <mt-button @click="btn('now')" size="small">本周</mt-button>
      </div>
      <div class="btn-two">
        <mt-button @click="add()" type="default">新增</mt-button>
        <mt-button @click="update()" type="primary">更改</mt-button>
        <mt-button @click="deletes()" type="danger">删除</mt-button>
      </div>
    </div>
    <!-- week td -->
    <div class="table_first">
      <table class="bgtable" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr>
            <th></th><th></th><th></th><th></th><th></th>
          </tr>
        </thead>
        <tr v-for="(item,index)  in weekDate ">
          <td>
           {{item.month}}.{{item.day}}&nbsp;
           <br/>
           ({{item.week}})
         </td>
         <td colspan="4">
          <div id="mar" v-for="(list,listIndex) in item.ds" @click="selected(this.event,list,listIndex,index)"   :class="{'active':(listIndex+index) == navActive}"> 
            {{list.sqdw}}&nbsp; {{list.stime}}--{{list.etime}} &nbsp;{{list.text}}
          </div>
        </td>
      </tr>
    </table>
  </div>
  <!-- 新建 -->
  <Add ref="add" v-on:formValue="formText"></Add>
  <!-- 修改 -->
  <Update ref="update" :editData="editData"></Update>
  <!-- 删除 -->
</div>
</template>

<script>
  import Axios from 'axios'
  import router from '../../routes'
  import Add from './Add.vue'
  import Update from './update.vue'
  import { MessageBox } from 'mint-ui'; //mint-ui 组件
export default {
  name: 'ddan',
  data(){
    return{
      yydata:[],
      weekArray:[
      "周日", "周一", "周二", "周三", "周四", "周五", "周六"
      ],
      weekDate:[],
      theDate:new Date(),
      getFirstDate:function(d){
        var time=new Date(d);
        var weekDay=time.getDay();
        time.setDate(time.getDate()-weekDay);
        return time;
      },
      isActive:false, //修改选中变色
      navActive:8000,//默认第一个高亮
      trindex:0,
      editData:{},//要修改的内容

    }
  },
  components: {
    Add,Axios,router,Update
  },
  created:function(){
    this.initWeek();
    this.ydata();
  },
  methods:{
    ydata:function(){
      Axios.get('/mock/yy.json').then(d=>{
        this.yydata=d.data
        var w_array=this.weekDate;
        var y_array=this.yydata;
        for(var i=0;i<w_array.length;i++){
          var y=w_array[i].year;
          var m=w_array[i].month;
          var d=w_array[i].day;
          var t=y+"/"+m+"/"+d;
          for(var j=0;j<y_array.length;j++){
            if(t==y_array[j].ytime){
              w_array[i].ds.push(y_array[j]);
            }
          }
        }
        
      })
    },
    initWeek:function(){
      let week_firstDate=this.getFirstDate(this.theDate);
      this.weekDate.length=0;
      var that=this;
      for(var i=0;i<7;i++){
        let y=(week_firstDate.getFullYear())+"";
        let m=(week_firstDate.getMonth()+1<10 ? '0'+(week_firstDate.getMonth()+1) : week_firstDate.getMonth()+1)+"";
        let d=(week_firstDate.getDate() <10 ? '0'+week_firstDate.getDate() :week_firstDate.getDate())+"" ;
        let h=(week_firstDate.getHours() <10 ? '0'+week_firstDate.getHours() : week_firstDate.getHours())+"";
        let ms=(week_firstDate.getMinutes() <10 ? '0'+week_firstDate.getMinutes() :week_firstDate.getMinutes())+"";
        that.weekDate.push({"day":d,"year":y,"month":m,"hours":h,"minutes":ms,"week":this.weekArray[i],"data":[],"ds":[]});
        week_firstDate.setDate(week_firstDate.getDate()+1);
      }
    },
    btninitWeek:function(){
      this.weekDate=this.initWeek();
    },
    add:function(){
      this.$refs.add.flg=!this.$refs.add.flg;
    },
    update:function(){
      this.$refs.update.flg=!this.$refs.update.flg;
    },
    deletes:function(){
      if(this.editData.id){ 
        //正式的请求删除 this.$http.delete(this.apiUrl+'/'+this.editData.id,{emulateJSON: true});
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.weekDate[this.trindex].ds.splice(this.xh,1);
          this.navActive =-1;
        });   
      }
    },
    btn:function(ele){
      switch(ele){
        case 'pre':
            // 上一周
            this.theDate.setDate(this.theDate.getDate()-7)
            this.initWeek();
            this.ydata();
            break;
            case 'next':
            // 下一周
            this.theDate.setDate(this.theDate.getDate()+7)
            this.initWeek();
            this.ydata();
            break;
            case 'now':
            // 本月
            var firstDate=this.getFirstDate(new Date());  
            this.theDate.setFullYear(firstDate.getFullYear());
            this.theDate.setMonth(firstDate.getMonth());
            this.theDate.setDate(firstDate.getDate());
            this.initWeek();
            this.ydata();
            break;
          }
        },
    formText:function(obj){  //添加子页面返回的数据
      var newData=obj || {};
      var Y_new=newData.ytime;
      for(var j=0;j<this.weekDate.length;j++){
        let y_old=this.weekDate[j].year;
        let m_old=this.weekDate[j].month;
        let d_old=this.weekDate[j].day;
        let Y_old=y_old+"/"+m_old+"/"+d_old;
        if(Y_old==Y_new){
          this.weekDate[j].ds.push(newData);
        };
      }
    },
    UpdateValue:function(obj){ //修改的页面返回的数据
      //console.log(obj); 如果点击上周和下周数据保持不变，那么合并原来的数据，有的就覆盖，没有的就添加  
    },
    selected:function(that,obj,i,trindex){ //选中变色

      /*****/
      this.trindex=trindex;
      this.xh=i; 
      this.navActive = trindex+i;

      /*****/
      let target=that.target; //通过点击获取本身的元素，如何获取本元素的Class名称，从而再次判断
      let className=target.getAttribute('class');
      if(className=='active'){
          this.navActive =-1; //取消选中
          this.editData={};
      }else{
          this.editData=obj || {};
      };
    }

  }
}
</script>

<style scoped>
  /*引入样式*/
  #ddan {
   margin-top:-50px;
 }
 #ddan h5{
  font-size: 14px;
  text-align: center;
  background-color: #c4c4f8;
  padding: 10px 0px;
}
.mint-button--small{
  width:32%;
  margin-bottom: 15px;
}

.btn-two{
  text-align: center;
}
.mint-button-text,.mint-button{
  font-size: 14px !important;
}

table.bgtable{
  border-collapse: collapse;
}

.table_first tr td{
  width: 12%;
  border: 1px solid #abb0b4;
  padding: 8px 5px;
  font-size: 12px;
}

.table_first tr td:nth-child(1){
  background: #f6f8fa;
  font-size: 14px
}


.table_first{
  margin: 10px 0px;
}

#mar{
  margin:10px auto;
  background: #c4c4f8;
  padding: 5px 5px;
}


.active{
  background-color: orange !important;
}
</style>
