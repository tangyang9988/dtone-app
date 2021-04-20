
import axios from 'axios'
import { Base64 } from 'js-base64';
axios.defaults.withCredentials = true;

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  const clientId = "saber", clientSecret = "saber_secret";
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;
  const tokeValue=localStorage.getItem("access-user")
  //让每个请求携带token
  if (tokeValue && !isToken) {
    config.headers["dutjt-Auth"] = 'bearer ' +tokeValue;
  }
  //headers中配置text请求
  if (config.text === true) {
    config.headers["Content-Type"] = "text/plain";
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push("/");
        case 500:
          // 
      }
    }
    return Promise.reject(error.response)
  }
)
export default axios;
