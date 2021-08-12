
// import axios from 'axios'
import { Base64 } from 'js-base64';
import uniRequest from 'uni-request';
uniRequest.defaults.withCredentials = true;
//添加一个请求拦截器
uniRequest.interceptors.request.use(function (config) {
  const clientId = "saber", clientSecret = "saber_secret";
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;
  config.headers["Content-Type"] = "application/json";
  const tokeValue=uni.getStorageSync("access-user")
  //让每个请求携带token
  if (tokeValue && !isToken) {
    config.headers["dutjt-Auth"] = 'bearer ' +tokeValue;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 添加一个响应拦截器
uniRequest.interceptors.response.use(
  response => {
    if(response.data.code=="401"){
      setTimeout(function() {
        uni.navigateTo({
          url: '/pages/login/login',
        });
      }, 500);
      uni.showToast({
        title: "时间过期，请重新登录!",
        icon: "none"
      })
    }else{
      return response
    }
    
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    return Promise.reject(error.response)
  }
)
export default uniRequest;
