<template name="basics">
	<view class="bg">
		<view>
			<view class="UCenter-bg">
				<image @tap="goLogin" class="png" mode="widthFix" src="/static/logo.png"></image>
				<view class="text-xl" style="margin-top: 5px;">
					环保APP
				</view>
			</view>

			<form class="search-form margin-left margin-right">
				<view  v-if="tenantMode"  class="cu-form-group margin">
					<view class="title">
						<text class="lg text-gray cuIcon-people"></text>
					</view>
					<input placeholder="租户id" v-model="loginForm.tenantId"></input>
				</view>
				<view class="cu-form-group margin">
					<view class="title">
						<text class="lg text-gray cuIcon-people"></text>
					</view>
					<input placeholder="用户名" v-model="loginForm.userName"></input>
				</view>

				<view class="cu-form-group margin">
					<view class="title">
						<text class="lg text-gray cuIcon-lock"></text>
					</view>
					<input password="" placeholder="密码" v-model="loginForm.password"></input>
				</view>

				<view class="cu-form-group margin" v-if="this.appConfig.captchaMode">
					<view class="title">
						<text class="lg text-gray cuIcon-barcode"></text>
					</view>
					<input placeholder="验证码" v-model="loginForm.code"></input>
					<img :src="loginForm.image" @click="refreshCode" class="login-code-img" />
				</view>

.
				<button @click="login" class="cu-btn block bg-cyan margin lg"> 登录 </button>

			</form>
		</view>
	</view>
</template>

<script>
	import {
		localLogin,
		getCode,
		authVerify,
		decryptData,
		code2Session
	} from "../../api/user.js";
	import {tokenUtil} from '../../utils/token.js'
	import md5 from '../../utils/md5.js'
	export default {
		name: "login",
		data() {
			return {
				tenantMode: this.appConfig.tenantMode,
				loginForm: {
					//租户ID
					tenantId: "000000",
					
					userName: "admin",
					password: "DtoneAdmin",
					//账号类型
					type: "account",
					code: "",
					key: "",
					//预加载白色背景
					image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
				}
			}
		},
		onLoad() {

		},
		created() {
			this.refreshCode();
		},
		methods: {
			login() {
				if (this.loginForm.userName == "" || this.loginForm.password == "" || (this.appConfig.captchaMode && this.loginForm.code == "")) {
					uni.showToast({
						icon: "none",
						title: "请先完善表单~",
					})
					return;
				}
				var params = {};
				let header ={'Captcha-Key':this.loginForm.key,'Captcha-Code':this.loginForm.code,'Tenant-Id':this.loginForm.tenantId,'Authorization': 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'};
				params.tenantId = this.loginForm.tenantId;
				params.username = this.loginForm.userName;
				params.password = md5(this.loginForm.password);
				params.type = this.loginForm.type;
				params.grant_type = this.appConfig.grant_type;
				params.scope = "all";
				localLogin(params,{header:header}).then(response => {
					if (response.error_description) {
						uni.showToast({
							icon: "none",
							title: response.error_description,
						})
					} else if (response.msg == '验证码不正确') {
						uni.showToast({
							icon: "none",
							title: "验证码不正确",
						})
					} else {
						const data = response;
						// 设置token
						tokenUtil.set(data);
						uni.showToast({
							icon: "none",
							title: "登录成功",
						})
						// 跳转个人中心页
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/index/index',
							});
						}, 500);
					}
				});
			},
			refreshCode() {
				getCode().then(res => {
					const data = res;
					this.loginForm.key = data.key;
					this.loginForm.image = data.image;
				})
			},
		}
	}
</script>


<style scoped>
	.page {
		height: 100vh;
	}
	.bg {
		height: 100vh;
		background-image: url(../../static/images/login_bg.png);
		background-size: cover;
	}

	.UCenter-bg {
		height: 40vh;
		display: flex;
		justify-content: center;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.margin {
		margin: 30rpx 100rpx 0;
	}

	.cu-form-group {
		border-radius: 10rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}
</style>
