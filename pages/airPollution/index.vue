<template>
<view class="pieBody">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">空气污染监测</block>
	</cu-custom>
  <view class="chartTitle2 ">
    <view class="chartMainTitle abnormal">
        <view class="abnormalLine"></view>
        <span id="testQuality" class="abnormalTitle">全区AQI等级分布</span>
    </view>
  </view>
    <view class="wholeCard chartCardRadis">
      <view  class="chartsCard">
		<text class="totalDays">城市:金坛</text>
        <text class="totalDays">更新时间:{{formatDate(new Date())}}</text>
		<view class="charts-box">
		  <qiun-data-charts type="arcbar" :opts="{title:{name:aqiArr.aqi,fontSize:20},subtitle:{name:'AQI',fontSize:18}}" :chartData="charts" />
		</view>
	  </view>
    </view>
    <!-- 空气污染因子 -->
    <view class="chartMainTitle abnormal">
        <view class="abnormalLine"></view>
        <text id="testQuality" class="abnormalTitle">空气污染因子</text>
    </view>
	
  <view class="AQIcards">
	<view class="moudle">
		<view style="text-align: center;">
		 PM2.5
		</view>
		<view class="colorBar">
			<text>{{aqiArr.pm25}}</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 PM10
		</view>
		<view class="colorBar" style="background-color:#39B54A;">
			<text>{{aqiArr.pm10}}</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 SO2
		</view>
		<view class="colorBar"  style="background-color:green;">
			<text>{{aqiArr.so2}}</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 NO2
		</view>
		<view class="colorBar" style="background-color:red;">
			<text>{{aqiArr.no2}}</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 CO
		</view>
		<view class="colorBar"  style="background-color:#39B54A;">
			<text>{{aqiArr.co}}</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 O3
		</view>
		<view class="colorBar"  style="background-color:#39B54A;">
			<text>{{aqiArr.o3}}</text>
		</view>
	</view>
    </view>
     <view class="chartMainTitle abnormal">
             <view class="abnormalLine"></view>
             <span id="testQuality" class="abnormalTitle">实时数据</span>
          </view>
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
      <!-- 卡片开始 -->
      <view  class="detailCards">
        <view v-for = "(value,key) in portRecord" :key="key" class="detailCard">
          <view class="cardTitle">
            <view class="cardTitleLeft">
              <view class="cardTitleWord">{{value.siteName}}</view>
            </view>
            <!-- <img  src="../../assets/images/icon_data.png" class="icon_data" @click="historyData(value)" style="float:right"></img> -->
          </view>
          <view class="factorList">
            <view class="singleFactor">
              <view class="factorName">PM2.5：</view>
              <view class="factorValue" v-if="JSON.stringify(value.pm25)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.pm25.value}}{{value.pm25.unit}}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName" >PM10：</view>
              <view class="factorValue" v-if="JSON.stringify(value.pm10)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.pm10.value}}{{value.pm10.unit}}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName" >SO2：</view>
              <view class="factorValue" v-if="JSON.stringify(value.so2)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.so2.value}}{{value.so2.unit}}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName" >NO2：</view>
              <view class="factorValue" v-if="JSON.stringify(value.no2)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.no2.value}}{{value.no2.unit}}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName" >CO：</view>
              <view class="factorValue" v-if="JSON.stringify(value.co)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.co.value}}{{value.pm10.unit}}</view>
            </view>
            <view class="singleFactor">
              <view class="factorName" >O3：</view>
              <view class="factorValue" v-if="JSON.stringify(value.o3)=='{}'">--</view>
              <view class="factorValue" v-else>{{value.o3.value}}{{value.o3.unit}}</view>
            </view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">更新日期：</view>
            <view class="factorValue" v-if="value.updateTime==''">--</view>
            <view class="factorValue" v-else>{{value.updateTime}}</view>
          </view>
        </view>
      </view>
    </scroll-view>
<!-- 引入自定义菜单组件 -->
<bottomMenu url="airPollution_index"></bottomMenu>
</view>
</template>
<script>
import bottomMenu from '../bottomMenu/index'
import {getAirRtdList,getAqiRank} from "../../api/airPollution.js"
export default {
  components: {bottomMenu },
  name: "about",
  data() {
    return {
	  charts: {},	
    pixelRatio: 1,
    cWidth2:'',//圆弧进度图
    cHeight2:'',//圆弧进度图
    arcbarWidth: '',
      platFormId:"",
      data: [],
      barData: [],
      portRecord: [],
      aqiArr: {},
      active: "",
      selectMenu: "index",
      mainFactor: [],
      siteData: [],
      site1Value1: "",
      site1Value2: "",
      sum: 0,
      totalDays:0
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${this.timeAdd(
        date.getMonth() + 1
      )}-${this.timeAdd(date.getDate())} ${this.timeAdd(
        date.getHours()
      )}:${this.timeAdd(date.getMinutes())}:${this.timeAdd(date.getSeconds())}`;
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    getServerData() {
       let Arcbar1={
        "series": [{
          "name": "正确率",
          "data": 0.7,
          "color": "#2fc25b"
        }]
	    }
      this.charts=JSON.parse(JSON.stringify(Arcbar1))
      this.$forceUpdate();
    },
    historyData(e) {
      var groupId = e.siteId;
      var start = e.collectTime.split(" ")[0];
      var end = e.collectTime.split(" ")[0];
      var point = e.deptName +"-" + e.siteName;
      this.$router.push({
        path: "/surfaceWater/history",
        query: { groupId: groupId, point: point, start: start, end: end },
      });
    },
    selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
      if (id == "index") {
        this.$router.push("/airQuality/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },

    drawChart() {
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: "myChart",
        pixelRatio: window.devicePixelRatio, // 指定分辨率
        plugins: PieLabel,
      });
      chart.source(this.data);
      chart.legend({
        position: "right",
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*proportion")
        .color("name", [
          "#00E300",
          "#FFFF00",
          "#FF7D00",
          "#FF0000",
          "#99004B",
          "#7D0022",
        ])
        .adjust("stack");

      chart.render();
    },
    //条状图
    drawBarChart() {
      const chart = new F2Bar.Chart({
        id: "barChart",
        pixelRatio: window.devicePixelRatio,
      });

      chart.source(this.barData, {
        sales: {
          tickCount: 5,
        },
      });
      chart.coord({
        transposed: true,
      });
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = null;
          items[0].name = items[0].title;
          items[0].value = "¥ " + items[0].value;
        },
      });
      chart.interval().position("year*sales");
      chart.render();
    },
    getCycleChartData(siteId) {
      //水质环图
      let that = this;
      cycleChart(this.platFormId, siteId)
        .then(
          function (result) {
            that.data = [];
            let resData = result.data.data;
            let excellentPercentage = {
              name: "优 " + resData.excellent,
              proportion: resData.excellent,
              a: "1",
            };
            that.data.push(excellentPercentage);
            let goodPercentage = {
              name: "良 " + resData.good,
              proportion: resData.good,
              a: "1",
            };
            that.data.push(goodPercentage);
            let mildPercentage = {
              name: "轻度污染 " + resData.mild,
              proportion: resData.mild,
              a: "1",
            };
            that.data.push(mildPercentage);
            let mediumPercentage = {
              name: "中度污染 " + resData.medium,
              proportion: resData.medium,
              a: "1",
            };
            that.data.push(mediumPercentage);
            let severePercentage = {
              name: "重度污染 " + resData.severe,
              proportion: resData.severe,
              a: "1",
            };
            that.data.push(severePercentage);
            let seriousPercentage = {
              name: "严重污染 " + resData.serious,
              proportion: resData.serious,
              a: "1",
            };
            that.data.push(seriousPercentage);
            that.mainFactor = resData.facotrs;
            that.totalDays = resData.totalDays;
            that.drawChart();
          },
          function (err) {
            that.isHide = false;
          }
        )
    },
    // 实时数据
    getPortDetail() {
      let that = this;
      getAirRtdList()
        .then(
          function (result) {
            //1.对象的属性
            let allRecords = result.data.data; //记录数组
            for (let i = 0; i < allRecords.length; i++) {
              //几个卡片
              that.portRecord.push(allRecords[i]);
            }
          },
          function (err) {
            console.log(err);
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          that.isHide = false;
        });
    },
    // 排名
    getAqiRank() {
      let that = this;
      getAqiRank()
        .then(
          function (result) {

            that.aqiArr = result.data;
          },
          function (err) {
            that.isHide = false;
          }
        )
        .catch(function (error) {
          that.isHide = false;
        });
    },
    //获取站点
    getSites() {
      //卡片
      let that = this;
      getSites(this.platFormId)
        .then(
          function (result) {
            let resData = result.data.data;
            for (let i = 0; i < resData.length; i++) {
              let singleSite = {
                text: resData[i].siteName,
                value: resData[i].siteId,
              };
              that.siteData.push(singleSite);
            }
            //默认使用第一个站点
            that.site1Value1 = that.siteData[0].value;
            that.site1Value2 = that.siteData[0].value;
            that.getCycleChartData(that.siteData[0].value);
            that.getAQI(that.siteData[0].value);
          },
          function (err) {
            console.log(err);
            that.isHide = false;
          }
        )
        .catch(function (error) {
          that.isHide = false;
        });
    },
    //更换站点
    changeSite(e, type) {
      this.sum++;
      if (type == 1) {
        this.getCycleChartData(e);
      } else if (type == 2) {
        this.getAQI(e);
      }
    },
    switchColor(level) {
      return `AQICardBottom${level}`;
    },
    changeColor(level) {
      return `cardTitleIcon${level}`;
    },
    
  },
  mounted() {
    this.getServerData()
    this.getPortDetail()
    this.getAqiRank()

  },
  onLoad() {
  },
  onReady() {
  },
  created() {},
};
</script>
<style scoped lang="scss">
// @import "../../assets/styles/common.scss";
.scroll-Y {
  height: 700rpx;
}
.header {
  margin: 10px 15px;
  overflow-x: scroll;
  white-space: nowrap;
}
.header::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
.pieBody {
  width: 100%;
  height: 100%;
  background-color: white;
}

.wholeCard {
  width: 90%;
  // height: 320px;
  margin-left: 5%;
  margin-right: 5%;
}

.chartsCard {
  width: 100%;
  height:200px;
  padding:15px;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
}

.charts {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: -10px;
}

.cycleChart {
  width: 80% !important;
  height: 220px !important;
}
.mainFactorS {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 20px;
}
.cardTitleLeft{
  display: flex;
  justify-content: left;
}
.progresses {
  width: 50%;
  height: 250px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

.progress {
  width: 100%;
  height: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.detailCards {
  width: 100%;
  // height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin-bottom: 15px;
  // height: 110px;
  width: 90%;
  // height: 290px;
  background-color: white;
  border-radius: 3px;

  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05); //阴影
}

.chartCardRadis {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 12px;
}

.factorList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  // margin-bottom: 8px;
  margin-left: 5%;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 45%;
  border-bottom: #dedede 1px dashed;
}

.factorName {
  height: 100%;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}

.factorValue {
  font-size: 13px;
  font-weight: bold;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.inlineFactor {
  display: flex;
  justify-content: left;
  align-items: left;
}
.inlineFactorName {
  margin-left: 5%;
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.inlineFactorValue {
  float: left;
  // margin-top: 5px;
}

.chartTitle {
  margin-left: 20px;
}

.chartTitle2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-right: 5%;
}
.chartMainTitle {
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

  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  display: flex;
  justify-content:space-between;
}

.cardTitleIcon1 {
  width: 18px;
  height: 18px;
  background: #00e300;
  border-radius: 50%;
  opacity: 1;
}
.cardTitleIcon2 {
  width: 18px;
  height: 18px;
  background:  #ffff00;
  border-radius: 50%;
  opacity: 1;
}
.cardTitleIcon3{
  width: 18px;
  height: 18px;
  background: #ff7d00;
  border-radius: 50%;
  opacity: 1;
}
.cardTitleIcon4 {
  width: 18px;
  height: 18px;
  background:#ff0000;
  border-radius: 50%;
  opacity: 1;
}
.cardTitleIcon5 {
  width: 18px;
  height: 18px;
  background: #99004b;
  border-radius: 50%;
  opacity: 1;
}
.cardTitleIcon6 {
  width: 18px;
  height: 18px;
  background:  #7d0022;
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
  margin-left: 5%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
}
.mainFactorValue {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  margin-right:20px;
}
.AQIcards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  height:120px;
  margin-left: 5%;
  
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 12px;
}
.AQIcard {
  width: 50px;
  height: 46px;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 8px;
  margin: 5px 5px;
}
.AQIcardDate {
  height: 13px;
  font-size: 9px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 13px;
  color: #4d4d4d;
  opacity: 1;
  text-align: center;
}
.AQIcardAQI {
  // width: 17px;
  height: 20px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  opacity: 1;
  text-align: center;
}
.AQICardBottom1 {
  background-color: #00e300;
  height: 28%;

  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}
.AQICardBottom2 {
  background-color: #ffff00;
  height: 28%;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}
.AQICardBottom3 {
  background-color: #ff7d00;
  height: 28%;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}
.AQICardBottom4 {
  background-color: #ff0000;
  height: 28%;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}
.AQICardBottom5 {
  background-color: #99004b;
  height: 28%;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}
.AQICardBottom6 {
  background-color: #7d0022;
  height: 28%;
  border: 1px solid #b1b1b1;
  opacity: 1;
  border-radius: 0px 0px 8px 8px;
}

.mainDirtyFactorTitle {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: #a7a7a7;
  opacity: 1;
}
.abnormal {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 25px;
}
.abnormalLine {
  font-family: PingFang SC;
  width: 4px;
  height: 14px;
  background: #587df7;
  opacity: 1;
  border-radius: 2px;
  margin-top: 4px;
}
.abnormalTitle {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
  margin-left: 4px;
}
.dropDownMenu {
  height: 30px;
  width: 100%;
  margin: 0 5%;
  background: #ffffff;
  border: 1px solid #a5a5a5;
  opacity: 1;
  border-radius: 8px;
}
.van-dropdown-menu__title {
  font-size: 13px;
}
.charts-box {
  width: 90%;
  height: 180px;
}
.moudle{
  width:30%;
  height:50px;
  padding:0 10px;
  // height:60px;
}
.colorBar{
  width:100%;
  height:30px;
  border-radius: 12px;
  background-color: yellow;
  text-align: center;
  line-height: 30px;
}
</style>
