<template>
  <view class="main">
    <view class="header_search">
      <view>
        <checkbox-group @change="checkboxChange">
          <label style="margin-right: 10px">
            <checkbox value="co" style="transform: scale(0.7)" />CO
          </label>
          <label style="margin-right: 10px">
            <checkbox value="no2" style="transform: scale(0.7)" />NO2
          </label>
          <label style="margin-right: 10px">
            <checkbox value="o3" style="transform: scale(0.7)" />O3
          </label>
          <label style="margin-right: 10px">
            <checkbox value="pm2.5" style="transform: scale(0.7)" />PM2.5
          </label>
          <label style="margin-right: 10px">
            <checkbox value="pm10" style="transform: scale(0.7)" />PM10
          </label>
          <label style="margin-right: 10px">
            <checkbox value="so2" style="transform: scale(0.7)" />SO2
          </label>
        </checkbox-group>
      </view>
      <!-- <button
        :class="
          active == 'auto'
            ? 'cu-btn shadow-blur round bg-green'
            : 'cu-btn shadow-blur round'
        "
        data-cur="auto"
        @click="selected($event)"
      >
        自定义
      </button>
      <button
        :class="
          active == 'fiveMinute'
            ? 'cu-btn shadow-blur round bg-green'
            : 'cu-btn shadow-blur round'
        "
        data-cur="fiveMinute"
        @click="selected($event)"
      >
        5分钟
      </button>
      <button
        :class="
          active == 'hour'
            ? 'cu-btn shadow-blur round bg-green'
            : 'cu-btn shadow-blur round'
        "
        data-cur="hour"
        @click="selected($event)"
      >
        小时
      </button>
      <button
        :class="
          active == 'day'
            ? 'cu-btn shadow-blur round bg-green'
            : 'cu-btn shadow-blur round'
        "
        data-cur="day"
        @click="selected($event)"
      >
        日
      </button>
      <button
        :class="
          active == 'threedays'
            ? 'cu-btn shadow-blur round bg-green'
            : 'cu-btn shadow-blur round'
        "
        data-cur="threedays"
        @click="selected($event)"
      >
        前3日
      </button> -->
      <view class="calendar">
        <view style="display: flex; margin: 10px">
          <span @click="startopen" class="timeStyle">{{ pageStart }}</span>
          <uni-calendar
            ref="calendar"
            :insert="false"
            @confirm="onStartConfirm"
          />
        </view>
      </view>
      <span style="margin: 17px 10px; font-size: 14px">至</span>
      <view class="calendar">
        <view style="display: flex; margin: 10px">
          <span @click="endopen" class="timeStyle">{{ pageEnd }}</span>
          <uni-calendar
            ref="calendar2"
            :insert="false"
            @confirm="onEndConfirm"
          />
        </view>
      </view>
    </view>
    <!-- 卡片列表 -->
    <view class="charts-box">
      <qiun-data-charts type="demotype" :chartData="echartdata" />
    </view>
    <!-- 暂无数据 -->
    <!-- <view class="noData" v-if="isNoData">暂无数据</view> -->
  </view>
</template>
<script>
import { comparativeAnalysis } from "../../api/airPollution.js";
export default {
  components: {},
  data() {
    return {
      siteList: [],
      index: 0,
      siteId: "",
      type: "day",
      active: "auto",
      isNoData: false,
      factors: [],
      echartdata: {},
      tableFactorList: [],
      current: 1,
      size: 10,
      totalPage: 0,
      busy: false,
      start: new Date(),
      end: new Date(),
      pageStart: new Date(),
      pageEnd: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      loading: false,
      finished: false,
    };
  },
  methods: {
    startopen() {
      if (this.active != "auto") {
        uni.showToast({
          title: "点击无效",
        });
      } else {
        this.$refs.calendar.open();
      }
    },
    endopen() {
      if (this.active != "auto") {
        uni.showToast({
          title: "点击无效",
        });
      } else {
        this.$refs.calendar.open();
      }
    },
    checkboxChange(e) {
      this.tableFactorList = [];
      this.factors = e.detail.value;
      // this.getComparativeAnalysis();
    },
    formatSelectDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())}`;
    },
    onStartConfirm(date) {
      this.tableFactorList = [];
      this.pageStart = date.fulldate;
      if (this.pageStart > this.pageEnd) {
        this.pageEnd = date.fulldate;
      }
      this.getComparativeAnalysis();
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    onEndConfirm(date) {
      this.tableFactorList = [];
      this.pageEnd = date.fulldate;
      if (this.pageStart > this.pageEnd) {
        this.pageStart = date.fulldate;
      }
      this.getComparativeAnalysis();
    },
    // 趋势分析
    getComparativeAnalysis() {
      var stations = [];
      stations[0] = this.siteId;
      var row = {
        from: "2021-04-01",
        end: this.pageEnd,
        type: this.type,
        stations: stations,
        // factors: this.factors,
        factors: ["co"],
      };
      var that = this;
      comparativeAnalysis(row)
        .then(
          function (result) {
            let allRecords = result.data;
            // if (allRecords.length == 0) {
            //   this.isNoData = true;
            // }
            // else{
            var categories = allRecords.dateList;
            //         var series = [{
            // 	"name": "成交量A",
            // 	"data": [35, 8, 25, 37, 4, 20]
            // }, {
            // 	"name": "成交量B",
            // 	"data": [70, 40, 65, 100, 44, 68]
            // }, {
            // 	"name": "成交量C",
            // 	"data": [100, 80, 95, 150, 112, 132]
            // }]
            allRecords.dataList.forEach((val) => {
              series.push({ name: 成交量A, data: val });
            });
            that.echartdata.categories = categories;
            that.echartdata.series = series;

            // }
          },
          function (err) {
            console.log(err.data.msg);
          }
        )
        .catch(function (error) {});
    },
    // getServerData() {
    //   setTimeout(() => {
    //     this.echartdata.Line2 = JSON.parse(JSON.stringify(this.echartdata));
    //     this.$forceUpdate();
    //   }, 2000);
    // },
  },
  mounted: function () {
    this.pageStart = this.formatSelectDate(new Date(this.pageStart));
    this.pageEnd = this.formatSelectDate(new Date(this.pageEnd));
    this.getComparativeAnalysis();
    this.echartdata = {
      categories: ["2021-04-01", "2021-04-02", "2021-04-03", "2021-04-04", "2021-04-05", "2021-04-06"],
      series: [
        {
          name: "co",
          data: ["0.9", "0.8", "0.9", "0.8", "0.8"],
        },
        {
          name: "no2",
          data: ["33.0", "27.0", "24.0", "23.0", "44.0"],
        }
      ],
    };
  },
  onLoad(option) {
    // const item = JSON.parse(decodeURIComponent(option.item));
    this.siteId = JSON.parse(decodeURIComponent(option.siteId));
  },
};
</script>
<style scoped lang="scss">
@import "../../static/css/index.css";
.charts-box {
  width: 100%;
  height: 500rpx;
}
.van-search {
  padding: 2px 12px;
}
.header_search {
  margin: 8px 15px 0px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.calendar {
  margin: 10px 0px;
  height: 35px;
  width: 44%;
  // background: #A5A5A5;
  border-radius: 8px;
  border: 1px solid #a5a5a5;
}
.detailCards {
  width: 100%;
  margin-bottom: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.detailCard {
  margin: 0px 15px 10px 15px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 12px;
  padding-bottom: 10px;
}
.detailCard_header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 39px;
  padding-left: 4%;
  padding-right: 16%;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;
}
.header_title {
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  padding: 10px 0;
}
.button {
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
  height: 35px;
  width: 70px;
  margin-right: 10px;
}
.content_value_name {
  margin-left: 5px;
  height: 25px;
  font-size: 13px;
  font-weight: 400;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.content_value_name_length {
  margin-left: 5px;
  height: 25px;
  font-size: 2px;
  font-weight: 400;
  line-height: 15px;
  color: #000000;
  opacity: 1;
}
.content_value {
  height: 25px;
  font-size: 13px;
  font-weight: bold;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.content_value_red {
  height: 25px;
  font-size: 13px;
  font-weight: bold;
  line-height: 25px;
  color: #ff0000;
  opacity: 1;
}
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  margin-left: 2%;
}
.singleFactor {
  display: flex;
  // flex-wrap: wrap;
  justify-content: left;
  width: 48%;
  border-bottom: #dedede 1px dashed;
}
.singleFactorPoint {
  display: flex;
  justify-content: space-between;
  margin: 0 20%;
  // border-bottom: #dedede 1px dashed;
}
.timeStyle {
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  margin-top: 1px;
}
.disabledTime {
  font-size: 10px;
  background: grey;
}
.onlinePoint {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  opacity: 1;
  margin: 6px 0px;
}
.offlinePoint {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  opacity: 1;
  margin: 6px 0px;
}
</style>
