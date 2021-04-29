<template>
  <view class="main">
    <cu-custom bgColor="bg-gradual-pink" :isBack="true"
      ><block slot="backText">返回</block>
      <block slot="content">预警信息</block>
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
    <!-- <radio-group class="block" @change="RadioChange">
      <view class="cu-form-group">
        <view>
          <radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio><text style="margin-left:5px">当前异常</text>
          <radio class='margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio><text style="margin-left:5px">全部异常</text>
        </view>
      </view>
    </radio-group> -->
    <view>
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
    </view>
    <!-- 预警 -->
    <view style="margin: 10px 0">
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
          <view class="inlineFactor">
            <view class="inlineFactorName">站点名：</view>
            <view class="inlineFactorValue">{{ item.stationName }}</view>
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">预警编号：</view>
              <view class="factorValue">{{ item.number }}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName">预警内容：</view>
              <view class="factorValue">{{ item.content }}</view>
            </view>
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">监控因子：</view>
              <view class="factorValue">{{ item.name }}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName">预警类型：</view>
              <view class="factorValue">{{ item.type }}</view>
            </view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">预警值：</view>
            <view class="inlineFactorValue">{{ item.value }}</view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">创建时间：</view>
            <view class="inlineFactorValue">{{ item.createTime }}</view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">更新时间：</view>
            <view class="inlineFactorValue">{{ item.updateTime }}</view>
          </view>
          <!-- <view class="factorList">
                  <view class="singleFactor">
                      <view class="factorName">状态：</view>
                      <view class="factorValue">{{item.status==1?'已处理':'未处理'}}</view>
                  </view>
              </view> -->
          <view class="cardButtons">
            <button
              class="cu-btn round bg-green"
              size="mini"
              v-if="item.status == 1"
              @tab="showForm(item)"
            >
              查看
            </button>
            <button class="cu-btn round bg-red" v-else @tab="showForm(item)">
              审核
            </button>
          </view>
        </view>
      </view>
    <view class="noData" v-if="isNoData">暂无数据</view>
    </scroll-view>
    <bottomMenu url="airPollution_alert"></bottomMenu>
    <!-- <view>
    <abnormal-form v-if="abnormalFormHShow" @poupClose='listenPoupClose' :message="chooseRecord" :isShow="abnormalFormHShow"></abnormal-form>
    </view> -->
  </view>
</template>
<script>
// import abnormalForm from "@/components/abnormalForm"; //引入子组件
import bottomMenu from "../bottomMenu/index";
import {
  selectSiteByType,
  selectWaterSiteByType,
  getWarningList,
} from "../../api/airPollution.js";
export default {
  components: { bottomMenu },
  data() {
    return {
      radio: "A",
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      siteList: [],
      index: 0,
      siteId: "",
      type: "",
      kong: [],
      level: [],
      isNoData: false,
      active: "",
      date: "",
      show: false,
      current: 0,
      size: 10,
      busy: false,
      start: new Date(),
      end: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      loading: false,
      finished: false,
      tableFactorList: [],
      abnormalFormHShow: false,
      chooseRecord: {},
      alertType: "",
      isHandled: "",
      queryType: "1",
      st: "",
      startShow: false,
      endShow: false,
    };
  },
  methods: {
    startopen() {
      this.$refs.calendar.open();
    },
    endopen() {
      this.$refs.calendar.open();
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
    RadioChange(e) {
      this.radio = e.detail.value;
    },
    bindPickerChange(e) {
      this.tableFactorList = [];
      this.index = e.target.value;
      this.siteId = this.siteList[e.target.value].id;
      this.getList(this.siteId);
    },
    checkboxChange(e) {
      this.tableFactorList = [];
      this.kong = e.detail.value;
      this.getList(this.siteId);
    },
    alertCheckboxChange(e) {
      this.tableFactorList = [];
      this.level = e.detail.value;
      this.getList(this.siteId);
    },
    formatSelectDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())}`;
    },
    exceptionClick(e) {
      this.tableFactorList = [];
      this.current = 1;
      if (this.queryType == "1") {
        this.end = "";
        this.start = "";
      } else {
        this.end = this.formatSelectDate(new Date());
        this.start = this.getBeforeDate(7);
      }
      this.getList();
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    onStartConfirm(date) {
      debugger;
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
    alertTypeClick(e) {
      this.tableFactorList = [];
      this.current = 1;
      this.getList();
    },
    isHandledClick(e) {
      this.tableFactorList = [];
      this.current = 1;
      this.getList();
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    showForm(e) {
      this.abnormalFormHShow = true;
      this.chooseRecord = e;
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
      if (localStorage.getItem("url") == "airPollution_index") {
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
        localStorage.getItem("url") == "surfaceWater_index" ||
        localStorage.getItem("url") == "pollutionSurfaceWater_index"
      ) {
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
      }
    },
    // 获取列表
    getList(siteId) {
      var stations = [];
      stations[0] = siteId;
      var obj = {
        from: this.start,
        end: this.end,
        kong: this.kong,
        level: this.level,
        stations: stations,
      };
      var that = this;
      getWarningList(obj).then(
        function (result) {
          let list = result.data;
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
    // listenPoupClose(data) {
    //   this.abnormalFormHShow = false;
    //   //刷新列表
    //   this.current = 1;
    //   this.tableFactorList = [];
    //   this.getList();
    // },
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
  height: 730rpx;
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
</style>
