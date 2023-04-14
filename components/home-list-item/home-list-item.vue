<template>
	<view class="item-container" @click="$emit('click')">
		<view class="item-box">
			<view class="item-box-left">
				{{ num }}
			</view>
			<view class="item-box-right">
				<!-- 标题 -->
				<view class="item-title">{{ data.title }}</view>
				<!-- 简介 -->
				<view class="item-desc ">简介：{{data.title}}</view>
				<!-- 作者 -->
				<view class="item-author">作者：{{data.author_name}}</view>
				<!-- 时间 -->
				<view class="item-time">时间：{{data.date}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "home-list-item",
	props: {
		data: {
			type: Object,
			required: true
		},
		num: {
			type: Number,
			required: true
		}
	},
	data() {
		return {

		};
	}
}
</script>

<style lang="scss" scoped>
.item-container {
	padding-bottom: $uni-spacing-col-lg ;

	.item-box {
		display: flex;
		margin: 0 $uni-spacing-col-base;
		padding: $uni-spacing-row-lg $uni-spacing-col-base;
		background-color: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);

		.item-box-left {
			margin-right: $uni-spacing-row-sm;
		}

		.item-box-right {
			width: 100%;

			.item-title {
				font-size: $uni-font-size-lg;
				font-weight: bold;
				color: $uni-text-color-title;
			}

			.item-desc {
				padding-top: $uni-spacing-row-sm;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
			}

			.item-author {
				padding-top: $uni-spacing-row-base;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}

			.item-time {
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
		}
	}
}
</style>