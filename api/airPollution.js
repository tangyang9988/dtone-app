// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

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
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/realvalue/aqi/hour',
    method: 'get',
    params: {}
  });
}
// 历史数据 天
export const getHistoryList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/airdetection/dataSearch/realvalue/day',
    method: 'get',
    params: {}
  });
}


