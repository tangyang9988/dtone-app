<template>
<view class="main">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">废水</block>
	</cu-custom>
  <view class="chartMainTitle abnormal">
          <view class="abnormalLine"></view>
          <span id="testQuality" class="abnormalTitle">实时数据</span>
  </view>
  <view class="cu-bar search bg-white">
    <view class="search-form round">
      <picker
      @change="bindPickerChange"
        :range="siteList"
        :value="index"
        :range-key="'stationName'"
        style="width: 100%;"
      >
        <text class="content_value_name" style="margin-left: 20px"
          >请选择企业：</text
        >
        <text class="content_value_name" v-if="siteList[index]">{{siteList[index].stationName}}</text>
      </picker>
    </view>
  </view>
    <!-- 真实记录 开始 -->
    <view>
      <!-- 卡片开始 -->
      <view class="detailCards">
        <view v-for = "(value,key) in portRecord" :key="key" class="detailCard">
          <view class="cardTitle">
              <view class="cardTitleWord">{{value.enterpriseName}}</view>
              <view style="  display: flex;flex-wrap: wrap;justify-content:space-between;">
              <view class="cardTitleWord">{{value.name}}</view>
              <view class="cardTitleWord">{{value.monitorTime}}</view>
              </view>
          </view>
          <view class="lineList">
          <view class="factorList">
            <view>
              <view class="factorName" :style="{background:getColor(value.ph.value)}" @click="factorClick('ph', value,'PH')">PH</view>
              <view class="factorValue">{{value.ph.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.ws.value)}" @click="factorClick('ws', value,'污水流量')">流量</view>
              <view class="factorValue">{{value.ws.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.cod.value)}" @click="factorClick('cod', value,'COD')">COD</view>
              <view class="factorValue">{{value.cod.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.ad.value)}" @click="factorClick('ad', value,'氨氮')">氨氮</view>
              <view class="factorValue">{{value.ad.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zl.value)}" @click="factorClick('zl', value,'总磷')">总磷</view>
              <view class="factorValue">{{value.zl.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zd.value)}" @click="factorClick('zd', value,'总氮')">总氮</view>
              <view class="factorValue">{{value.zd.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'总锌')">总锌</view>
              <view class="factorValue">{{value.zzn.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zk.value)}" @click="factorClick('zk', value,'总砷')">总砷</view>
              <view class="factorValue">{{value.zk.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zn.value)}" @click="factorClick('zn', value,'总镍')">总镍</view>
              <view class="factorValue">{{value.zn.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.zcu.value)}" @click="factorClick('zcu', value,'总铜')">总铜</view>
              <view class="factorValue">{{value.zcu.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.fhww.value)}" @click="factorClick('fhww', value,'氟化物')">氟化物</view>
              <view class="factorValue">{{value.fhww.value}}</view>
            </view>
            <view>
              <view class="factorName" :style="{background:getColor(value.ljg.value)}" @click="factorClick('ljg', value,'六价铬')">六价铬</view>
              <view class="factorValue">{{value.ljg.value}}</view>
            </view>
          </view>
          </view>  
          <!-- <view class="factorList">
              <view class="factorName" :style="{background:getColor(value.ad.value)}" @click="factorClick('ad', value,'氨氮')">氨氮</view>
              <view class="factorName" :style="{background:getColor(value.cod.value)}" @click="factorClick('cod', value,'COD')">COD</view>
              <view class="factorName" :style="{background:getColor(value.ph.value)}" @click="factorClick('ph', value,'PH')">PH</view>
              <view class="factorName" :style="{background:getColor(value.ws.value)}" @click="factorClick('ws', value,'污水流量')">流量</view>
              <view class="factorName" :style="{background:getColor(value.zd.value)}" @click="factorClick('zd', value,'总氮')">总氮</view>
              <view class="factorName" :style="{background:getColor(value.zl.value)}" @click="factorClick('zl', value,'总磷')">总磷</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">总锌</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">总砷</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">总镍</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">总铜</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">氟化物</view>
              <view class="factorName" :style="{background:getColor(value.zzn.value)}" @click="factorClick('zzn', value,'氨氮')">六价铬</view>
          </view> -->
          <!-- <view class="factorList">
            <view class="factorValue">{{value.ad.value}}</view>
            <view class="factorValue">{{value.cod.value}}</view>
            <view class="factorValue">{{value.ph.value}}</view>
            <view class="factorValue">{{value.ws.value}}</view>
            <view class="factorValue">{{value.zd.value}}</view>
            <view class="factorValue">{{value.zl.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
            <view class="factorValue">{{value.zzn.value}}</view>
          </view> -->
        </view>
        <view class="noData" v-if="isNoData">没有更多数据啦</view>
      </view>
        
    </view>
    
<!-- 引入自定义菜单组件 -->
<bottomMenu url="pollutionSurfaceWater_index"></bottomMenu>

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
import {getPollutionWaterRtdList,getWaterEnterpriseList} from "../../api/pollutionSurfaceWater.js"
import demodata from '@/mockdata/demodata.json';
import bottomMenu from '../bottomMenu/index'
import trendAnalysis from "../components/trendAnalysis.vue";
export default {
  components: {bottomMenu,trendAnalysis},
  name: "about",
  data() {
    return {
      siteList: [],
      index: 0,
      enterpriseId:"",
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
      factorName:"",
      trendAnalysisShow: false,
      current:1,
      size:10,
      totalPage: 0,
      isNoData:false,
    };
  },
  methods: {
    bindPickerChange(e) {
      this.portRecord = [];
      this.current=1;
      this.size= 10
      this.index = e.target.value;
      this.enterpriseId = this.siteList[e.target.value].id;
      this.getPortDetail(this.enterpriseId);
    },
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
    async selectPort() {
      var that =this;
      await getWaterEnterpriseList().then(
        function (result) {
          let list = result.data;
          that.siteList.push({
            id: "",
            stationName: "",
          });
          for (let i = 0; i < list.length; i++) {
            that.siteList.push({
              id: list[i].value,
              stationName: list[i].label,
            });
          }
          that.getPortDetail(that.enterpriseId)
        },
        function (err) {}
      );
    },
    getPortDetail(enterpriseId) {
      //卡片
      let that = this;
      getPollutionWaterRtdList(enterpriseId,this.current,this.size)
        .then(
          function (result) {
            let allRecords = result.data.data.records; //记录数组
            that.totalPage=result.data.data.pages;
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
    
  },
  onReachBottom() {
    // 判断当前页是否大于等于总页数
    if (this.totalPage <= this.current) {
        this.isNoData = true;
    } else {
    this.current++;
    this.isNoData = false;
    this.getPortDetail(this.enterpriseId);   // 每次滑动请求接口，实现上拉加载更多数据
    }
  },
  mounted() {
    this.selectPort();
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
  padding-bottom: 40px;
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
  // justify-content: flex-start;
  // align-items: center;
  flex-wrap: nowrap;
  // flex-direction: row;
}
.lineList{
  overflow-x: scroll;
  white-space: nowrap;
  margin: 0 10px;
}
.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 45%;
  border-bottom: #dedede 1px dashed;
}

.factorName {
  margin: 0 2px;
  height: 20px;
  background-color: white;
  text-align: center;
  line-height: 20px;
  border-radius: 1px;
}

.factorValue {
  margin: 0 2px;
  height: 20px;
  background-color: white;
  text-align: center;
  line-height: 20px;
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

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
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
  margin: 5px 25px;
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
.noData{
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin:20px 0px;
}
</style>
