<template>
  <view class="main">
    <cu-custom bgColor="bg-gradual-pink" :isBack="true"
      ><block slot="backText">返回</block>
      <block slot="content">待办事项</block>
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
            >请选择企业：</text
          >
          <text class="content_value_name" v-if="siteList[index]">{{siteList[index].stationName}}</text>
        </picker>
      </view>
    </view>
    <!-- 时间 -->
    <view class="header_search">
      <view class="calendar">
        <view style="display: flex; margin: 10px">
          <span @click="startopen" class="timeStyle">{{ start }}</span>
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
          <span @click="endopen" class="timeStyle">{{ end }}</span>
          <uni-calendar
            ref="calendar2"
            :insert="false"
            @confirm="onEndConfirm"
          />
        </view>
      </view>
    </view>
    <!-- 列表 -->
    <scroll-view
      :scroll-top="scrollTop"
      scroll-y="true"
      class="scroll-Y"
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
    >
      <view class="detailCards">
        <view
          v-for="(item, iIndex) in tableFactorList"
          :key="iIndex"
          class="detailCard"
        >
          <view class="inlineFactor" v-if="menuurl == 'airPollution_index' ||menuurl == 'surfaceWater_index'">
            <view class="inlineFactorName">站点名：</view>
            <view class="inlineFactorValue">{{ item.stationName }}</view>
          </view>
          <view class="inlineFactor" v-else>
            <view class="inlineFactorName">企业：</view>
            <view class="inlineFactorValue">{{ item.enterpriseName }}</view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">预警编号：</view>
            <view class="inlineFactorValue">{{ item.number }}</view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">预警内容：</view>
            <view class="inlineFactorValue">{{ item.content }}</view>
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">污染因子：</view>
              <view class="factorValue">{{ item.name }}</view>
            </view>
            <view class="singleFactor">
              <view class="inlineFactorName">监测值：</view>
              <view class="inlineFactorValue">{{ item.value }}</view>
            </view>
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">单位：</view>
              <view class="factorValue">{{ item.unit }}</view>
            </view>
            <view class="singleFactor">
              <view class="inlineFactorName">阈值：</view>
              <view class="inlineFactorValue">{{ item.threshold }}</view>
            </view>
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">预警类型：</view>
              <view class="factorValue">{{ item.warnType }}</view>
            </view>
            <view class="singleFactor">
              <view class="inlineFactorName">预警状态：</view>
              <view class="inlineFactorValue">{{ item.statusLabel }}</view>
            </view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">监测时间：</view>
            <view class="inlineFactorValue">{{ item.updateTime }}</view>
          </view>
          <view class="cardButtons" v-if="menuurl == 'airPollution_index' ||menuurl == 'surfaceWater_index'">
            <button
              class="cu-btn round bg-green"
              size="mini"
              @click="showForm(item)"
            >
              {{item.statusLabel}}
            </button>
          </view>
          <view class="cardButtons" v-else>
          <button
            v-if="item.status == '1'"
            class="cu-btn round bg-green"
            size="mini"
            @click="dealForm(item)"
          >
            {{item.statusLabel}}
          </button>
        </view>
        </view>
      </view>
      <view class="noData" v-if="isNoData">暂无数据</view>
    </scroll-view>
    <bottomMenu url="airPollution_waiting"></bottomMenu>
    <view>
      <waitingForm
        v-if="abnormalFormHShow"
        @close="closeDialog()"
        :selectCard="selectCard"
        :isShow="abnormalFormHShow"
      ></waitingForm>
    </view>
    <view>
    <waterAndGasForm
      v-if="waterAndGasFormShow"
      @close="closeDialog()"
      :selectCard="selectCard"
      :isShow="waterAndGasFormShow"
    ></waterAndGasForm>
  </view>
  </view>
</template>
<script>
import waitingForm from "../components/waitingForm.vue"; //引入子组件
import waterAndGasForm from "../components/waterAndGasForm.vue"; //引入子组件
import bottomMenu from "../bottomMenu/index";
import {
  selectSiteByType,
  airWaringSelectPage,
  selectWaterSiteByType,
  pollutionWarningSelectPage,
} from "../../api/airPollution.js";
import {getWaterEnterpriseList} from "../../api/pollutionSurfaceWater.js";
import {getGasEnterpriseList} from "../../api/pollutionSurfaceGases.js";
export default {
  components: { bottomMenu, waitingForm,waterAndGasForm },
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      siteList: [],
      index: 0,
      siteId: "",
      isNoData: false,
      current: 1,
      size: 10,
      busy: false,
      start: new Date(),
      end: new Date(),
      loading: false,
      tableFactorList: [],
      abnormalFormHShow: false,
      waterAndGasFormShow: false,
      selectCard: {},
      menuurl:uni.getStorageSync('url')
    };
  },
  methods: {
    closeDialog() {
      this.abnormalFormHShow = false;
      this.waterAndGasFormShow = false;
      this.getList(this.siteId);
    },
    startopen() {
      this.$refs.calendar.open();
    },
    endopen() {
      this.$refs.calendar2.open();
    },
    upper: function (e) {
      console.log(e);
    },
    lower: function (e) {
      console.log(e);
    },
    scroll: function (e) {
      console.log(e);
      this.old.scrollTop = e.detail.scrollTop;
    },
    bindPickerChange(e) {
      this.tableFactorList = [];
      this.index = e.target.value;
      this.siteId = this.siteList[e.target.value].id;
      this.getList(this.siteId);
    },
    showForm(e) {
      this.abnormalFormHShow = true;
      this.selectCard = e;
    },
    dealForm(e){
      this.waterAndGasFormShow = true;
      this.selectCard = e;
    },
    formatSelectDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())}`;
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    onStartConfirm(date) {
      this.tableFactorList = [];
      this.start = date.fulldate;
      if (this.start > this.end) {
        this.end = date.fulldate;
      }
      this.getList(this.siteId);
    },
    onEndConfirm(date) {
      this.tableFactorList = [];
      this.end = date.fulldate;
      if (this.start > this.end) {
        this.start = date.fulldate;
      }
      this.getList(this.siteId);
    },
    // 加载更多
    loadMore() {
      let that = this;
      if (that.busy) {
      } else {
        setTimeout(() => {
          //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
          that.current++; //滚动之后加载第二页
          that.getList();
        }, 100);
      }
    },
    selectPort(e) {
      var that = this;
      if (that.menuurl == "airPollution_index") {
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
      } else if (
        that.menuurl == "surfaceWater_index") {
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
      }else if (that.menuurl == "pollutionSurfaceWater_index") {
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
      }else if (that.menuurl == "pollutionSurfaceGases_index") {
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
    // 获取列表
    getList(siteId) {
      var source = "";
      var processKey = "";
      if (this.menuurl == "airPollution_index") {
        source = "1";
        processKey = "air_warning";
        this.getAirWaringSelectPage(siteId,source,processKey)
      } else if (this.menuurl == "surfaceWater_index") {
        source = "2";
        processKey = "water_warning";
        this.getAirWaringSelectPage(siteId,source,processKey)
      } else if (this.menuurl == "pollutionSurfaceWater_index" || this.menuurl == "pollutionSurfaceGases_index") {
        processKey = "pollution_warning";
        this.getPollutionWarningSelectPage(siteId,processKey)
      }
    },
    getAirWaringSelectPage(siteId,source,processKey){
      var that = this;
      airWaringSelectPage(
        siteId,
        source,
        processKey,
        that.current,
        that.size,
        that.start,
        that.end
      ).then(
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
    },
    getPollutionWarningSelectPage(siteId,processKey){
      var that = this;
      pollutionWarningSelectPage(
        siteId,
        processKey,
        that.current,
        that.size,
        that.start,
        that.end
      ).then(
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
  mounted: function () {
    this.selectPort();
    this.start = this.formatSelectDate(new Date(this.start));
    this.end = this.formatSelectDate(new Date(this.end));
  },
};
</script>
<style scoped lang="scss">
@import "../../static/css/index.css";
.scroll-Y {
  height: 1000rpx;
}
.header_search {
  margin: 0 20px;
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
.timeStyle {
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  margin-top: 1px;
}
.van-search {
  padding: 2px 12px 5px 12px;
}
.button {
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
  height: 35px;
  width: 70px;
  margin-right: 10px;
}
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}

.detailCards {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin: 8px 15px;
  width: 90%;
  padding: 10px 5px;
  background-color: white;
  border-radius: 12px;
  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}

.factorList {
  height: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  margin-left: 5px;
  border-bottom: #dedede 1px dashed;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 50%;
}

.factorName {
  height: 100%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}

.factorValue {
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.inlineFactor {
  margin-left: 5px;
  display: flex;
  justify-content: left;
  align-items: left;
  border-bottom: #dedede 1px dashed;
  height: 25px;
}
.inlineFactorName {
  height: 100%;
  margin-left: 0px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.inlineFactorValue {
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}

.chartTitle {
  margin-top: 10px;
  margin-left: 20px;
}

.cardHr {
  width: 90%;
  padding-left: 5%;
}

.cardTitle {
  padding-left: 5%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;

  display: flex;
  justify-content: left;
  align-items: left;
}

.cardTitleIcon {
  width: 18px;
  height: 18px;
  background: #50e2c1;
  border-radius: 50%;
  opacity: 1;
}

.cardTitleWord {
  margin-left: 5px;
}

.newCard {
  width: 90%;
  height: 200px;
}
.cardsHeaderTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
}
.cardButtons {
  display: flex;
  flex-direction: row-reverse;
}
.solveButton {
  margin-right: 5%;
  background-color: #f56c6c;
  border-radius: 8px;
  height: 30px;
  //字体
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #ffffff;
  opacity: 1;
}
.exception {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  font-size: 15px;
  font-family: PingFang SC;
  opacity: 1;
  margin: 5px 15px;
}
.header_title {
  height: 17px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  padding: 10px 0;
}

.van-dropdown-menu {
  display: flex;
  height: 35px;
  background-color: #fff;
  -webkit-user-select: none;
  margin: 0 15px 10px 15px;
  border: 1px solid #a5a5a5;
  border-radius: 8px;
}
</style>
