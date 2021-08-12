<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="false">
			<block slot="content">智慧环保</block>
		</cu-custom>
		<view class="margin-top margin-left solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>环保实时图
			</view>
		</view>
			<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper>
		<view class=" margin-top margin-left solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>功能菜单
			</view>
		</view>
		<view class="menu">
			<view class="moudle"  @click="airPollution">
				<view class="bacimage2"></view>
				<view style="text-align: center;">
				 空气
				</view>
			</view>
			<view class="moudle" @click="surfaceWater">
				<view class="bacimage1"></view>
				<view style="text-align: center;">
				 地表水
				</view>
			</view>
			<view class="moudle" @click="pollutionSurfaceWater">
				<view class="bacimage3"></view>
				<view style="text-align: center;">
				 废水
				</view>
			</view>
			<view class="moudle" @click="gases">
				<view class="bacimage4"></view>
				<view style="text-align: center;">
				 废气
				</view>
			</view>
		</view>
		<button type="primary" style="margin:0 20px 10px 20px;" @click="quit()">退出</button>
	</view>

</template>
<script>
	export default {
		data() {
			return {
				isRefresh: "",
				PageCur: 'blogHome',
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/images/1.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '../../static/images/2.jpg'
				}, {
					id: 2,
					type: 'image',
					url: '../../static/images/3.jpg'
				}, {
					id: 3,
					type: 'image',
					url: '../../static/images/4.jpg'
				}, {
					id: 4,
					type: 'image',
					url: '../../static/images/2.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
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
			quit(){
			setTimeout(function () {
			uni.navigateTo({
				url: "/pages/login/login",
			});
			}, 500);
			},
			surfaceWater(){
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/surfaceWater/index',
					});
				}, 500);
			uni.setStorageSync("url","surfaceWater_index")
			},
			airPollution(){
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/airPollution/index',
					});
				}, 500);
			uni.setStorageSync("url","airPollution_index")
			},
			pollutionSurfaceWater(){
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/pollutionSurfaceWater/index',
					});
				}, 500);
			uni.setStorageSync("url","pollutionSurfaceWater_index")
			},
			gases(){
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/pollutionSurfaceGases/index',
					});
				}, 500);
			uni.setStorageSync("url","pollutionSurfaceGases_index")
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},

			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},

			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},

			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style>
.menu{
display: flex;
flex-wrap: wrap;
justify-content:space-between;
margin:10px 20px;
padding:20px;
background: #ffffff;
box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
opacity: 1;
border-radius: 12px;
}
.moudle{
  width:25%;
  height:25%;
  margin:15px 20px;
}
.bacimage1{
  height:85px;
  width: 85px;
  background: url(../../static/images/icon/21.png) no-repeat;
  background-size: cover;
}
.bacimage2{
  height:85px;
  width: 85px;
  background: url(../../static/images/icon/22.png) no-repeat;
  background-size: cover;
}
.bacimage3{
  height:85px;
  width: 85px;
  background: url(../../static/images/icon/24.png) no-repeat;
  background-size: cover;
}
.bacimage4{
  height:85px;
  width: 85px;
  background: url(../../static/images/icon/23.png) no-repeat;
  background-size: cover;
}

</style>
