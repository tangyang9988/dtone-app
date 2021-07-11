// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
export const getPollutionWaterRtdList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/wasteWater/realvalue',
    method: 'get',
    params: {}
  });
}
// 废水企业列表
export const getWaterEnterpriseList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/enterprise/dictbytype?type=water',
  });
}
// 历史数据
export const getPollutionSurfaceWaterHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/sewageOutlet/water/dataQuery',
    method: 'post',
    data:row
  });
}


