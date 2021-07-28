<template>
  <view class="main">
    <cu-custom bgColor="bg-gradual-pink" :isBack="true"
      ><block slot="backText">返回上一级</block>
      <block slot="content">历史数据</block>
    </cu-custom>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <picker
          @change="bindPickerChange"
          :range="siteList"
          :value="index"
          :range-key="'stationName'"
        >
          <text class="content_value_name" style="margin-left: 20px"
            >请选择站点：</text
          >
          <text class="content_value_name" v-if="siteList[index]">{{
            siteList[index].stationName
          }}</text>
        </picker>
      </view>
    </view>
    <view class="header_search">
      <button
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
        分钟
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
      </button>
        <view class="calendar">
          <view style="display: flex; margin: 10px">
            <span @click="startopen" class="timeStyle">{{
              pageStart
            }}</span>
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
            <span @click="endopen" class="timeStyle">{{
              pageEnd
            }}</span>
            <uni-calendar
              ref="calendar2"
              :insert="false"
              @confirm="onEndConfirm"
            />
          </view>
        </view>
    </view>
    <!-- 卡片列表 -->
    <view
      class="lists"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="20"
    >
    <view class="detailCards">
      <view v-for="(item, itemIndex) in tableFactorList" :key="itemIndex">
        <view class="detailCard" v-if="menuType == 'airPollution_index'">
          <view class="detailCard_header">
            <view class="header_title">
              {{ item.stationName }}
            </view>
            <view class="header_title">
              {{ item.updateTime }}
            </view>
            <!-- <view class="header_title">
              <view>趋势分析</view>
            </view>
            <view class="header_title ">
              <img  src="../../static/images/icon/icon_data.png" class="icon_data" @click="historyData(item)"></img>
            </view> -->
          </view>
          <view class="content">
            <view class="singleFactor">
              <view class="content_value_name">AQI：</view>
              <view class="content_value">
                <view>{{ item.aqi }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">CO：</view>
              <view class="content_value">
                <view>{{ item.CO }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">NO：</view>
              <view class="content_value">
                <view>{{ item.no }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">NO2：</view>
              <view class="content_value">
                <view>{{ item.no2 }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">O3：</view>
              <view class="content_value">
                <view>{{ item.o3 }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">PM2.5：</view>
              <view class="content_value">
                <view>{{ item.pm25 }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">PM10：</view>
              <view class="content_value">
                <view>{{ item.pm10 }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">SO2：</view>
              <view class="content_value">
                <view>{{ item.so2 }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="detailCard" v-else>
          <view class="detailCard_header">
            <view class="header_title">
              {{ item.stationName }}
            </view>
            <view class="header_title">
              {{ item.updateTime }}
            </view>
          </view>
          <view class="content">
            <view class="singleFactor">
              <view class="content_value_name">ad：</view>
              <view class="content_value">
                <view>{{ item.ad }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">cf：</view>
              <view class="content_value">
                <view>{{ item.cf }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">codmn：</view>
              <view class="content_value">
                <view>{{ item.codmn }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">do：</view>
              <view class="content_value">
                <view>{{ item.do }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">ec：</view>
              <view class="content_value">
                <view>{{ item.ec }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">ph：</view>
              <view class="content_value">
                <view>{{ item.ph }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">sw：</view>
              <view class="content_value">
                <view>{{ item.sw }}</view>
              </view>
            </view>
            <view class="singleFactor">
              <view class="content_value_name">tub：</view>
              <view class="content_value">
                <view>{{ item.tub }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    </view>
    <!-- 暂无数据 -->
    <view class="noData" v-if="isNoData">暂无数据</view>
    <!-- 引入自定义菜单组件 -->
    <bottomMenu url="airPollution_history"></bottomMenu>
  </view>
</template>
<script>
import bottomMenu from "../bottomMenu/index";
import {
  selectSiteByType,
  selectWaterSiteByType,
  getHistoryList
} from "../../api/airPollution.js";
import { getSurfaceWaterHistoryList } from "../../api/surfaceWater.js";
import { getPollutionSurfaceWaterHistoryList,getWaterEnterpriseList } from "../../api/pollutionSurfaceWater.js";
import { getPollutionWasteGasHistoryList, getGasEnterpriseList} from "../../api/pollutionSurfaceGases.js";

export default {
  components: { bottomMenu },
  data() {
    return {
      siteList: [],
      index: 0,
      siteId: "",
      type: "hour",
      active: "auto",
      isNoData: false,
      selectMenu: "his",
      menuType: "",
      isAuto: true,
      startShow: false,
      endShow: false,
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
      tableFactorList: [],
    };
  },
  methods: {
    startopen() {
      if (this.active != "auto") {
      } else {
        this.$refs.calendar.open();
      }
    },
    endopen() {
      if (this.active != "auto") {
      } else {
        this.$refs.calendar2.open();
      }
    },
    bindPickerChange(e) {
      this.tableFactorList = [];
      this.index = e.target.value;
      this.siteId = this.siteList[e.target.value].id;
      console.log(this.siteId);
      this.getList(this.siteId);
    },
    formatSelectDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())}`;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())} ${this.timeAdd(
        date.getHours()
      )}:${this.timeAdd(date.getMinutes())}:${this.timeAdd(date.getSeconds())}`;
    },
    onStartConfirm(date) {
      this.tableFactorList = [];
      this.pageStart = date.fulldate;
      if (this.pageStart > this.pageEnd) {
        this.pageEnd = date.fulldate;
      }
      this.getList(this.siteId);
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    getNextDate(date, day) {
      var timeString = String(date).split(" ")[1];
      var time = new Date().getTime() - day*24 * 60 * 60 * 1000;
      var dd = new Date(time);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return y + "-" + m + "-" + d;
    },
    onEndConfirm(date) {
      this.tableFactorList = [];
      this.pageEnd = date.fulldate;
      if (this.pageStart > this.pageEnd) {
        this.pageStart = date.fulldate;
      }
      this.getList(this.siteId);
    },
    selected(e) {
      let curDate = new Date();
      let id = e.currentTarget.dataset.cur;
      this.active = id;
      if (id == "auto") {
        this.type = "hour";
      } else if (id == "hour") {
        this.type = "hour";
      } else if (id == "fiveMinute") {
        this.type = "min";
      } else if (id == "day") {
        this.type = "day";
        this.pageStart = this.getNextDate(this.formatSelectDate(curDate), 1);
        this.pageEnd = this.formatSelectDate(curDate);
      }else if(id == 'threedays'){
        this.pageStart = this.getNextDate(this.formatSelectDate(curDate), 3);
        this.pageEnd = this.formatSelectDate(curDate);
      }
      this.tableFactorList = [];
      this.getList(this.siteId);
    },
    historyData(item) {
      const siteId = this.siteId;
      setTimeout(function () {
        uni.navigateTo({
          url:
            "/pages/airPollution/trendanalysis?item=" +
            encodeURIComponent(JSON.stringify(item)) +
            "&siteId=" +
            encodeURIComponent(JSON.stringify(siteId)),
        });
      }, 500);
      // var groupId = e.siteId;
      // var start = e.collectTime.split(" ")[0];
      // var end = e.collectTime.split(" ")[0];
      // var point = e.deptName +"-" + e.siteName;
      // this.$router.push({
      //   path: "/surfaceWater/history",
      //   query: { groupId: groupId, point: point, start: start, end: end },
      // });
    },
    // 加载更多
    // loadMore() {
    // this.isNoData = false;
    //   if (this.current >= this.totalPage) {
    //     this.isNoData = true;
    //     return false;
    //   }
    //   this.busy = true;
    //   setTimeout(() => {
    //     this.current++;
    //     this.getList();
    //     this.busy = false;
    //   }, 1000);
    // },
    //选择站点
    selectPort(e) {
      var that = this;
      if (uni.getStorageSync("url") == "airPollution_index") {
        selectSiteByType().then(
          function (result) {
            let list = result.data.data;
            for (let i = 0; i < list.length; i++) {
              that.siteList.push({
                id: list[i].id,
                stationName: list[i].stationName,
              });
              that.siteId = that.siteList[0].id;
            }
            that.getList(that.siteId);
          },
          function (err) {}
        );
      } else if (uni.getStorageSync("url") == "surfaceWater_index") {
        selectWaterSiteByType().then(
          function (result) {
            let list = result.data.data;
            for (let i = 0; i < list.length; i++) {
              that.siteList.push({
                id: list[i].id,
                stationName: list[i].stationName,
              });
              that.siteId = that.siteList[0].id;
            }
            that.getList(that.siteId);
          },
          function (err) {}
        );
      } else if (uni.getStorageSync("url") == "pollutionSurfaceWater_index") {
        getWaterEnterpriseList().then(
          function (result) {
            let list = result.data;
            for (let i = 0; i < list.length; i++) {
              that.siteList.push({
                id: list[i].value,
                stationName: list[i].label,
              });
              that.siteId = that.siteList[0].id;
            }
            that.getList(that.siteId);
          },
          function (err) {}
        );
      }else if (uni.getStorageSync("url") == "pollutionSurfaceGases_index") {
        getGasEnterpriseList().then(
          function (result) {
            let list = result.data;
            for (let i = 0; i < list.length; i++) {
              that.siteList.push({
                id: list[i].value,
                stationName: list[i].label,
              });
              that.siteId = that.siteList[0].id;
            }
            that.getList(that.siteId);
          },
          function (err) {}
        );
      }
    },
    // 空气--历史数据列表
    getList(siteId) {
      // var stations = [];
      // var date = [];
      // stations[0] = siteId;
      // date[0] = this.pageStart;
      // date[1] = this.pageEnd;
      var row = {
        dataType: this.type,
        date:[this.pageStart,this.pageEnd],
        stations: [siteId],
      };
      debugger
      console.log(row)
      var that = this;
      if (uni.getStorageSync("url") == "airPollution_index") {
        getHistoryList(row).then(
          function (result) {
            let list = result.data.data.records;
            if (list.length == 0) {
              that.isNoData = true;
            }
            if (list) {
              for (let i = 0; i < list.length; i++) {
                that.tableFactorList.push(list[i]);
              }
            }
          },
          function (err) {}
        );
      } else if (uni.getStorageSync("url") == "surfaceWater_index") {
        var stations = [];
        var date = [];
        stations[0] = siteId;
        date[0] = this.pageStart;
        date[1] = this.pageEnd;
        var row = {
          dataType: this.type,
          date,
          stations: stations,
        };
        getSurfaceWaterHistoryList(row).then(
          function (result) {
            let list = result.data.data.records;
            if (list.length == 0) {
              that.isNoData = true;
            }
            if (list) {
              for (let i = 0; i < list.length; i++) {
                that.tableFactorList.push(list[i]);
              }
            }
          },
          function (err) {}
        );
      } else if (uni.getStorageSync("url") == "pollutionSurfaceWater_index") {
        var date=[]
        date[0] = this.pageStart;
        date[1] = this.pageEnd;
        var row = {
          enterpriseId:siteId,
          date:date,
          dataType: this.type,
          current:this.current,
          size: this.size,
        };
        getPollutionSurfaceWaterHistoryList(row).then(
          function (result) {
    
            let list = result.data.data.records;
            if (list.length == 0) {
              that.isNoData = true;
            }
            if (list) {
              for (let i = 0; i < list.length; i++) {
                that.tableFactorList.push(list[i]);
              }
            }
          },
          function (err) {}
        );
      }else if (uni.getStorageSync("url") == "pollutionSurfaceGases_index") {
        var date=[]
        date[0] = this.pageStart;
        date[1] = this.pageEnd;
        var row = {
          enterpriseId:siteId,
          date:date,
          dataType: this.type,
          current:this.current,
          size: this.size,
        };
        getPollutionWasteGasHistoryList(row).then(
          function (result) {
            let list = result.data.data.records;
            if (list.length == 0) {
              that.isNoData = true;
            }
            if (list) {
              for (let i = 0; i < list.length; i++) {
                that.tableFactorList.push(list[i]);
              }
            }
          },
          function (err) {}
        );
      }
    },
  },
  mounted: function () {
    this.selectPort();
    this.pageStart = this.formatSelectDate(new Date(this.pageStart));
    this.pageEnd = this.formatSelectDate(new Date(this.pageEnd));
    this.menuType = uni.getStorageSync("url");
  },
};
</script>
<style scoped lang="scss">
@import "../../static/css/index.css";
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
  margin-top: 10px;
  padding-bottom:40px;
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
  flex-wrap: nowrap;
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
