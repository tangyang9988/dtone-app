import { appConfig } from '../config/config.js'
import { tokenUtil } from './token'
// import axios from './axios'
 

const send = (url, data = {}, method = 'POST', map={},showLoading = true) => {
    // uni.showLoading({
    //     title: '加载中'
    // })
    return new Promise((resolve) => {
        uni.request({
            method: method,
            url: url,
            data: data,
            header: (() => {
                const tokeValue = tokenUtil.get()
                let config = {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
					'Content-Type': 'application/json',
                }
                if (tokeValue) {
                    config[appConfig.tokenKey] = tokeValue
                }
				if(map.header){
					Object.assign(config,map.header);
				}
                return config;
            })(),
            success: (res) => {
                uni.hideLoading()
                resolve(res.data)
            }
        })
    })
}
// axios.interceptors.request.use(config => {
//     //开启 progress bar
//     NProgress.start();
//     const meta = (config.meta || {});
//     const isToken = meta.isToken === false;
//     config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
//     //让每个请求携带token
//     if (getToken() && !isToken) {
//       config.headers[website.tokenHeader] = 'bearer ' + getToken()
//     }
//     //headers中配置text请求
//     if (config.text === true) {
//       config.headers["Content-Type"] = "text/plain";
//     }
//     //headers中配置serialize为true开启序列化
//     if (config.method === 'post' && meta.isSerialize === true) {
//       config.data = serialize(config.data);
//     }
//     return config
//   }, error => {
//     return Promise.reject(error)
//   });

export const request = {
    get: (url, data,map) => {
        return send(url, data, 'GET',map)
    },
    post: (url, data,map) => {
        return send(url, data, 'POST',map)
    }
}