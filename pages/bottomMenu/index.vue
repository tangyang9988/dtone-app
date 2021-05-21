<template>
  <view>
    <!-- <basics v-if="PageCur=='basics'"></basics>
		<components v-if="PageCur=='component'"></components>
		<plugin v-if="PageCur=='plugin'"></plugin> -->
    <view class="cu-bar tabbar bg-white shadow foot">
      <view class="action" @click="hisClick" data-cur="airPollution_index">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s9.png"></image>
        </view>
        <view
          :class="
            PageCur == 'airPollution_index' || PageCur == 'surfaceWater_index'
              ? 'text-green'
              : 'text-gray'
          "
          >首页</view
        >
      </view>
      <view class="action" @click="hisClick" data-cur="airPollution_history">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s10.png"></image>
        </view>
        <view
          :class="
            PageCur == 'airPollution_history' ? 'text-green' : 'text-gray'
          "
          >历史数据</view
        >
      </view>
      <view class="action" @click="hisClick" data-cur="airPollution_alert">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s11.png"></image>
        </view>
        <view
          :class="PageCur == 'airPollution_alert' ? 'text-green' : 'text-gray'"
          >预警管理</view
        >
      </view>
      <!-- <view class="action" @click="hisClick" data-cur="airPollution_siteReport">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s12.png"></image>
        </view>
        <view
          :class="
            PageCur == 'airPollution_siteReport' ? 'text-green' : 'text-gray'
          "
          >站点报表</view
        >
      </view> -->
      <view class="action" @click="hisClick" data-cur="airPollution_siteReport">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s12.png"></image>
        </view>
        <view
          :class="
            PageCur == 'airPollution_siteReport' ? 'text-green' : 'text-gray'
          "
          >待办</view>
      </view>
      <view class="action" @click="hisClick" data-cur="home_page">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s3.png"></image>
        </view>
        <view :class="PageCur == 'home_page' ? 'text-green' : 'text-gray'"
          >主菜单</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      PageCur: localStorage.getItem("url"),
    };
  },
  methods: {
    hisClick: function (e) {
      if (e.currentTarget.dataset.cur == "airPollution_index") {
        if (localStorage.getItem("url") == "airPollution_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/airPollution/index",
            });
          }, 500);
        } else if (localStorage.getItem("url") == "surfaceWater_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/surfaceWater/index",
            });
          }, 500);
        } else if (
          localStorage.getItem("url") == "pollutionSurfaceWater_index"
        ) {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/pollutionSurfaceWater/index",
            });
          }, 500);
        }
      } else if (e.currentTarget.dataset.cur == "airPollution_history") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/airPollution/history",
          });
        }, 500);
      } else if (e.currentTarget.dataset.cur == "airPollution_alert") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/airPollution/alert",
          });
        }, 500);
      } else if (e.currentTarget.dataset.cur == "airPollution_siteReport") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/airPollution/siteReport",
          });
        }, 500);
      } else if (e.currentTarget.dataset.cur == "trend_analysis") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/airPollution/trendanalysis",
          });
        }, 500);
      }else if (e.currentTarget.dataset.cur == "home_page") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/index/index",
          });
        }, 500);
      }
    },
  },
  mounted() {
    this.PageCur = this.url;
    console.log(this.PageCur);
  },
};
</script>

<style>
</style>
