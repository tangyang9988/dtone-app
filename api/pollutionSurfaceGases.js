// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
export const getPollutionWasteGasRtdList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/wasteGas/air/realvalue',
    method: 'get',
    params: {}
  });
}
// 历史数据
export const getPollutionWasteGasHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/wasteGas/air/dataQuery',
    method: 'post',
    data:row
  });
}
// 废气企业列表
export const getGasEnterpriseList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/enterprise/dictbytype?type=air',
  });
}


