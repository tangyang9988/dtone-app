<template>
<view class="main">
	<cu-custom bgColor="bg-gradual-pink" :isBack="true"><block slot="backText">返回</block>
		<block slot="content">预警信息</block>
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
    <!-- 搜索框展示搜索内容  searchContent-->
    <view  v-if="isShowSearchContent">
        <van-cell size="large"  v-for="(retlist,index) in searchContent" :key="index" :label="retlist.groupName" :title="retlist.deptName" :value="retlist.siteName"  @click="selectPort(retlist)" />
    </view>
    <view class="header_search">
      <view class="calendar">
        <view style="display: flex; margin: 10px">
          <span @click="startShow = true" class="timeStyle">{{start}}</span>
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
          <span @click="endShow = true" class="timeStyle">{{end}}</span>
          <!-- <van-calendar
            v-model="endShow"
            @confirm="onEndConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          /> -->
        </view>
      </view>
    </view>
    <!-- <van-radio-group v-model="queryType" class="exception" @change="exceptionClick()">
      <van-radio name="1">当前异常</van-radio>
      <van-radio name="2" style="margin-left:15px">全部异常</van-radio>
    </van-radio-group> -->
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group">
					<!-- <view class="title">定义颜色</view> -->
					<view>
						<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio><text style="margin-left:5px">当前异常</text>
						<radio class='margin-left-sm' :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio><text style="margin-left:5px">全部异常</text>
					</view>
				</view>
			</radio-group>
    <view class="detailCard_header_point">
      <view class="header_title" style="margin-left:5%">
        企业A监测站点
      </view>
    </view>
    <!-- 列表 -->
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
        @scroll="scroll">
        <view class="detailCards">
          <view v-for="(item,iIndex) in tableFactorList" :key="iIndex"  class="detailCard">
            <view class="inlineFactor" v-if="platFormId!=21 && platFormId!=39">
                <view class="factorName">企业名称：</view>
                <view class="factorValue">{{item.deptName}}</view>
            </view>
            <view class="factorList">
              <view class="singleFactor">
                <view class="factorName">区域：</view>
                <view class="factorValue">{{item.area}}</view>
              </view>
              <view class="singleFactor">
                <view class="factorName">站点：</view>
                <view class="factorValue">{{item.siteName}}</view>
              </view>
            </view>
            <view class="factorList">
              <view class="singleFactor">
                <view class="factorName">设备号：</view>
                <view class="factorValue">{{item.deviceSn}}</view>
              </view>
              <view class="singleFactor">
                <view class="factorName">安装位置：</view>
                <view class="factorValue">{{item.deviceLocation}}</view>
              </view>
            </view>
            <view class="factorList">
                <view class="singleFactor">
                  <view class="factorName">监控因子：</view>
                  <view class="factorValue">{{item.alias}}</view>
                </view>
                <view class="singleFactor">
                  <view class="factorName">预警类型：</view>
                  <view class="factorValue">{{item.alertTypeName}}</view>
                </view>
            </view>
            <view class="inlineFactor">
              <view class="inlineFactorName">预警阈值：</view>
              <view class="inlineFactorValue ">{{item.standardVal}}</view>
            </view>
                <view class="inlineFactor">
                  <view class="inlineFactorName">开始时间：</view>
                  <view class="inlineFactorValue ">{{item.startTime}}</view>
                </view>
                <view class="inlineFactor">
                  <view class="inlineFactorName">结束时间：</view>
                  <view class="inlineFactorValue ">{{item.endTime}}</view>
                </view>
                <view class="factorList">
                  <view class="singleFactor">
                    <view class="factorName">持续时间：</view>
                    <view class="factorValue">{{item.duration}}</view>
                  </view>
                  <view class="singleFactor">
                      <view class="factorName">状态：</view>
                      <view class="factorValue">{{item.status==1?'已处理':'未处理'}}</view>
                  </view>

              </view>
              <view class="cardButtons">
                  <button class="cu-btn round bg-green" v-if="item.status==1" @tab="showForm(item)" >查看</button>
                  <button class="cu-btn round bg-red" v-else @tab="showForm(item)">处理</button>
              </view>
            </view>
      </view>
    </scroll-view>
<bottomMenu url="airPollution_alert"></bottomMenu>
    <view class="noData" v-if="isNoData">暂无数据</view>
    <!-- 卡片结束 -->
    <!-- <view>
    <abnormal-form v-if="abnormalFormHShow" @poupClose='listenPoupClose' :message="chooseRecord" :isShow="abnormalFormHShow"></abnormal-form>
    </view> -->
</view>
</template>
<script>
// import abnormalForm from "@/components/abnormalForm"; //引入子组件
import bottomMenu from "../bottomMenu/index";
export default {
  components: { bottomMenu },
  data() {
    return {
      radio: "A",
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      searchValue: "",
      active: "",
      selectMenu: "warning",
      date: "",
      show: false,
      current: 0,
      size: 10,
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
          id: "1372752156486012930",
          deviceFactorId: null,
          startTime: "2021-03-19 11:19:51",
          endTime: "",
          isOver: 0,
          type: 1,
          status: 0,
          isDeleted: null,
          createTime: "",
          handleTime: "",
          st: null,
          conclusion: "",
          alertVal: -1,
          curVal: -1,
          abnormalReportId: null,
          abnormalReason: "",
          feedback: "",
          area: "锡山区",
          deptName: "企业A",
          siteName: "站点A（劣V）",
          groupName: "",
          deviceSn: "20201203001",
          deviceLocation: "站点A",
          alias: "SO2",
          alertTypeName: "超标",
          standardVal: "10.12",
          duration: "22天3小时22分",
          statusName: "未处理",
          factorName: "",
          unit: "",
          time: "",
        },
        {
          id: "1372752156486012930",
          deviceFactorId: null,
          startTime: "2021-03-19 11:19:51",
          endTime: "",
          isOver: 0,
          type: 1,
          status: 0,
          isDeleted: null,
          createTime: "",
          handleTime: "",
          st: null,
          conclusion: "",
          alertVal: -1,
          curVal: -1,
          abnormalReportId: null,
          abnormalReason: "",
          feedback: "",
          area: "锡山区",
          deptName: "企业A",
          siteName: "站点A（劣V）",
          groupName: "",
          deviceSn: "20201203001",
          deviceLocation: "站点A",
          alias: "SO2",
          alertTypeName: "超标",
          standardVal: "10.12",
          duration: "22天3小时22分",
          statusName: "未处理",
          factorName: "",
          unit: "",
          time: "",
        },
      ],
      abnormalFormHShow: false,
      chooseRecord: {},
      alertType: "",
      isHandled: "",
      queryType: "1",
      st: "",
      startShow: false,
      endShow: false,
      searchContent: [],
      isShowSearchContent: false,
      point: "",
      deptId: localStorage.getItem("dept_id"),
      platFormId: "",
      isNoData: false,
    };
  },
  methods: {
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
    goTop: function (e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(function () {
        this.scrollTop = 0;
      });
      uni.showToast({
        icon: "none",
        title: "纵向滚动 scrollTop 值已被修改为 0",
      });
    },
    RadioChange(e) {
      this.radio = e.detail.value;
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
      this.startShow = false;
      this.tableFactorList = [];
      this.current = 1;
      this.start = this.formatSelectDate(date);
      if (this.start > this.end) {
        this.end = this.formatSelectDate(date);
      }
      this.getList();
    },
    onEndConfirm(date) {
      this.endShow = false;
      this.tableFactorList = [];
      this.current = 1;
      this.end = this.formatSelectDate(date);
      if (this.start > this.end) {
        // Toast({
        //   message: "开始时间必须小于结束时间！",
        //   duration: 2000,
        // });
        this.start = this.formatSelectDate(date);
      }
      this.getList();
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
    // 获取列表 treeId,start,end,current,size
    getList() {
      var that = this;
      if (that.platFormId == 99) {
        abnormalInfoRecords(
          that.platFormId,
          that.deptId,
          that.start,
          that.end,
          that.current,
          that.size,
          that.alertType,
          that.isHandled,
          that.queryType,
          that.platFormId
        ).then(
          function (result) {
            let list = result.data.data.records;
            for (let i = 0; i < list.length; i++) {
              that.tableFactorList.push(list[i]);
            }
            that.loading = false;
            if (that.tableFactorList.length == 0) {
              //   Toast({
              //   message: '无数据',
              //   duration: 2000
              // });
              that.isNoData = true;
            }
          },
          function (err) {
            Toast.fail(err.msg);
          }
        );
      } else {
        getWarnRecords(
          that.platFormId,
          that.deptId,
          that.start,
          that.end,
          that.current,
          that.size,
          that.alertType,
          that.isHandled,
          that.queryType,
          that.platFormId
        ).then(
          function (result) {
            let list = result.data.data.records;
            for (let i = 0; i < list.length; i++) {
              that.tableFactorList.push(list[i]);
            }
            that.loading = false;
            if (that.tableFactorList.length == 0) {
              // Toast({
              //   message: "无数据",
              //   duration: 2000,
              // });
              that.isNoData = true;
            }
          },
          function (err) {
            Toast.fail(err.msg);
          }
        );
      }
    },
    listenPoupClose(data) {
      this.abnormalFormHShow = false;
      //刷新列表
      this.current = 1;
      this.tableFactorList = [];
      this.getList();
    },
    // 头部检索
    onSearch() {
      this.isShowSearchContent = true;
      this.pointsList();
    },
    pointsList() {
      var that = this;
      searchPoints(that.platFormId, that.searchValue).then(
        function (result) {
          that.searchContent = result.data.data;
          if (that.platFormId == 99) {
            that.deptId = result.data.data[0].groupId;
            that.point =
              result.data.data[0].deptName +
              "-" +
              result.data.data[0].siteName +
              "-" +
              result.data.data[0].groupName;
          } else {
            that.deptId = result.data.data[0].siteId;
            that.point =
              result.data.data[0].deptName + "-" + result.data.data[0].siteName;
            if (that.current == 0) {
              that.getList();
            }
          }
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
    //处理信息提交 abnormalInfoSubmit
    //选择站点
    selectPort(e) {
      this.tableFactorList = [];
      this.current = 1;
      if (this.platFormId == 99) {
        this.deptId = e.groupId;
      } else {
        this.deptId = e.siteId;
      }
      this.isShowSearchContent = false;
      if (this.platFormId == 99) {
        this.point = e.deptName + "-" + e.siteName + "-" + e.groupName;
      } else {
        this.point = e.deptName + "-" + e.siteName;
      }
      this.getList();
    },
    //获取前几天
    // 返回前number天的日期格式为2020-02-02，参数number为前几天
    getBeforeDate(number) {
      const num = number;
      const date = new Date();
      let year = date.getFullYear();
      let mon = date.getMonth() + 1;
      let day = date.getDate();
      if (day <= num) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      date.setDate(date.getDate() - num);
      year = date.getFullYear();
      mon = date.getMonth() + 1;
      day = date.getDate();
      const s =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    },
  },
  mounted: function () {
    this.end = this.formatSelectDate(new Date());
    this.start = this.formatSelectDate(new Date());
  },
};
</script>
<style scoped lang="scss">
	.scroll-Y {
		height: 730rpx;
	}
.van-search {
  padding: 2px 12px 5px 12px;
}
.header_search {
  margin: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-left;
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
.detailCard_header_point {
  display: flex;
  flex-wrap: nowrap;
  justify-content: left;
  height: 39px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 12px 12px;
  margin: 0px 15px;
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
