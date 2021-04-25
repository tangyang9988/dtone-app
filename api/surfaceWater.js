// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
// export const getWaterRtdList = () =>{
//   return request({
//     url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getRealTimeDataOfWaterQualityAnalysis',
//     method: 'get',
//     params: {}
//   });
// }
// 小时数据
export const getHourlyWaterQualityData = (stations,from,end,fromHour,endHour) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getHourlyWaterQualityData',
    method: 'get',
    params: {stations,from,end,fromHour,endHour}
  });
}
// 天数据
// export const getDailyWaterQualityData = (stations,from,end,type,fromHour,endHour) =>{
//   return request({
//     url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getDailyWaterQualityData',
//     method: 'get',
//     params: {stations,from,end,type,fromHour,endHour}
//   });
// }
// 历史数据
export const getSurfaceWaterHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/water/dataList',
    method: 'post',
    data:row
    // params: {stations,from,end,type}
  });
}


