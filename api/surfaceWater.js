// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'
import { Base64 } from 'js-base64';

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
  // const tokeValue=uni.getStorageSync("access-user")
  // const clientId = "saber", clientSecret = "saber_secret";
  // return uni.request({
  //   url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getHourlyWaterQualityData',
  //   method: 'get',
  //   header: {
  //     'Authorization':`Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`,
  //     'Content-Type': 'application/json',
  //     "dutjt-Auth": 'bearer '+ tokeValue
  //   },
  //   params: {},
  //   success: (res) => {
  //           console.log(res.data);
  //       }
  //   });  
  
  // return request({
  //   url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getHourlyWaterQualityData',
  //   method: 'get',
  //   params: {stations,from,end,fromHour,endHour}
  // });
}
// 历史数据
export const getSurfaceWaterHistoryList = (row) =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/water/dataList',
    method: 'post',
    data:row
  });
}


