var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

/*
试一下，跨域成功了，但是注意了，这只是开发环境（dev）中解决了跨域问题，
生产环境中真正部署到服务器上如果是非同源还是存在跨域问题，如我们部署的服务器端口是3001，需要前后端联调，
第一步前端我们可以分生产production和开发development两种环境分别测试，
在config/dev.env.js和prod.env.js里也就是开发/生产环境下分别配置一下请求的地址API_HOST，
开发环境中我们用上面配置的代理地址api，生产环境下用正常的接口地址，所以这样配置

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',//开发环境
  API_HOST:"/api/"
})
1
2
3
4
module.exports = {
  NODE_ENV: '"production"',//生产环境
  API_HOST:'"http://40.00.100.100:3002/"'
}


当然不管是开发还是生产环境都可以直接请求http://40.00.100.100:3002/。配置好之后测试时程序会自动判断当前是开发还是生产环境，然后自动匹配API_HOST，我们在任何组件里都能用process.env.API_HOST来使用地址如

instance.post(process.env.API_HOST+'user/login', this.form)
1
然后第二步后端服务器配置一下cros跨域即可，就是access-control-allow-origin：*允许所有访问的意思。
综上：开发的环境下我们前端可以自己配置个proxy代理就能跨域了，真正的生产环境下还需要后端的配合的。
某大神说：此方法ie9及以下不好使，
如果需要兼容，最好的办法是后端在服务器端口加个代理，效果类似开发时webpack的代理。




第一步  上坡 ： 



*/