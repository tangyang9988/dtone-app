<template>
  <view class="main">
    <cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
      <block slot="content">站点报表</block>
    </cu-custom>
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入关键词" confirm-type="search"></input>
      </view>
      <view class="action">
        <button class="cu-btn bg-green shadow-blur round">搜索</button>
      </view>
    </view>

    <view class="header_search">
      <view class="calendar">
        <view style="display:flex;margin:10px">
          <span class="timeStyle" @click="startShow = true">{{
            pageStart
          }}</span>
          <!-- <span class="timeStyle" v-else>{{ start }}</span> -->
          <!-- <van-calendar
            v-model="startShow"
            @confirm="onStartConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          /> -->
        </view>
      </view>
      <button
        class="cu-btn round"
        :color="active == 'auto' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >自定义</button>
      <!-- <van-button
        size="small"
        class="button"
        id="week"
        :color="active == 'week' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >周</van-button
      >
      <van-button
        size="small"
        class="button"
        id="month"
        :color="active == 'month' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >月</van-button>
      <van-button
        size="small"
        class="button"
        id="year"
        :color="active == 'year' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >年</van-button> -->
    </view>
    <view class="detailCard_header_point">
      <view class="header_title" style="margin-left:5%">
        南湖小学监测站点1
      </view>
    </view>
    <!-- 空气列表 -->
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower">
      <view class="lists">
        <view v-for="(item, itIndex) in reportList" :key="itIndex">
          <view class="detailCard">
            <view class="detailCard_header">
              <view class="header_title" style="margin-left:5%">
                {{ item.statTime }}
              </view>
            </view>
            <view style="margin:0px;20px">
              <view
                v-for="(factor, factorIndex) in item.factorList"
                :key="factorIndex"
              >
                <view class="content_factorName">
                  {{ factor.head }}{{ factor.airType }}
                </view>
                <view class="display_row">
                  <view style="width:70%">
                    <span class="content_value_name" v-if="factor.avg==null"></span>
                    <!-- <span class="content_value_name" v-esle> {{ factor.avg }}{{ factor.unit }}：</span> -->
                    <span class="content_value">{{ factor.avgVal }}</span>
                  </view>
                  <view style="width:30%">
                    <span class="content_value_name" v-if="factor.qi==null"></span>
                    <span class="content_value_name" v-else>{{ factor.qi }}：</span>
                    <span class="content_value">{{ factor.aqiVal }}</span>
                  </view>
                </view>
                <view class="display_row" style="width: 57%">
                </view>
                <view class="line"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="noData" v-if="isNoData">暂无数据</view>
<bottomMenu url="airPollution_siteReport"></bottomMenu>
  </view>
</template>
<script>
import bottomMenu from '../bottomMenu/index'
export default {
  components: {bottomMenu},
  data() {
    return {
      scrollTop: 0,
      searchValue:"",
      id: "",
      deptId :"",
      point: "",
      active: "auto",
      selectMenu:"point",
      isAuto:true,
      type:2,
      busy:false,
      current: 0,
      size: 10,
      startShow: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      start: new Date(),
      pageStart: new Date(),
      loading: false,
      finished: false,
      reportList: [
          {
    "siteId": -1,
    "siteName": "南湖小学监测站点1",
    "groupId": null,
    "groupName": "",
    "statTime": "2021-04-10 14:00:00",
    "originalStatTime": "",
    "aqiVal": "72",
    "aqiLevel": 2,
    "type": "良",
    "color": "",
    "factorList": [
      {
        "factorCode": "",
        "avgVal": "13.567",
        "aqiVal": "5",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "二氧化硫(SO₂)",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700383540101122",
        "aqiSort": "5.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 1,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "54.267",
        "aqiVal": "28",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "二氧化氮(NO₂)",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700366028881922",
        "aqiSort": "28.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 2,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "86.167",
        "aqiVal": "",
        "aqiLevel": 2,
        "qi": null,
        "name": "",
        "head": "颗粒物(粒径小于等于10µm)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700427936808961",
        "aqiSort": -1,
        "statTime": "2021-04-10T14:00:00",
        "order": 3,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "1.667",
        "aqiVal": "17",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "一氧化碳(CO)",
        "avg": "浓度/",
        "unit": "(mg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700412073951233",
        "aqiSort": "17.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 5,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "46.383",
        "aqiVal": "15",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "臭氧(O₃)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700486032113665",
        "aqiSort": "15.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 6,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "34.083",
        "aqiVal": "",
        "aqiLevel": 1,
        "qi": null,
        "name": "",
        "head": "颗粒物(粒径小于等于2.5µm)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700462661451777",
        "aqiSort": -1,
        "statTime": "2021-04-10T14:00:00",
        "order": 8,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "43.121",
        "aqiVal": "22",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "臭氧(O₃)8小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "8小时滑动平均",
        "deviceFactorId": "1325700486032113665",
        "aqiSort": "22.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 7,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "34.038",
        "aqiVal": "49",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "颗粒物(粒径小于等于2.5µm)24小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "24小时滑动平均",
        "deviceFactorId": "1325700462661451777",
        "aqiSort": "49.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 9,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "92.408",
        "aqiVal": "72",
        "aqiLevel": 2,
        "qi": "分指数",
        "name": "",
        "head": "颗粒物(粒径小于等于10µm)24小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "24小时滑动平均",
        "deviceFactorId": "1325700427936808961",
        "aqiSort": "72.000",
        "statTime": "2021-04-10T14:00:00",
        "order": 4,
        "type": -1
      }
    ],
    "primaryFactor": "PM10",
    "word": "二级"
  },
  {
    "siteId": -1,
    "siteName": "南湖小学监测站点1",
    "groupId": null,
    "groupName": "",
    "statTime": "2021-04-10 13:00:00",
    "originalStatTime": "",
    "aqiVal": "72",
    "aqiLevel": 2,
    "type": "良",
    "color": "",
    "factorList": [
      {
        "factorCode": "",
        "avgVal": "14.400",
        "aqiVal": "5",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "二氧化硫(SO₂)",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700383540101122",
        "aqiSort": "5.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 1,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "53.750",
        "aqiVal": "27",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "二氧化氮(NO₂)",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700366028881922",
        "aqiSort": "27.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 2,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "94.833",
        "aqiVal": "",
        "aqiLevel": 2,
        "qi": null,
        "name": "",
        "head": "颗粒物(粒径小于等于10µm)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700427936808961",
        "aqiSort": -1,
        "statTime": "2021-04-10T13:00:00",
        "order": 3,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "1.217",
        "aqiVal": "13",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "一氧化碳(CO)",
        "avg": "浓度/",
        "unit": "(mg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700412073951233",
        "aqiSort": "13.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 5,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "42.500",
        "aqiVal": "14",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "臭氧(O₃)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700486032113665",
        "aqiSort": "14.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 6,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "33.117",
        "aqiVal": "",
        "aqiLevel": 1,
        "qi": null,
        "name": "",
        "head": "颗粒物(粒径小于等于2.5µm)1小时平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "1小时平均",
        "deviceFactorId": "1325700462661451777",
        "aqiSort": -1,
        "statTime": "2021-04-10T13:00:00",
        "order": 8,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "43.121",
        "aqiVal": "22",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "臭氧(O₃)8小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "8小时滑动平均",
        "deviceFactorId": "1325700486032113665",
        "aqiSort": "22.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 7,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "34.038",
        "aqiVal": "49",
        "aqiLevel": 1,
        "qi": "分指数",
        "name": "",
        "head": "颗粒物(粒径小于等于2.5µm)24小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "24小时滑动平均",
        "deviceFactorId": "1325700462661451777",
        "aqiSort": "49.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 9,
        "type": -1
      },
      {
        "factorCode": "",
        "avgVal": "92.408",
        "aqiVal": "72",
        "aqiLevel": 2,
        "qi": "分指数",
        "name": "",
        "head": "颗粒物(粒径小于等于10µm)24小时滑动平均",
        "avg": "浓度/",
        "unit": "(μg/m³)",
        "airType": "24小时滑动平均",
        "deviceFactorId": "1325700427936808961",
        "aqiSort": "72.000",
        "statTime": "2021-04-10T13:00:00",
        "order": 4,
        "type": -1
      }
    ],
    "primaryFactor": "PM10",
    "word": "二级"
  },
      ],
      factorList:[],
      isShowSearchContent: false,
      searchContent: [],
      platFormId:"",
      isNoData:false,
      factorActive: 0,
      factorId:0,
    };
  },
  methods: {
    upper: function (e) {
      console.log(e);
    },
    lower: function (e) {
      console.log(e);
    },
    selectFactorId(id){
    this.factorActive=id
    this.factorId=id;
    },
    formatYear(date) {
      return `${date.getFullYear()}`;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${
        this.timeAdd(date.getMonth() + 1)
      }-${this.timeAdd(date.getDate())}`;
    },
    formatMonth(date) {
      return `${date.getFullYear()}-${
        this.timeAdd(date.getMonth() + 1)}`;
    },
    onStartConfirm(date) {
      this.reportList=[];
      this.factorList=[];
      this.startShow = false;
      if(this.active=="auto"){
        this.start = this.formatDate(date);
        this.pageStart = this.formatDate(date);
      }else if(this.active=="week"){
        var week=this.getWeek(this.formatDate(date));
        this.pageStart=this.formatDate(date).substring(0,4)+"第"+week+"周"
        this.start = this.formatDate(date);
      }else if(this.active=="month"){
        this.pageStart=this.formatMonth(date)
        this.start = this.formatDate(date);
      }else{
        this.pageStart=this.formatYear(date)
        this.start = this.formatYear(date);
      }
      this.getList(this.deptId,this.start)
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    selected(e) {
      this.reportList=[];
      this.factorList=[];
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "auto") {
        this.isAuto =true;
        this.type= 2
        this.start=this.formatDate(new Date())
        this.pageStart=this.start;
        this.getList(this.deptId,this.start);
      } else if (id == "week") {
        this.isAuto =false;
        this.type= 3
        this.start=this.formatDate(new Date())
        var week=this.getWeek(this.start);
        this.pageStart=this.start.substring(0,4)+"第"+week+"周"
        this.getList(this.deptId,this.start);
      } else if (id == "month") {
        this.isAuto =false;
        this.type= 4
        this.start=this.formatMonth(new Date())
        this.pageStart=this.formatMonth(new Date())
        this.getList(this.deptId,this.start);
      }else if (id == "year") {
        this.isAuto =false;
        this.type= 5
        this.pageStart=this.formatYear(new Date())
        this.start=this.formatYear(new Date())
        this.getList(this.deptId,this.start);
      }

    },
    getWeek(dt){
            let d1 = new Date(dt);
            let d2 = new Date(dt);
            d2.setMonth(0);
            d2.setDate(1);
            let rq = d1-d2;
            let days = Math.ceil(rq/(24*60*60*1000));
            let num = Math.ceil(days/7);
            return num;
    },
    getPlatFormId(){
        this.platFormId = localStorage.getItem('platFormId');
      },
    // 头部检索
    onSearch() {
      this.isShowSearchContent = true;
    },
    // pointsList(){
    //   var that=this;
    //   searchPoints(that.platFormId, that.searchValue).then(
    //     function (result) {
    //       that.searchContent = result.data.data;
    //       if(that.platFormId == 99){
    //         that.deptId = result.data.data[0].groupId
    //         that.point = result.data.data[0].deptName+ "-" + result.data.data[0].siteName+ "-" + result.data.data[0].groupName;
    //       }else{
    //       that.deptId = result.data.data[0].siteId
    //       that.point = result.data.data[0].deptName+ "-" + result.data.data[0].siteName;
    //       }
    //       that.getList()
    //     },
    //     function (err) {
    //       Toast.fail("请求异常");
    //     }
    //   );
    // },
    // 加载更多
    // loadMore() {
    //   let that = this;
    //   // that.busy = true;
    //   setTimeout(() => {
    //     //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
    //     that.current++; //滚动之后加载第二页
    //     that.getList();
    //   }, 100);
    // },
    //选择站点
    selectPort(e) {
      this.reportList=[];
      this.factorList=[];
      this.current=1;
      if(this.platFormId == 99){
        this.deptId = e.groupId
        if(e.groupName==""){
          this.point = e.deptName + "-" + e.siteName;
          this.isNoData = true;
        }else{
          this.point=e.deptName+'-'+e.siteName+'-'+e.groupName
          this.getList(this.deptId);
        }
      }else{
        this.deptId = e.siteId
        this.point=e.deptName+'-'+e.siteName
        this.getList();
      }
      this.isShowSearchContent = false;
    },
    // 获取列表
    getList() {
      var that = this;
      var platFormId = localStorage.getItem("platFormId");
      if(platFormId==99){
        getLamReportList(platFormId, that.deptId, that.type, that.start).then(
          function (result) {
            let list = result.data.data;
          if(list.length==0){
          that.isNoData=true;
          }
            for (let i = 0; i < list.length; i++) {
              that.reportList.push(list[i]);
            }
            for (let i = 0; i < that.reportList[0].factorList.length; i++) {
              that.factorList.push(that.reportList[0].factorList[i]);
            }
          },
          function (err) {
            Toast.fail("请求异常");
          }
        );
      }else if(platFormId==22){
        getReport22List(platFormId, that.deptId, that.type, that.start).then(
          function (result) {
            let list = result.data.data;
          if(list.length==0){
          that.isNoData=true;
          }
            for (let i = 0; i < list.length; i++) {
              that.reportList.push(list[i]);
            }
          },
          function (err) {
            Toast.fail(err.data.msg);
          }
        );
      }else{
        getReportList(platFormId, that.deptId, that.type, that.start,2).then(
          function (result) {
            let list = result.data.data;
          if(list.length==0){
          that.isNoData=true;
          }
            for (let i = 0; i < list.length; i++) {
              that.reportList.push(list[i]);
            }
          },
          function (err) {
            Toast.fail(err.data.msg);
          }
        );
      }
    },
  },
  mounted: function () {
    this.getPlatFormId()
    this.start = this.formatDate(this.start)
    this.pageStart = this.formatDate(this.pageStart)
  },
  beforeMounted:function(){

  }
};
</script>
<style scoped lang="scss">
.scroll-Y {
  height: 800rpx;
}
.van-search {
  padding: 2px 12px 5px 12px;
}
.header_search {
  margin: 5px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-left;
}
.button {
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
  height: 35px;
  // width: 55px;
  margin-left: 10px;
}
.calendar {
  height: 35px;
  width: 31%;
  border-radius: 8px;
  border: 1px solid #a5a5a5;
}
.van-button--small {
  min-width: 45px;
}
.detailCard {
  margin: 10px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 12px;
}
.detailCard_header {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  height: 39px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;
}
.detailCard_header_point {
  display: flex;
  flex-wrap: wrap;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 12px 12px;
  margin: 0px 15px;
}
.header_title {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  padding: 10px 0;
}
.content_factorName {
  margin: 6px 20px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.content_value_name {
  margin-left: 10px;
  height: 17px;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.display_row {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between;
  margin: 5px 10px;
}
.display_row2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px 10px;
}
.content_value {
  height: 17px;
  font-size: 13px;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.line {
  margin: 10px;
  height: 0px;
  border-bottom: #dedede 1px dashed;
  opacity: 1;
}
.timeStyle {
  font-size: 13px;
  font-weight: 500;
  margin-left: 5px;
}
.disabledTime {
  font-size: 10px;
  background: grey;
}
.factorId{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin:0px 5px;
}
.factorButton{
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
  height: 30px;
  margin-right: 5px;
}
</style>
