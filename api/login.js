// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'
import { formatData } from '../utils/webUtils'
// export const localLogin = (params) =>{
//   return request({
//     url: appConfig.WEB_API + '/dutjt-auth/oauth/token?'+formatData(params),
//     method: 'post',
//     headers: {
//       'Tenant-Id': params.tenantId,
//       'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
//     },
//     params: {}
//   });
// }
export const localLogin = (params) =>{
  return request({
    url: appConfig.WEB_API + `/dutjt-auth/oauth/token?tenantId=${params.tenantId}&username=${params.username}&password=${params.password}&type=${params.type}&grant_type=${params.grant_type}&scope=${params.scope}`,
    method: 'post',
    headers: {
      'Tenant-Id': params.tenantId,
      'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
    },
    params: {}
  });
}