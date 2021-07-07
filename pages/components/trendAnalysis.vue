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
// import { dealWithPollution } from "../../api/airPollution.js";
export default {
  props: [ "isShow"],
  data() {
    return {
      echartdata: {},
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  mounted: function () {
    this.echartdata = {
      categories: ["01:00", "02:00", "01:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
      series: [
        {
          "name": "co",
          "data": [
              62,
              63,
              56,
              89,
              79,
              36,
              62,
              63,
              56,
              89,
              79,
              36,
          ]
        }
      ],
      config: {
        
      }
    };
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
  position: absolute;
  bottom: 0;
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
