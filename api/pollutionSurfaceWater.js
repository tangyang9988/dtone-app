// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
export const getPollutionWaterRtdList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/wasteWater/realvalue?timeType=1',
    method: 'get',
    params: {}
  });
}
// // 小时
// export const getPollutionWaterHourList = (stations,from,end,fromHour,endHour) =>{
//   return request({
//     url: appConfig.WEB_API + '/api/bu/pollutemonitor/wasteWater/realvalue/hour?timeType=2',
//     method: 'post',
//     params: {stations,from,end,fromHour,endHour}
//   });
// }
// 历史数据
export const getPollutionSurfaceWaterHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/pollutemonitor/sewageOutlet/water/dataQuery',
    method: 'post',
    data:row
  });
}


