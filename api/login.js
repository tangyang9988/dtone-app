// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'
import { formatData } from '../utils/webUtils.js'

export const localLogin = (params) =>{
  return request({
    url: appConfig.WEB_API + '/api/dutjt-auth/oauth/token?'+formatData(params),
    method: 'post',
    headers: {
      'Tenant-Id': params.tenantId,
      'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'
    },
    params: {}
  });
}
