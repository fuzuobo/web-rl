var express=require('express');
var config=require('./config/index');

var port=process.env.PORT || config.port;

var app=express();

var router=express.Router();

router.get('/',function(req,res,ne){
	req.url='/index.html';
	next();
});

app.use(router);

var appData=require('./data.json')
var seller=appData.seller
var goods=appData.goods
var ratings=appData.ratings

var apiRoutes=express.Router()

apiRoutes.get('/seller',function(req,res){
 res.json({
  errno:0,
  data:seller
 })
})

apiRoutes.get('/goods',function(req,res){
 res.json({
  errno:0,
  data:goods
 })
})

apiRoutes.get('/rating',function(req,res){
 res.json({
  errno:0,
  data:ratings
 })
})


app.use('/api',apiRoutes)  //使用路由

app.use(express.static('./dist'));

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}






