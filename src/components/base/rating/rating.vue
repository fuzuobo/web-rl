  <template>
   <div id="ratings">
    <!-- 评价内容 -->
    <div class="rating-content">
     <div class="overview">
      <!-- left -->
      <div class="overLeft">
       <h1 class="score">{{this.sellers.score}}</h1>
       <div class="title">综合评分</div>
       <div class="rante">高于周边商家{{this.sellers.rankRate}}%</div>
     </div>
     <!-- right -->
     <div class="overRight">
       <!-- wrapper -->
       <div class="score-wrapper">
        <span class="title">服务评价</span>
        <!-- 五角星分数 -->
        <Star :wjScore="this.sellers.serviceScore"></Star>
        <span class="scroe">
          {{this.sellers.serviceScore}}
        </span>
      </div>
      <!-- wrapper -->
      <div class="score-wrapper">
        <span class="title">商品评价</span>
        <!--分数 -->
        <Star :wjScore="this.sellers.foodScore"></Star>
        <span class="scroe">
          {{this.sellers.foodScore}}
        </span>
      </div>
      <!-- wrapper -->
      <div class="score-wrapper">
        <span class="title">送达时间</span>
        <!--分数 -->
        <span class="deliveryTime">
         {{this.sellers.deliveryTime}} 分钟
       </span>
     </div>
   </div>
 </div>	
 <div style="clear:both"></div>
 <!-- 评价组件 -->
 <RatingTab :rating="rating"></RatingTab> 
</div>
</div>
</template>
<script>
	import Star from './star.vue';	
	import RatingTab from '../ratingtab/ratingtab.vue'
	export default{
		name:'rating',
		data(){
			return{
				sellers:{},
				rating:[]
			}
		},
		components: {
			Star,RatingTab
		},
		props:{
			seller:{
        type:Object
      }
    },
    created(){
     this.sellers=this.seller.seller;
     this.rating=this.seller.ratings
   },
   methods:{
     
   }
 }
</script>
<style>
  #ratings {
    position: absolute;
    top: 230px;
    width: 100%;
    height: 100%;
    left: 0px;
    bottom: 46px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .pj-list{
    overflow-y: scroll;
    height: 300px;
  }
  .ratings-content{
    width: 100%;
  }
  .overview{
    display: flex;
    display: flexbox;
    padding: 18px 0px;
  }

  .overLeft {
    flex: 0 0 137px;
    width: 137px;
    text-align: center;
    align-items: center;
    border-right: 1px solid rgba(7,17,27,0.2)
  }

  .overRight{
    flex: 1;
    padding-left: 24px
  }
  @media only screen and (max-width:320px){
    .overLeft {
      flex: 0 0 118px;
      width: 118px;
      
    }
    .overRight{
      flex: 1;
      padding-left: 8px
    }

  }

  .score{
    line-height: 28px;
    font-size: 24px;
    margin-bottom: 6px;
    color:rgb(255,153,0);
  }
  .overLeft .title{
   margin-bottom: 6px;
   line-height: 12px;
   font-size: 12px;
   color:rgb(7,17,27);
 }

 .rante{
  padding-bottom: 6px;
  line-height: 10px;
  font-size: 12px;
  color:rgba(7,17,27,0.5);
}

.score-wrapper{
  line-height: 18px;
  margin-bottom: 6px;
  font-size: 0px;
}

.score-wrapper .title{
  font-size: 12px;
  line-height: 18px;
  color:rgb(7,17,27);
}
.score-wrapper .title,#star,.scroe{
  display: inline-block;
  line-height: 18px;
}

#star,.scroe{
  padding-left: 12px;
  vertical-align: top;

}
#star{
  padding-top: 2px
}
.scroe{
  font-size: 12px;
}

.deliveryTime{
  font-size: 12px;
  padding-left: 12px;
  color: rgb(147,153,159)
}
.user-xx{
  display: flex;
  display: flexbox;
  position: relative;
}
.user-xx img{
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
}

.user-xx  .content{
 flex:1;
 margin-left: 12px;
}
.user-xx h1.name{
  font-size: 10px;
  line-height: 12px;
  color:rgb(7,17,27);
}

.user-xx .time{
  position: absolute;
  right:0px;
  top:0px;
  font-size: 10px;
  color:rgb(7,17,27);
}

.star-wrapper{
  text-align: left;
  margin-top:6px;
}

.score-wrapper #star,.score-wrapper .scroe {
  padding-left: 6px;
}
#star, .scroe{
  padding-left: 0px;
}

.user-xx  .text{
  font-size: 12px;
  line-height: 12px;
  color:#000;
  margin-bottom: 6px;
}

div.user-xx span.icon-thumb_up{
 color: rgb(0,160,200);
}

div.user-xx span.icon-thumb_down{
  color:blue;
}

</style>