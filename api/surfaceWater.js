// API
import request from '@/utils/axios'
import { appConfig } from '../config/config.js'

// 实时数据
export const getWaterRtdList = () =>{
  return request({
    url: appConfig.WEB_API + '/api/bu/waterDetection/waterdetectionDataSearch/getRealTimeDataOfWaterQualityAnalysis',
    method: 'get',
    params: {}
  });
}


