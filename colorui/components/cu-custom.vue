<template>
	<view>
		<view :style="[{height:CustomBar + 'px'}]" class="cu-custom">
			<view :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]" :style="style" class="cu-bar fixed">
				<view @tap="BackPage" class="action" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>
				<view :style="[{top:StatusBar + 'px'}]" class="content">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
