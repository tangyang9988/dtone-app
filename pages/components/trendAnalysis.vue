<template>
  <view class="main">
    <view class="cpt-mask" v-if="isShow">
      <view class="leftTitle">因子48小时曲线</view>
      <!-- 卡片列表 -->
      <view class="charts-box">
        <canvas
          canvas-id="canvasLineA"
          id="canvasLineA"
          class="charts"
          disable-scroll="true"
          @touchstart="touchLineA"
          @touchmove="moveLineA"
          @touchend="touchEndLineA"
        ></canvas>
        <!-- <qiun-data-charts type="line" :chartData="echartdata"/> -->
      </view>
      <view class="rightButton">
        <span v-if="isData" style="margin-right:10px;">暂无数据</span>
        <button class="cu-btn bg-green" size="mini" @click="close()">
          关闭
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import {
  getHistory48hourData,
  getWaterGasesHistory48hourData,
} from "../../api/airPollution.js";
import uCharts from "../../uni_modules/qiun-data-charts/js_sdk/u-charts/u-charts-v2.0.0.js";
export default {
  props: ["isShow", "card", "factor", "factorName"],
  data() {
    return {
      isData: false,
      categories: [],
      series: [],

      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      canvaLineA:null,
      serverData: "",
    };
  },
  methods: {
    getTime(time) {
      let value = new Date(time);
      let m =
        value.getMonth() + 1 < 10
          ? "0" + (value.getMonth() + 1)
          : value.getMonth() + 1;
      let d = value.getDate() < 10 ? "0" + value.getDate() : value.getDate();
      let h = value.getHours() < 10 ? "0" + value.getHours() : value.getHours();
      return m + "-" + d + " " + h + ":" + "00";
    },
    async getHistory48hour() {
      if (
        uni.getStorageSync("url") == "airPollution_index" ||
        uni.getStorageSync("url") == "surfaceWater_index"
      ) {
        var that = this;
        await getHistory48hourData(that.factor, that.card.siteId).then(
          function (result) {
            var list = result.data.data;
            if (list.length == 0) {
              that.isData = true;
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
            let LineA = { categories: [], series: [] };
            LineA.categories = that.categories;
            LineA.series = that.series;
            that.showLineA("canvasLineA", LineA);
          },
          function (error) {}
        );
      } else if (
        uni.getStorageSync("url") == "pollutionSurfaceWater_index" ||
        uni.getStorageSync("url") == "pollutionSurfaceGases_index"
      ) {
        var that = this;
        await getWaterGasesHistory48hourData(that.factor, that.card.id).then(
          function (result) {
            let list = result.data.data;
            if (list.length == 0) {
              that.isData = true;
            }
            let yList = [];
            for (let i = 0; i < list.length; i++) {
              let time = that.getTime(list[i].updateTime);
              that.categories.push(time);
              yList.push(list[i].avg);
            }
            that.series.push({
              name: that.factorName,
              data: yList,
            });
            let LineA = { categories: [], series: [] };
            LineA.categories = that.categories;
            LineA.series = that.series;
            that.showLineA("canvasLineA", LineA);
          },
          function (error) {}
        );
      }
    },
    showLineA(canvasId, chartData) {
      this.canvaLineA = new uCharts({
        canvasId: canvasId,
        context:uni.createCanvasContext(canvasId, this),
        type: "line",
        fontSize: 11,
        legend: true,
        dataLabel: true,
        dataPointShape: true,
        background: "#FFFFFF",
        pixelRatio: this.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        animation: false,
        enableScroll: true, //开启图表拖拽功能
        xAxis: {
          disableGrid: false,
          type: "grid",
          gridType: "dash",
          itemCount: 5,
          scrollShow: true,
          scrollAlign: "left",
          scrollBackgroundColor: "#F7F7FF",
          scrollColor: "#DEE7F7",
        },
        yAxis: {
          //disabled:true
          gridType: "dash",
          splitNumber: 8,
          // min: 10,
          // max: 180,
        },
        width: this.cWidth * this.pixelRatio,
        height: this.cHeight * this.pixelRatio,
        extra: {
          lineStyle: "straight",
        },
      });
    },
    touchLineA(e) {
      this.canvaLineA.scrollStart(e);
    },
    moveLineA(e) {
      this.canvaLineA.scroll(e);
    },
    touchEndLineA(e) {
      this.canvaLineA.scrollEnd(e);
      //下面是toolTip事件，如果滚动后不需要显示，可不填写
      this.canvaLineA.showToolTip(e, {
        format: function (item, category) {
          return category + " " + item.name + ":" + item.data;
        },
      });
    },
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {
    this.cWidth = uni.upx2px(750);
    this.cHeight = uni.upx2px(500);
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
.charts-box{
  height:300px;
}
.rightButton {
  position: absolute;
  margin-left:40%;
  bottom: 8px;
  // justify-content: space-between;
  // position: absolute;
  // right:60px;
  // bottom: 20px;
}
.cpt-mask {
  position: fixed;
  bottom: 10%;
  opacity: 1;
  z-index: 99;
  width: 100%;
  background-color: white;
  border-radius: 10px;

  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}
.charts{width:100%; height:300px;background-color:#FFFFFF;}
</style>
