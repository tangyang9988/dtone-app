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


