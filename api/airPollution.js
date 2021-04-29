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
export const getHistoryList = (stations,from,end,type) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/air/dataQuery',
    method: 'post',
    // data:rowr
    params: {stations,from,end,type}
  });
}
// 预警
export const getWarningList = (obj) =>{
  return request({  
    url: appConfig.WEB_API + '/api/bu/warning/list',
    method: 'post',
    data:obj
    // params: {stations,from,end,kong,level}
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





