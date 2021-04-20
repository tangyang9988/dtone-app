<template>
  <view class="main">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">历史数据</block>
	</cu-custom>
	<view class="cu-bar search bg-white">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input  @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键词" confirm-type="search"></input>
		</view>
		<view class="action">
			<button class="cu-btn bg-green shadow-blur round">搜索</button>
		</view>
	</view>
    <!-- 搜索框展示搜索内容  searchContent-->
    <view v-if="isShowSearchContent">
      <van-cell
        size="large"
        v-for="(retlist, listIndex) in searchContent"
        :key="listIndex"
        :label="retlist.groupName"
        :title="retlist.deptName"
        :value="retlist.siteName"
        @click="selectPort(retlist)"
      />
    </view>
    <view class="header_search">
		<button class="cu-btn shadow-blur round" id="auto" :color="active == 'auto' ? '#ADC6FF' : ''" @tap="selected($event)">自定义</button>
		<button class="cu-btn shadow-blur round" id="fiveMinute" :color="active == 'auto' ? '#ADC6FF' : ''" @click="selected($event)">5分钟</button>
		<button class="cu-btn shadow-blur round bg-green" id="hour" @click="selected($event)">小时</button>
		<button class="cu-btn shadow-blur round" id="day" :color="active == 'auto' ? '#ADC6FF' : ''" @click="selected($event)">日</button>
		<button class="cu-btn shadow-blur round" id="threedays" :color="active == 'auto' ? '#ADC6FF' : ''" @click="selected($event)">前3日</button>
      <view class="calendar">
        <view style="display: flex; margin: 10px">
          <span @click="startShow = true" class="timeStyle" v-if="isAuto">{{
            pageStart
          }}</span>
          <span class="timeStyle" v-else>{{ pageStart }}</span>
          <!-- <van-calendar
            v-model="startShow"
            @confirm="onStartConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          /> -->
        </view>
      </view>
      <span style="margin: 17px 10px; font-size: 14px">至</span>
      <view class="calendar">
        <view style="display: flex; margin: 10px">
<!--          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 14px; width: 14px"
          /> -->
          <span @click="endShow = true" class="timeStyle" v-if="isAuto">{{
            pageEnd
          }}</span>
          <span class="timeStyle" v-else>{{ pageEnd }}</span>
          <!-- <van-calendar
            v-model="endShow"
            @confirm="onEndConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          /> -->
        </view>
      </view>
    </view>
    <view class="detailCard_header_point">
      <view class="header_title" style="margin-left: 5%">
        站点2（II）
      </view>
    </view>
    <!-- 卡片列表 -->
    <view
      class="lists"
    >
      <view v-for="(item, itemIndex) in tableFactorList" :key="itemIndex">
        <view class="detailCard">
          <view class="detailCard_header">
            <view class="header_title">
              {{ item.collTime }}
            </view>
          </view>
          <view  class="content">
            <view
              v-for="(value, key) in item.factorList"
              :key="key"
              class="singleFactor"
              >
              <view class="content_value_name_length" v-if="key.length > 7">
                {{ value.name }}：
              </view>
              <view class="content_value_name" v-else>{{ value.name }}：</view>
              <view class="content_value" v-if="value.isAbnormal==0">
                <view>{{ value.specialValue }}{{ value.unit }}</view>
              </view>
              <view class="content_value_red" v-else>
                <view>{{ value.specialValue }}{{ value.unit }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  <!-- 引入自定义菜单组件 -->
<bottomMenu url="airPollution_history"></bottomMenu>
    <view class="noData" v-if="isNoData">暂无数据</view>
  </view>
</template>
<script>
import Vue from 'vue'
import bottomMenu from '../bottomMenu/index'
import {getAqiRank} from "../../api/airPollution.js"
export default {
  components: {bottomMenu },
  data() {
    return {
      searchValue: "",
      deptId: "",
      id: "",
      point: "",
      selectMenu: "his",
      active: "auto",
      isAuto: true,
      startShow: false,
      endShow: false,
      current: 1,
      size: 10,
      totalPage:0,
      busy: false,
      start: new Date(),
      end: new Date(),
      pageStart: new Date(),
      pageEnd: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      loading: false,
      finished: false,
      tableFactorList: [
		 {
		    "id": "1380511467207426049",
		    "deptInfoId": null,
		    "deptName": "",
		    "siteId": "1293783181417250817",
		    "siteName": "站点2（II）",
		    "groupId": null,
		    "groupName": "",
		    "collTime": "2021-04-09 21:22:36",
		    "factorList": [
		      {
		        "id": "1380511466884464642",
		        "identify": null,
		        "deviceFactorId": "1293800494921154561",
		        "code": "w01001",
		        "name": "pH",
		        "unit": "",
		        "value": "6",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "6.00"
		      },
		      {
		        "id": "1380511466884464645",
		        "identify": null,
		        "deviceFactorId": "1293800572364783618",
		        "code": "w01010",
		        "name": "水温",
		        "unit": "",
		        "value": "24.621",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "24.6"
		      },
		      {
		        "id": "1380511466918019074",
		        "identify": null,
		        "deviceFactorId": "1295523989346627586",
		        "code": "w01003",
		        "name": "浊度",
		        "unit": "",
		        "value": "91.267",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "91"
		      },
		      {
		        "id": "1380511466947379201",
		        "identify": null,
		        "deviceFactorId": "1293800622637711361",
		        "code": "w01014",
		        "name": "电导率",
		        "unit": "",
		        "value": "49.189",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "49"
		      },
		      {
		        "id": "1380511466964156418",
		        "identify": null,
		        "deviceFactorId": "1293800738287255553",
		        "code": "w01019",
		        "name": "高锰酸盐指数",
		        "unit": "",
		        "value": "4",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "4.00"
		      },
		      {
		        "id": "1380511466972545026",
		        "identify": null,
		        "deviceFactorId": "1293800520447688705",
		        "code": "w01009",
		        "name": "溶解氧",
		        "unit": "",
		        "value": "6",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "6.00"
		      },
		      {
		        "id": "1380511466972545027",
		        "identify": null,
		        "deviceFactorId": "1293800706829975554",
		        "code": "w01018",
		        "name": "化学需氧量",
		        "unit": "",
		        "value": "15",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "15.00"
		      },
		      {
		        "id": "1380511467010293762",
		        "identify": null,
		        "deviceFactorId": "1293800666241695746",
		        "code": "w01017",
		        "name": "五日生化需氧量",
		        "unit": "",
		        "value": "3",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "3.00"
		      },
		      {
		        "id": "1380511467022876674",
		        "identify": null,
		        "deviceFactorId": "1295523780327682050",
		        "code": "w21003",
		        "name": "氨氮",
		        "unit": "",
		        "value": "0.5",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "0.50"
		      },
		      {
		        "id": "1380511467027070978",
		        "identify": null,
		        "deviceFactorId": "1295523811482972162",
		        "code": "w21011",
		        "name": "总磷",
		        "unit": "",
		        "value": "0.1",
		        "amenVal": null,
		        "flag": "N",
		        "source": 1,
		        "status": 1,
		        "isAbnormal": 0,
		        "auditStatus": null,
		        "modificationMethod": null,
		        "specialValue": "0.10"
		      }
		    ],
		    "factorMap": {}
		  },
		   {
		      "id": "1380508950444670978",
		      "deptInfoId": null,
		      "deptName": "",
		      "siteId": "1293783181417250817",
		      "siteName": "站点2（II）",
		      "groupId": null,
		      "groupName": "",
		      "collTime": "2021-04-09 21:12:36",
		      "factorList": [
		        {
		          "id": "1380508950184624130",
		          "identify": null,
		          "deviceFactorId": "1293800494921154561",
		          "code": "w01001",
		          "name": "pH",
		          "unit": "",
		          "value": "8.273",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "8.27"
		        },
		        {
		          "id": "1380508950230761473",
		          "identify": null,
		          "deviceFactorId": "1293800572364783618",
		          "code": "w01010",
		          "name": "水温",
		          "unit": "",
		          "value": "24.621",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "24.6"
		        },
		        {
		          "id": "1380508950247538689",
		          "identify": null,
		          "deviceFactorId": "1295523989346627586",
		          "code": "w01003",
		          "name": "浊度",
		          "unit": "",
		          "value": "91.267",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "91"
		        },
		        {
		          "id": "1380508950260121602",
		          "identify": null,
		          "deviceFactorId": "1293800622637711361",
		          "code": "w01014",
		          "name": "电导率",
		          "unit": "",
		          "value": "49.189",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "49"
		        },
		        {
		          "id": "1380508950272704514",
		          "identify": null,
		          "deviceFactorId": "1293800738287255553",
		          "code": "w01019",
		          "name": "高锰酸盐指数",
		          "unit": "",
		          "value": "2.546",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "2.55"
		        },
		        {
		          "id": "1380508950285287425",
		          "identify": null,
		          "deviceFactorId": "1293800520447688705",
		          "code": "w01009",
		          "name": "溶解氧",
		          "unit": "",
		          "value": "7.49",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "7.49"
		        },
		        {
		          "id": "1380508950297870337",
		          "identify": null,
		          "deviceFactorId": "1293800706829975554",
		          "code": "w01018",
		          "name": "化学需氧量",
		          "unit": "",
		          "value": "14.025",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "14.03"
		        },
		        {
		          "id": "1380508950310453250",
		          "identify": null,
		          "deviceFactorId": "1293800666241695746",
		          "code": "w01017",
		          "name": "五日生化需氧量",
		          "unit": "",
		          "value": "2.684",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "2.68"
		        },
		        {
		          "id": "1380508950323036161",
		          "identify": null,
		          "deviceFactorId": "1295523780327682050",
		          "code": "w21003",
		          "name": "氨氮",
		          "unit": "",
		          "value": "0.259",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "0.26"
		        },
		        {
		          "id": "1380508950335619074",
		          "identify": null,
		          "deviceFactorId": "1295523811482972162",
		          "code": "w21011",
		          "name": "总磷",
		          "unit": "",
		          "value": "0.091",
		          "amenVal": null,
		          "flag": "N",
		          "source": 1,
		          "status": 1,
		          "isAbnormal": 0,
		          "auditStatus": null,
		          "modificationMethod": null,
		          "specialValue": "0.09"
		        }
		      ],
		      "factorMap": {}
		    },


	  ],
      isShowSearchContent: false,
      searchContent: [],
      platFormId: "",
      isNoData: false,
    };
  },
  methods: {
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
    getNextDate(date, day) {
      var timeString = String(date).split(" ")[1];
      var time = new Date().getTime() - day*24 * 60 * 60 * 1000;
      var dd = new Date(time);
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      // var h = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
      // var minute =
      //   dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
      // var ss = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
      return y + "-" + m + "-" + d + " " + timeString;
    },
    onStartConfirm(date) {
      this.startShow = false;
      this.tableFactorList = [];
      this.current = 1;
      this.start = this.formatSelectDate(date) + " 00:00:00";
      this.pageStart = this.formatSelectDate(date);
      if (this.pageStart > this.pageEnd) {
        // Toast({
        //   message: "开始时间必须小于结束时间！",
        //   duration: 2000,
        // });
        this.pageEnd = this.formatSelectDate(date);
        this.end = this.formatSelectDate(date) + " 23:59:59";
      }
      this.getList(this.deptId);
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    onEndConfirm(date) {
      this.endShow = false;
      this.tableFactorList = [];
      this.current = 1;
      this.pageEnd = this.formatSelectDate(date);
      this.end = this.formatSelectDate(date) + " 23:59:59";
      if (this.pageStart > this.pageEnd) {
        this.start = this.formatSelectDate(date) + " 00:00:00";
        this.pageStart = this.formatSelectDate(date);
      }
      this.getList(this.deptId);
    },
    selected(e) {
      let curDate = new Date();
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "auto") {
        this.isAuto = true;
        this.start = this.formatSelectDate(curDate) + " 00:00:00";
        this.end = this.formatSelectDate(curDate) + " 23:59:59";
        this.pageStart = this.formatSelectDate(curDate);
        this.pageEnd = this.formatSelectDate(curDate);
        this.tableFactorList = [];
        this.current = 1;
        this.getList();
      } else if (id == "24") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate), 1);
        this.end = this.formatDate(curDate);
        this.pageStart = this.getNextDate(this.formatDate(curDate), 1);
        this.pageEnd = this.formatDate(curDate);
        this.tableFactorList = [];
        this.current = 1;
        this.getList();
      } else if (id == "48") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate), 2);
        this.end = this.formatDate(curDate);
        this.pageStart = this.getNextDate(this.formatDate(curDate), 2);
        this.pageEnd = this.formatDate(curDate);
        this.tableFactorList = [];
        this.current = 1;
        this.getList();
      } else if (id == "96") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate), 4);
        this.end = this.formatDate(curDate);
        this.pageStart = this.getNextDate(this.formatDate(curDate), 4);
        this.pageEnd = this.formatDate(curDate);
        this.tableFactorList = [];
        this.current = 1;
        this.getList();
      }
    },
    // 加载更多
    loadMore() {
    this.isNoData = false;
      if (this.current >= this.totalPage) {
        this.isNoData = true;
        return false;
      }
      this.busy = true;
      setTimeout(() => {
        this.current++;
        this.getList();
        this.busy = false;
      }, 1000);

    },
    // 头部检索
    onSearch() {
      this.isShowSearchContent = true;
    },
    // pointsList() {
    //   var that = this;
    //   searchPoints(that.platFormId, that.searchValue).then(
    //     function (result) {
    //       if (result.data) {
    //         that.searchContent = result.data.data;
    //         if (that.platFormId == "99") {
    //           that.deptId = result.data.data[0].groupId
    //           that.point =
    //             result.data.data[0].deptName +
    //             "-" +
    //             result.data.data[0].siteName+ 
    //             "-" +
    //             result.data.data[0].groupName;
    //         } else {
    //           that.deptId = result.data.data[0].siteId
    //           that.point =
    //             result.data.data[0].deptName +
    //             "-" +
    //             result.data.data[0].siteName;
    //         }
    //         that.getList()
    //       }
    //     },
    //     function (err) {
    //       Toast.fail("请求异常");
    //     }
    //   );
    //   console.log(that.deptId)
    // },
    //选择站点
    selectPort(e) {
      this.tableFactorList = [];
      this.current = 1;
      if (this.platFormId == 99) {
        this.deptId = e.groupId;
        if(e.groupName==""){
          this.point = e.deptName + "-" + e.siteName;
          this.isNoData = true;
        }else{
          this.point = e.deptName + "-" + e.siteName+ "-" + e.groupName;
          this.getList(this.deptId);
        }
        
      } else {
        this.deptId = e.siteId;
        this.point = e.deptName + "-" + e.siteName;
        this.getList(this.deptId);
      }
      this.isShowSearchContent = false;
    },
    // 获取列表
    getList() {
      var that = this;
        getAqiRank("1349263116055089153").then(
          function (result) {
            let list = result.data.data;
            if (list.length == 0) {
              that.isNoData = true;
              console.log(that.isNoData);
            }
            for (let i = 0; i < list.length; i++) {
              that.tableFactorList.push(list[i]);
            }
          },
          function (err) {
            Toast.fail("请求异常");
          }
        )
    },
  },
  mounted: function () {
      this.pageStart = this.formatSelectDate(new Date(this.pageStart));
      this.pageEnd = this.formatSelectDate(new Date(this.pageEnd));
      this.start = this.formatSelectDate(new Date(this.start)) + " 00:00:00";
      this.end = this.formatSelectDate(new Date(this.end)) + " 23:59:59";
      this.getList()
  },
};
</script>
<style scoped lang="scss">
// @import "../../assets/styles/common.scss";
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
.detailCard {
  margin: 0px 15px 10px 15px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 12px;
  padding-bottom: 10px;
}
.detailCard_header_point {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  height: 39px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 12px 12px;
  margin: 0px 15px 10px 15px;
}
.detailCard_header {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  height: 39px;
  padding-left:10px;
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
  color: #FF0000;
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
// .search{
// height: 30px;
// margin: 10px 15px;
// background: #FFFFFF;
// border: 1px solid #A5A5A5;
// opacity: 1;
// border-radius: 8px;
// }
</style>
