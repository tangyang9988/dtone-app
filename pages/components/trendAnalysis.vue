<template>
  <view class="main">
    <view class="cpt-mask" v-if="isShow">
      <view class="leftTitle">因子48小时曲线</view>
      <!-- 卡片列表 -->
      <view class="charts-box">
        <qiun-data-charts class="chartColum" type="column" :chartData="echartdata" />
      </view>
      <view class="rightButton">
        <button
          class="cu-btn"
          size="mini"
          @click="close()"
          style="margin-right: 20px"
        >
          取消
        </button>
        <button class="cu-btn bg-green" size="mini" @click="confirm()">
          确定
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import {
  getHistory48hourData,
} from "../../api/airPollution.js";
export default {
  props: [ "isShow","card","factor","factorName"],
  data() {
    return {
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
    var that =this;
    await getHistory48hourData(that.factor,that.card.siteId).then(
      function (result) {
      let list = result.data.data;
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
  width: 300px;
  height: 200px;
  z-index: 99;
  overflow-x: scroll;
  white-space: nowrap;
}
.chartColum {
  width:900px;
}
.charts-box::-webkit-scrollbar {
  width: 10;
  height: 10;
  display: none;
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
  height: 280px;
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
