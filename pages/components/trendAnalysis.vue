<template>
  <view class="main">
    <view class="cpt-mask" v-if="isShow">
      <view class="leftTitle">因子48小时曲线</view>
      <!-- 卡片列表 -->
      <view class="charts-box">
      <canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
        <!-- <qiun-data-charts type="line" :chartData="echartdata"/> -->
      </view>
      <span style="margin-left:40%;" v-if="isData">暂无数据</span>
      <view class="rightButton">
        <button class="cu-btn bg-green" size="mini" @click="close()">
          关闭
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import {
  getHistory48hourData,getWaterGasesHistory48hourData
} from "../../api/airPollution.js";
import uCharts from '../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts-v2.0.0.js';
export default {
  props: [ "isShow","card","factor","factorName"],
  data() {
    return {
      isData:false,
      echartdata: {},
      categories:[],
      series:[]
    };
  },
  methods: {
  getTime(time){
    let value =new Date(time)
    let m = (value.getMonth()+1)<10?('0'+(value.getMonth()+1)):value.getMonth()+1;
    let d =value.getDate()<10?('0'+value.getDate()):value.getDate();
    let h =value.getHours()<10?('0'+value.getHours()):value.getHours();
    return m+ "-" + d + " " + h + ":" +"00"; 
  },
  async getHistory48hour(){
    if(uni.getStorageSync("url") == "airPollution_index" || uni.getStorageSync("url") == "surfaceWater_index"){
      var that =this;
      await getHistory48hourData(that.factor,that.card.siteId).then(
        function (result) {
        let list = result.data.data;
        if(list.length==0){
          that.isData =true;
        }
        let yList=[]
        for (let i = 0; i < list.length; i++) {
          let time = that.getTime(list[i].updateTime)
          that.categories.push(time);
          yList.push(list[i].avg);
        }
        that.series.push({
          "name":that.factorName,
          "data":yList
        })
        that.echartdata = {
          categories:that.categories,
          series:that.series
        }
        },
        function (error) {}
      );
    }else if(uni.getStorageSync("url") == "pollutionSurfaceWater_index" || uni.getStorageSync("url") == "pollutionSurfaceGases_index"){
      var that =this;
      await getWaterGasesHistory48hourData(that.factor,that.card.id).then(function (result) {
        let list = result.data.data;
        if(list.length==0){
          that.isData =true;
        }
        let yList=[]
        for (let i = 0; i < list.length; i++) {
          let time = that.getTime(list[i].updateTime)
          that.categories.push(time);
          yList.push(list[i].avg);
        }
        that.series.push({
          "name":that.factorName,
          "data":yList
        })
        that.echartdata = {
          categories:that.categories,
          series:that.series
        }
        },
        function (error) {}
      );
    }
    },
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {
    this.getHistory48hour();
  },
};
</script>
<style scoped lang="scss">
.leftTitle {
  margin: 10px;
  font-size: 16px;
  font-weight: 520;
}
.charts-box {
  width: 100%;
  height: 200px;
  z-index: 99;
  display: flex;
  flex-wrap: nowrap;
  // overflow-x: scroll;
  // white-space: nowrap;
}
// .charts-box::-webkit-scrollbar {
//   width: 10;
//   height: 10;
//   display: none;
// }
// .chartColum{
//   width:900px;
// }
scroll_view{
		width: 100%;
		overflow:hidden;
		white-space:nowrap;
	}
.rightButton {
  position: absolute;
  right: 20px;
}
.cpt-mask {
  position: fixed;
  bottom: 10%;
  opacity: 1;
  z-index: 99;
  width: 90%;
  height: 300px;
  margin: 20% 5%;
  background-color: white;
  border-radius: 10px;

  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}

</style>
