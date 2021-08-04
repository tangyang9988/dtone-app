<template>
<view class="pieBody">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">地表水</block>
	</cu-custom>
  <view class="chartTitle2 ">
    <view class="chartMainTitle abnormal">
        <view class="abnormalLine"></view>
        <span id="testQuality" class="abnormalTitle">当月水质等级</span>
    </view>
  </view>
    <view class="wholeCard chartCardRadis">
      <view  class="chartsCard">
		<text class="totalDays">城市:金坛</text>
        <text class="totalDays">更新时间:{{formatDate(new Date())}}</text>
		<!-- <view class="charts-box">
		  <qiun-data-charts type="arcbar" :opts="{title:{name:'65',color:'#2fc25b',fontSize:20},subtitle:{name:'AQI',color:'#666666',fontSize:18}}" :chartData="chartsData.Arcbar1"/>
		</view> -->
    <view class="charts-box margin-top">
      <qiun-data-charts type="rose" :opts="{legend:{position: 'bottom'}}" :chartData="chartsData.Rose1"/>
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
        <view v-for = "(value,key) in portRecord" :key="key" class="detailCard">
          <view class="cardTitle">
            <view class="cardTitleWord">{{value.siteName}}</view>
            <view class="cardTitleWord">{{value.updateTime}}</view>
          </view>
        <view class="factorList">
            <view class="factorName" :style="{background:getColor(value.zl.value)}" @click="factorClick('w21011', value,'总磷')">总磷</view>
            <view class="factorName" :style="{background:getColor(value.zd.value)}" @click="factorClick('w21001', value,'总氮')">总氮</view>
            <view class="factorName" :style="{background:getColor(value.ad.value)}" @click="factorClick('w21003', value,'氨氮')">氨氮</view>
            <view class="factorName" :style="{background:getColor(value.codmn.value)}" @click="factorClick('w01019', value,'高锰酸盐指数')">高锰酸盐</view>
            <view class="factorName" :style="{background:getColor(value.ec.value)}" @click="factorClick('w01014', value,'电导率')">电导率</view>
            <view class="factorName" :style="{background:getColor(value.rjy.value)}" @click="factorClick('w01009', value,'溶解氧')">溶解氧</view>
            <view class="factorName" :style="{background:getColor(value.sw.value)}" @click="factorClick('w01010', value,'水温')">水温</view>
            <view class="factorName" :style="{background:getColor(value.ph.value)}" @click="factorClick('w01001', value,'PH')">PH</view>
            <view class="factorName" :style="{background:getColor(value.tub.value)}" @click="factorClick('w01003', value,'浊度')">浊度</view>
        </view>
        <view class="factorList">
          <view class="factorValue">{{value.zl.value}}</view>
          <view class="factorValue">{{value.zd.value}}</view>
          <view class="factorValue">{{value.ad.value}}</view>
          <view class="factorValue">{{value.codmn.value}}</view>
          <view class="factorValue">{{value.ec.value}}</view>
          <view class="factorValue">{{value.rjy.value}}</view>
          <view class="factorValue">{{value.sw.value}}</view>
          <view class="factorValue">{{value.ph.value}}</view>
          <view class="factorValue">{{value.tub.value}}</view>
        </view>
        </view>
      </view>
    </view>
    <!-- 引入自定义菜单组件 -->
    <bottomMenu url="surfaceWater_index"></bottomMenu>
    <trendAnalysis
      v-if="trendAnalysisShow"
      @close="closeDialog()"
      :isShow="trendAnalysisShow"
      :card="card"
      :factor="factor"
      :factorName="factorName"
    ></trendAnalysis>
</view>
</template>
<script>
import demodata from '@/mockdata/demodata.json';
import mapdata from '@/mockdata/mapdata.json'
import bottomMenu from '../bottomMenu/index'
import trendAnalysis from "../components/trendAnalysis.vue";
import {getHourlyWaterQualityData} from "../../api/surfaceWater.js"
import { appConfig } from '../../config/config.js'
import { Base64 } from 'js-base64';
export default {
  components: {bottomMenu,trendAnalysis },
  name: "about",
  data() {
    return {
    trendAnalysisShow: false,
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
      siteData: [],
      site1Value1: "",
      site1Value2: "",
      sum: 0,
      totalDays:0,
      card:"",
      factor:'',
      factorName:""
    };
  },
  methods: {
    factorClick(factor, card,factorName) {
      this.trendAnalysisShow = true;
      this.card = card
      this.factor = factor
      this.factorName =factorName
    },
    closeDialog() {
      this.trendAnalysisShow = false;
    },
    getColor(value) {
      if (value == "" || value == null) {
        return "#caddfe";
      } else {
        var collectValue = parseFloat(value);
        if (collectValue >= 0 && collectValue <= 50) {
          return "#caddfe";
        } else if (collectValue > 50 && collectValue <= 100) {
          return "#6196fd";
        } else if (collectValue > 100 && collectValue <= 150) {
          return "#64c676";
        } else if (collectValue > 150 && collectValue <= 200) {
          return "#ffde19";
        } else if (collectValue > 200 && collectValue <= 300) {
          return "#ff9a00";
        } else if (collectValue > 300 && collectValue <= 400) {
          return "#db4d4d";
        }else if (collectValue > 400) {
          return "red";
        }
      }
    },
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
      setTimeout(() => {
      	this.chartsData.Arcbar1=JSON.parse(JSON.stringify(demodata.Arcbar1))
      	this.chartsData.Rose1=JSON.parse(JSON.stringify(demodata.PieA))
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
    getPortDetail() {
      //卡片
      let that = this;
	  const tokeValue=uni.getStorageSync("access-user");
	  const clientId = "saber", clientSecret = "saber_secret";
      getHourlyWaterQualityData().then(
          function (result) {
            let allRecords = result.data.data; //记录数组
            for (let i = 0; i < allRecords.length; i++) {
              that.portRecord.push(allRecords[i]);
            }
          },
          function (err) {
            that.isHide = false;
          }
        )
        .catch(function (error) {
          that.isHide = false;
        });

    },
    getAQI(site) {
      //卡片
      let that = this;
      latestAQI(this.platFormId, site)
        .then(
          function (result) {
            that.aqiArr = result.data.data;
          },
          function (err) {
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
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
    this.getPortDetail()
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
  height:220px;
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
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin-bottom: 15px;
  width: 90%;
  background-color: white;
  opacity: 1;
  border: 1px solid #efefef;
  padding-bottom: 10px;
  border-radius: 12px;
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
  margin:0 10px;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 45%;
  border-bottom: #dedede 1px dashed;
}

.factorName {
  width:10.5%;
  height:20px;
  background-color: white;
  text-align:center;
  line-height:20px;
  border-radius: 1px;
}

.factorValue {
  width:10.5%;
  height:20px;
  background-color: white;
  text-align:center;
  line-height:20px;
  border-radius: 1px;
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
  padding:5px;  
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
