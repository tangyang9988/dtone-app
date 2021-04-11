<template>
<view class="pieBody">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">空气污染监测</block>
	</cu-custom>
  <view class="chartTitle2 ">
    <view class="chartMainTitle abnormal">
        <view class="abnormalLine"></view>
        <span id="testQuality" class="abnormalTitle">空气质量等级分布</span>
    </view>
  </view>
    <view class="wholeCard chartCardRadis">
      <view  class="chartsCard">
		<text class="totalDays">城市:金坛</text>
        <text class="totalDays">更新时间:2021-04-08 18:00:00</text>
		<view class="charts-box">
		  <qiun-data-charts type="arcbar" :opts="{title:{name:'65',color:'#2fc25b',fontSize:20},subtitle:{name:'AQI',color:'#666666',fontSize:18}}" :chartData="chartsData.Arcbar1"/>
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
			<text>10</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 PM10
		</view>
		<view class="colorBar" style="background-color:#39B54A;">
			<text>88</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 SO2
		</view>
		<view class="colorBar"  style="background-color:green;">
			<text>12</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 NO2
		</view>
		<view class="colorBar" style="background-color:red;">
			<text>59</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 CO
		</view>
		<view class="colorBar"  style="background-color:#39B54A;">
			<text>1.0</text>
		</view>
	</view>
	<view class="moudle">
		<view style="text-align: center;">
		 O3
		</view>
		<view class="colorBar"  style="background-color:#39B54A;">
			<text>29</text>
		</view>
	</view>
    </view>
     <view class="chartMainTitle abnormal">
             <view class="abnormalLine"></view>
             <span id="testQuality" class="abnormalTitle">实时数据</span>
          </view>
    <!-- 真实记录 开始 -->
    <view>
      <!-- 卡片开始 -->
      <view  class="detailCards">
        <view v-for = "(value,key) in allAqiData" :key="key" class="detailCard">
          <view class="cardTitle">
            <view class="cardTitleLeft">
              <view class="cardTitleIcon" :class="changeColor(value.aqiLevel)"></view>
              <view class="cardTitleWord">{{value.siteName}}</view>
            </view>
            <!-- <img  src="../../assets/images/icon_data.png" class="icon_data" @click="historyData(value)" style="float:right"></img> -->
          </view>
          <view   class="factorList">
            <view v-for = "(factorValue,factorKey) in value.facotrs" :factorKey="factorKey" class="singleFactor">
              <view class="factorName">{{ factorValue.factorName}}：</view>
              <view class="factorValue">{{factorValue.avgVal}}{{factorValue.unit}}</view>
            </view>
          </view>
          <view class="inlineFactor">
            <view class="inlineFactorName">日期：</view>
            <view class="factorValue">{{value.time}}</view>
          </view>
        </view>
      </view>
    </view>
<!-- 引入自定义菜单组件 -->
<bottomMenu url="airPollution_index"></bottomMenu>
</view>

</template>
<script>
import demodata from '@/mockdata/demodata.json';
import mapdata from '@/mockdata/mapdata.json'
import bottomMenu from '../bottomMenu/index'
export default {
  components: {bottomMenu },
  name: "about",
  data() {
    return {
	  column1:{},
	  chartsData: {},	
	pixelRatio: 1,
	cWidth2:'',//圆弧进度图
	cHeight2:'',//圆弧进度图
	arcbarWidth: '',
      platFormId:"",
      data: [],
      barData: [],
      portRecord: [],
      factors: [],
      active: "",
      selectMenu: "index",
      mainFactor: [],
      aqiArr: [],
      allAqiData: [
 {
    "totalDays": null,
    "excellent": null,
    "good": null,
    "mild": null,
    "medium": null,
    "severe": null,
    "serious": null,
    "time": "2021-02-03 14:00",
    "siteName": "梁溪区行政服务中心站点",
    "facotrs": [
      {
        "factorCode": "a21026",
        "aqiVal": "3",
        "aqiLevel": 1,
        "avgVal": "7.024",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "SO₂",
        "statTime": "2021-02-03T14:00:00",
        "num": -1
      },
      {
        "factorCode": "a21004",
        "aqiVal": "9",
        "aqiLevel": 1,
        "avgVal": "17.626",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "NO₂",
        "statTime": "2021-02-03T14:00:00",
        "num": -1
      },
      {
        "factorCode": "a21005",
        "aqiVal": "6",
        "aqiLevel": 1,
        "avgVal": "0.550",
        "lower": -1,
        "ceiling": -1,
        "unit": "(mg/m³)",
        "factorName": "CO",
        "statTime": "2021-02-03T14:00:00",
        "num": -1
      },
      {
        "factorCode": "a05024",
        "aqiVal": null,
        "aqiLevel": null,
        "avgVal": null,
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "O₃",
        "statTime": "",
        "num": -1
      },
      {
        "factorCode": "a34004",
        "aqiVal": "18",
        "aqiLevel": 1,
        "avgVal": "12.423",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "PM2.5",
        "statTime": "2021-02-03T14:00:00",
        "num": -1
      },
      {
        "factorCode": "a34002",
        "aqiVal": "45",
        "aqiLevel": 1,
        "avgVal": "44.268",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "PM10",
        "statTime": "2021-02-03T14:00:00",
        "num": -1
      }
    ],
    "aqiLevel": 1,
    "aqiVal": "45",
    "word": "优",
    "deptName": "",
    "primary": "",
    "siteInfoId": -1
  },
  {
    "totalDays": null,
    "excellent": null,
    "good": null,
    "mild": null,
    "medium": null,
    "severe": null,
    "serious": null,
    "time": "2021-04-09 21:00",
    "siteName": "广益小学监测站点",
    "facotrs": [
      {
        "factorCode": "a21026",
        "aqiVal": "2",
        "aqiLevel": 1,
        "avgVal": "5.577",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "SO₂",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      },
      {
        "factorCode": "a21004",
        "aqiVal": "6",
        "aqiLevel": 1,
        "avgVal": "10.603",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "NO₂",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      },
      {
        "factorCode": "a21005",
        "aqiVal": "4",
        "aqiLevel": 1,
        "avgVal": "0.373",
        "lower": -1,
        "ceiling": -1,
        "unit": "(mg/m³)",
        "factorName": "CO",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      },
      {
        "factorCode": "a05024",
        "aqiVal": "18",
        "aqiLevel": 1,
        "avgVal": "34.304",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "O₃",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      },
      {
        "factorCode": "a34004",
        "aqiVal": "15",
        "aqiLevel": 1,
        "avgVal": "10.330",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "PM2.5",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      },
      {
        "factorCode": "a34002",
        "aqiVal": "26",
        "aqiLevel": 1,
        "avgVal": "25.226",
        "lower": -1,
        "ceiling": -1,
        "unit": "(μg/m³)",
        "factorName": "PM10",
        "statTime": "2021-04-09T21:00:00",
        "num": -1
      }
    ],
    "aqiLevel": 1,
    "aqiVal": "26",
    "word": "优",
    "deptName": "",
    "primary": "",
    "siteInfoId": -1
  },

      ],
      siteData: [],
      site1Value1: "",
      site1Value2: "",
      sum: 0,
      totalDays:0
    };
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        this.column1=JSON.parse(JSON.stringify(demodata.Column))
      	//因部分数据格式一样，这里不同图表引用同一数据源的话，需要深拷贝一下构造不同的对象
      	//开发者需要自行处理服务器返回的数据，应与标准数据格式一致，注意series的data数值应为数字格式
      	//***注意***我是为了演示数据看起来有条理，才把chartData挂载到一个对象中，您实际项目一定***不要这么做***，应该每个图形一个根节点属性，***例如上面this.column1这种做法***
      	this.chartsData.Arcbar1=JSON.parse(JSON.stringify(demodata.Arcbar1))
      	//这里的chartsData原本是空对象，因Vue不允许在已经创建的实例上动态添加新的根级响应式属性，所以这里使用this.$forceUpdate()强制视图更新。当然也可以使用this.$set()方法将相应属性添加到嵌套的对象上。
      	//所以，不建议我这样的做法，建议直接把数据绑定到this上
      	this.$forceUpdate();
      }, 1500);
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
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
    },
    // getPortDetail() {
    //   //卡片
    //   let that = this;
    //   portDetail(5, that.platFormId)
    //     .then(
    //       function (result) {
    //         //拼凑卡片对象
    //         let portCards = [];
    //         //1.对象的属性
    //         let allRecords = result.data.data; //记录数组
    //         for (let i = 0; i < allRecords.length; i++) {
    //           //几个卡片

    //           that.portRecord.push(allRecords[i]);
    //           that.factors.push(allRecords[i].factorMap);
    //         }
    //         // //2.对象的值
    //       },
    //       function (err) {
    //         console.log(err);
    //         Toast.fail("请求异常");
    //         that.isHide = false;
    //       }
    //     )
    //     .catch(function (error) {
    //       console.log(error);
    //       Toast.fail("登录异常");
    //       that.isHide = false;
    //     });
    // },
    getAQI(site) {
      //卡片
      let that = this;
      latestAQI(this.platFormId, site)
        .then(
          function (result) {
            that.aqiArr = result.data.data;
          },
          function (err) {
            console.log(err);
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          Toast.fail("登录异常");
          that.isHide = false;
        });
    },
    //getAllSiteData
    getAllAQIData() {
      //卡片
      let that = this;
      getAllSiteData(this.platFormId)
        .then(
          function (result) {
            that.allAqiData = result.data.data;
          },
          function (err) {
            console.log(err);
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          Toast.fail("登录异常");
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
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          Toast.fail("登录异常");
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
    this.platFormId = localStorage.getItem("platFormId");
    var v = this;
  },
  onLoad() {
  },
  onReady() {
    //模拟从服务器获取数据
    this.getServerData()
  },
  created() {},
};
</script>
<style scoped lang="scss">
// @import "../../assets/styles/common.scss";
.van-search {
  padding: 2px 12px 5px 12px;
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
