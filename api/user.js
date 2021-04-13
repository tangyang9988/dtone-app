import { request } from '../utils/request.js'
import { appConfig } from '../config/config.js'
import { formatData } from '../utils/webUtils.js'


// 申请友链
export function replyBlogLink (params) {
  return request.post(appConfig.WEB_API + '/oauth/replyBlogLink', params)
}

// 新增反馈
export function addFeedback (params) {
	
  return request.post(appConfig.WEB_API + '/oauth/addFeedback', params)
}

// 本地登录
export function localLogin (params,header) {
  return request.post('/api'+'/dutjt-auth/oauth/token?'+formatData(params),{},header);
}

// 本地注册
export function localRegister (params) {
  return request.post(appConfig.WEB_API + '/login/register', params)
}

// 验证码
export function getCode () {
  return request.get(appConfig.WEB_API + '/dutjt-auth/oauth/captcha')
}

// 通过token获取信息
export function authVerify (params) {
  return request.get(appConfig.WEB_API + '/oauth/verify/' + params, {})
}

// 通过token获取信息
export function editUser (params) {
  return request.post(appConfig.WEB_API + '/oauth/editUser', params)
}

// 解析移动端数据
export function decryptData (params) {
  return request.post(appConfig.WEB_API + '/oauth/decryptData', params)
}

// 解析移动端数据
export function code2Session(params) {
  return request.get('https://api.q.qq.com/sns/jscode2session', params)
}
