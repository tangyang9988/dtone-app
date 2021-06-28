<template>
<view class="pieBody">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">废气</block>
	</cu-custom>
  <!-- <view class="chartTitle2 ">
    <view class="chartMainTitle abnormal">
        <view class="abnormalLine"></view>
        <span id="testQuality" class="abnormalTitle">当月水质等级</span>
    </view>
  </view>
    <view class="wholeCard chartCardRadis">
      <view  class="chartsCard">
		<text class="totalDays">城市:金坛</text>
        <text class="totalDays">更新时间:{{formatDate(new Date())}}</text>
    <view class="charts-box margin-top">
      <qiun-data-charts type="rose" :opts="{legend:{position: 'bottom'}}" :chartData="chartsData.Rose1"/>
    </view>
	  </view>
    </view> -->
     <view class="chartMainTitle abnormal">
             <view class="abnormalLine"></view>
             <span id="testQuality" class="abnormalTitle">实时数据</span>
     </view>
    <!-- 真实记录 开始 -->
    <view>
      <!-- 卡片开始 -->
      <view class="detailCards">
        <view v-for = "(value,key) in portRecord" :key="key" class="detailCard">
          <view class="cardTitle">
            <view class="cardTitleLeft">
              <view class="cardTitleWord">{{value.enterpriseName}}</view>
            </view>
            <!-- <img  src="../../assets/images/icon_data.png" class="icon_data" @click="historyData(value)" style="float:right"></img> -->
          </view>
          <view class="factorList">
            <view class="singleFactor" v-if="JSON.stringify(value.ch4)!='{}'">
              <view class="factorName">{{value.ch4.factorDict}}:</view>
              <view class="factorValue" >{{value.ch4.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.h2s)!='{}'">
              <view class="factorName">{{value.h2s.factorDict}}:</view>
              <view class="factorValue" >{{value.h2s.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.no)!='{}'">
              <view class="factorName">{{value.no.factorDict}}:</view>
              <view class="factorValue" >{{value.no.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.no2)!='{}'">
              <view class="factorName">{{value.no2.factorDict}}:</view>
              <view class="factorValue" >{{value.no2.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.nox)!='{}'">
              <view class="factorName">{{value.nox.factorDict}}:</view>
              <view class="factorValue" >{{value.nox.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.so2)!='{}'">
              <view class="factorName">{{value.so2.factorDict}}:</view>
              <view class="factorValue" >{{value.so2.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.yc)!='{}'">
              <view class="factorName">{{value.yc.factorDict}}:</view>
              <view class="factorValue" >{{value.yc.value}}</view>
            </view>
            <view class="singleFactor" v-if="JSON.stringify(value.yqls)!='{}'">
              <view class="factorName">{{value.yqls.factorDict}}:</view>
              <view class="factorValue" >{{value.yqls.value}}</view>
            </view>
              <view class="singleFactor" v-if="JSON.stringify(value.yqsd)!='{}'">
              <view class="factorName">{{value.yqsd.factorDict}}:</view>
              <view class="factorValue" >{{value.yqsd.value}}</view>
            </view>
          </view>
          <!-- <view class="inlineFactor">
            <view class="inlineFactorName">日期：</view>
            <view class="factorValue">{{value.updateTime}}</view>
          </view> -->
        </view>
      </view>
    </view>
<!-- 引入自定义菜单组件 -->
<bottomMenu url="surfaceWater_index"></bottomMenu>
</view>
</template>
<script>
import {getPollutionWasteGasRtdList} from "../../api/pollutionSurfaceGases.js"
import demodata from '@/mockdata/demodata.json';
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
      setTimeout(() => {
        this.column1=JSON.parse(JSON.stringify(demodata.Column))
      	this.chartsData.Arcbar1=JSON.parse(JSON.stringify(demodata.Arcbar1))
      	this.chartsData.Rose1=JSON.parse(JSON.stringify(demodata.PieA))
      	this.$forceUpdate();
      }, 1500);
    },
    getPortDetail() {
      //卡片
      let that = this;
      getPollutionWasteGasRtdList()
        .then(
          function (result) {
            let allRecords = result.data.data.records; //记录数组
            for (let i = 0; i < allRecords.length; i++) {
              that.portRecord.push(allRecords[i]);
            }
            console.log(that.portRecord)
          },
          function (err) {
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          Toast.fail("登录异常");
          that.isHide = false;
        });
    },
    
  },
  mounted() {
    this.getServerData()
    this.getPortDetail()
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
  height:240px;
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
  display: flex;
  padding-bottom: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin-bottom: 15px;
  width: 90%;
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
  margin-bottom: 8px;
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
