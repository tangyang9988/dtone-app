<template>
	<view>
		<blogHome :isRefresh='isRefresh' v-if="PageCur=='blogHome'"></blogHome>
		<view class="cu-bar tabbar bg-white shadow foot">

			<view @click="NavChange" class="action" data-cur="blogHome">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/home' + [PageCur=='blogHome'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='blogHome'?'text-blue':'text-gray'">首页</view>
			</view>
		</view>
	</view>
</template>


<script>
	import {getWebConfig} from "../../api/about.js";
	export default {
		data() {
			return {
				isRefresh: "",
				PageCur: 'blogHome'
			}
		},
		onLoad(options) {
			console.log("传递到主页的内容", options)
			if(options.PageCur) {
				this.PageCur = options.PageCur
			}
		},
		onShow: function() {
			console.log('显示APP')
		},
		onHide: function() {
			console.log('隐藏App')
		},
		onPullDownRefresh() {
			this.isRefresh =  (new Date()).getTime().toString();
			setTimeout(function () {
				uni.stopPullDownRefresh()
			}, 500);
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '环保',
			  path: '/pages/index/index?PageCur=blogHome'
			}
		},
		created() {
			// this.getWebConfigData();
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				console.log("跳转", this.PageCur)
			},
			// getWebConfigData() {
			// 	var that = this
			// 	let params = {}
			// 	getWebConfig(params).then(res =>{
			// 		console.log("获取网站配置", res)
			// 		if(res.code == "success") {
			// 			uni.setStorageSync("webConfig", res.data)
			// 		}
			// 	})
			// },
		}
	}
</script>

<style>

</style>
