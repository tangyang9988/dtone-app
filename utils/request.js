import { appConfig } from '../config/config.js'
import { tokenUtil } from './token'

const send = (url, data = {}, method = 'POST', map={},showLoading = true) => {
    uni.showLoading({
        title: '加载中'
    })
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

export const request = {
    get: (url, data,map) => {
        return send(url, data, 'GET',map)
    },
    post: (url, data,map) => {
        return send(url, data, 'POST',map)
    }
}