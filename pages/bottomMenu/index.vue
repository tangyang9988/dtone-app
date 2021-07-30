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
            currentUrl == 'airPollution_index' || currentUrl == 'surfaceWater_index' || currentUrl =='pollutionSurfaceWater_index'|| currentUrl =='pollutionSurfaceGases_index'
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
            currentUrl == 'airPollution_history' ? 'text-green' : 'text-gray'
          "
          >历史数据</view
        >
      </view>
      <view
        class="action"
        @click="hisClick"
        data-cur="airPollution_alert"
        v-if="
          PageCur == 'pollutionSurfaceWater_index' ||
          PageCur == 'pollutionSurfaceGases_index'
        "
      >
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s11.png"></image>
        </view>
        <view
          :class="currentUrl == 'airPollution_alert' ? 'text-green' : 'text-gray'"
          >预警管理</view>
      </view>
      <view class="action" @click="hisClick" data-cur="airPollution_waiting" v-if="role_name=='pollute_maintain'">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s12.png"></image>
        </view>
        <view
          :class="
            currentUrl == 'airPollution_waiting' ? 'text-green' : 'text-gray'
          "
          >待办</view
        >
      </view>
      <view class="action" @click="hisClick" data-cur="home_page">
        <view class="cuIcon-cu-image">
          <image src="../../static/images/icon/s3.png"></image>
        </view>
        <view :class="currentUrl == 'home_page' ? 'text-green' : 'text-gray'"
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
      currentUrl:"",
      PageCur: uni.getStorageSync('url'),
      clickUrl: uni.getStorageSync('clickUrl'),
      role_name: uni.getStorageSync('role_name')
    };
  },
  methods: {
    hisClick: function (e) {
      if (e.currentTarget.dataset.cur == "airPollution_index") {
        if (this.PageCur == "airPollution_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/airPollution/index",
            });
          }, 500);
        } else if (this.PageCur == "surfaceWater_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/surfaceWater/index",
            });
          }, 500);
        } else if (this.PageCur == "pollutionSurfaceWater_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/pollutionSurfaceWater/index",
            });
          }, 500);
        }else if (this.PageCur == "pollutionSurfaceGases_index") {
          setTimeout(function () {
            uni.navigateTo({
              url: "/pages/pollutionSurfaceGases/index",
            });
          }, 500);
        }
      }else if (e.currentTarget.dataset.cur == "airPollution_history") {
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
      } else if (e.currentTarget.dataset.cur == "airPollution_waiting") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/airPollution/waiting",
          });
        }, 500);
      } else if (e.currentTarget.dataset.cur == "home_page") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/index/index",
          });
        }, 500);
      }
    },
  },
  mounted() {
    this.currentUrl =this.url
  },
};
</script>

<style>
</style>
