// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
export const getPollutionWaterRtdList = (enterpriseId,current,size) =>{
  return request({
    url: appConfig.WEB_API + '/bu/pollutemonitor/wasteWater/realvalue',
    method: 'get',
    params: {enterpriseId,current,size}
  });
}
// 废水企业列表
export const getWaterEnterpriseList = () =>{
  return request({
    url: appConfig.WEB_API + '/bu/enterprise/dictbytype?type=water',
  });
}
// 历史数据
export const getPollutionSurfaceWaterHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/bu/pollutemonitor/sewageOutlet/water/dataQuery',
    method: 'post',
    data:row
  });
}


