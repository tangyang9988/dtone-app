// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 空气 站点下拉列表
export const selectSiteByType = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/monitoringStation/monitoringStationInfo/selectSiteByType?type=1',
    method: 'get',
    params: {}
  });
}
// 空气 预警状态下拉列表
export const selectStatusByType = () =>{
  return request({
    url: appConfig.WEB_API + '/api/dutjt-system/dict-biz/dictionary?code=dealPolluteWithStatus',
    method: 'get',
    params: {}
  });
}
// 水 站点下拉列表
export const selectWaterSiteByType = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/monitoringStation/monitoringStationInfo/selectSiteByType?type=2',
    method: 'get',
    params: {}
  });
}
// 实时数据
export const getAirRtdList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/realvalue/rtd',
    method: 'get',
    params: {}
  });
}
// 全区aqi等级（取小时数据）
export const getAqiRank = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/aqi/hour',
    method: 'post',
    params: {}
  });
}
// 历史数据
export const getHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/air/dataQuery',
    method: 'post',
    data:row
  });
}
// 预警-污染源
export const getWarningList = (start,end,processKey,source,status,enterpriseId,current,size) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airWarningManage/selectPollutionInfoPage',
    method: 'get',
    params: {start,end,processKey,source,status,enterpriseId,current,size}
  });
}
// 空气待办待办列表
export const airWaringSelectPage = (stationId,source,processKey,current,size,start,end) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airWarningManage/airWaringSelectPage',
    method: 'get',
    params: {stationId,source,processKey,current,size,start,end}
  });
}
// 趋势分析
export const comparativeAnalysis = (obj) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/air/comparativeAnalysis',
    method: 'post',
    data:obj
    // params: {stations,from,end,kong,level}
  });
}
// 待办处理
export const dealWithAir = (obj) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airWarningManage/dealWithAir',
    method: 'post',
    data:obj
  });
}
//废水待办列表
export const pollutionWarningSelectPage = (enterpriseId,processKey,current,size,start,end) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airWarningManage/pollutionWarningSelectPage',
    method: 'get',
    params: {enterpriseId,processKey,current,size,start,end}
  });
}
//废水待办处理
export const dealWithPollution = (obj) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airWarningManage/dealWithPollution',
    method: 'post',
    data:obj
  });
}

//48小时因子图标
export const getHistory48hourData = (factor,stationId) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/history48hourData',
    method: 'get',
    params: {factor,stationId}
  });
}

//废水、废气 48小时因子图标
export const getWaterGasesHistory48hourData = (factorDict,outletId) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/sewageOutlet/history48hourData',
    method: 'get',
    params: {factorDict,outletId}
  });
}







