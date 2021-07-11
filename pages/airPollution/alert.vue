<template>
  <view class="main">
    <cu-custom bgColor="bg-gradual-pink" :isBack="true"
      ><block slot="backText">返回上一级</block>
      <block slot="content">预警信息</block>
    </cu-custom>
    <!-- 企业 -->
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <picker
          @change="bindPickerChange"
          :range="siteList"
          :value="index"
          :range-key="'stationName'"
        >
          <text class="content_value_name" style="margin-left: 20px"
            >选择企业：</text>
          <text class="content_value_name" v-if="siteList[index]">{{
            siteList[index].stationName
          }}</text>
        </picker>
      </view>
    </view>
    <!-- 状态 -->
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <picker
          @change="statusPickerChange"
          :range="statusList"
          :value="sindex"
          :range-key="'status'"
        >
          <text class="content_value_name" style="margin-left: 20px"
            >选择状态：</text
          >
          <text class="content_value_name" v-if="statusList[sindex]">{{
            statusList[sindex].status
          }}</text>
        </picker>
      </view>
    </view>
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
    <!-- <view>
      <checkbox-group class="header_search" @change="checkboxChange">
        <label style="margin-right: 10px">
          <checkbox value="1" style="transform: scale(0.7)" />国控
        </label>
        <label style="margin-right: 10px">
          <checkbox value="2" style="transform: scale(0.7)" />省控
        </label>
        <label style="margin-right: 10px">
          <checkbox value="3" style="transform: scale(0.7)" />市控
        </label>
        <label style="margin-right: 10px">
          <checkbox value="4" style="transform: scale(0.7)" />区控
        </label>
      </checkbox-group>
    </view> -->
    <!-- 预警 -->
    <!-- <view style="margin: 10px 0">
      <checkbox-group class="header_search" @change="alertCheckboxChange">
        <label style="margin-right: 10px">
          <checkbox
            value="1"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />一级预警
        </label>
        <label style="margin-right: 15px">
          <checkbox
            value="2"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />二级预警
        </label>
        <label style="margin-right: 10px">
          <checkbox
            value="3"
            color="#FFCC33"
            style="transform: scale(0.7)"
          />报警
        </label>
      </checkbox-group>
    </view> -->
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
          <view class="inlineFactor">
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
        </view>
      </view>
    <view class="noData" v-if="isNoData" style="margin-bottom:10px;">暂无数据</view>
    </scroll-view>
    <bottomMenu url="airPollution_alert"></bottomMenu>
  </view>
</template>
<script>
import bottomMenu from "../bottomMenu/index";
import {
  selectStatusByType,
  getWarningList,
} from "../../api/airPollution.js";
import {getWaterEnterpriseList} from "../../api/pollutionSurfaceWater.js";
import {getGasEnterpriseList} from "../../api/pollutionSurfaceGases.js";
export default {
  components: { bottomMenu },
  data() {
    return {
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      siteList: [],
      index: 0,
      siteId: "",
      sindex: 0,
      statusList:[],
      statusId :"1",
      isNoData: false,
      date: "",
      current: 1,
      size: 10,
      busy: false,
      start: new Date(),
      end: new Date(),
      loading: false,
      tableFactorList: [],
    };
  },
  methods: {
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
      if(this.statusId==undefined){
        this.statusId="1"
      }
      this.getList(this.siteId);
    },
    statusPickerChange(e) {
      this.tableFactorList = [];
      this.sindex = e.target.value;
      this.statusId = this.statusList[e.target.value].id;
      this.getList(this.siteId);
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
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
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
    async selectPort(e) {
      var that = this;
      if(localStorage.getItem("url") == "pollutionSurfaceWater_index"){
        await getWaterEnterpriseList().then(
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
      }else if(localStorage.getItem("url") == "pollutionSurfaceGases_index"){
        await getGasEnterpriseList().then(
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
      selectStatusByType().then(
        function (result) {
          let list = result.data.data;
          for (let i = 0; i < list.length; i++) {
            that.statusList.push({
              id: list[i].dictKey,
              status: list[i].dictValue,
            });
          }
          that.statusId = that.statusList[0].dictKey;
        },
        function (err) {}
      );
    },
    // 获取列表
    getList(siteId) {
      var that = this;
      var processKey="pollution_warning"
      if(localStorage.getItem("url") == "pollutionSurfaceWater_index"){
        var source =4
      }else if(localStorage.getItem("url") == "pollutionSurfaceGases_index"){
        var source =3
      }
      getWarningList(that.start,that.end,processKey,source,that.statusId,siteId,that.current,that.size).then(
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
  height: 900rpx;
}
.van-search {
  padding: 2px 12px 5px 12px;
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
  font-size: 12px;
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

.timeStyle {
  font-size: 12px;
  font-weight: 500;
  margin-left: 5px;
  margin-top: 1px;
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
.cu-bar {
min-height: 40px;
}
</style>
