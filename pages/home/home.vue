<template>
	<view class="home-container">
		<view style="text-align: center;">
			<image class="logo" src="../../static/nice.png" mode="aspectFit"></image>
		</view>
		<view style="text-align: center;">
			<text class="text">头条新闻</text>
		</view>
		<view class="tab-sticky">
			<my-tabs :tabData="tabData" :defaultIndex="currentIndex" :config="{ textColor: '#333333' }"
				@tabClick="tabClick"></my-tabs>
		</view>
		<!-- list -->
		<swiper class="swiper" :current="currentIndex" :style="{ height: currentSwiperHeight + 'px' }"
			@animationfinish="onSwiperEnd" @change="onSwiperChange">
			<swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key='tabIndex'>
				<view>
					<!-- 加载动画 -->
					<uni-load-more status="loading" v-if="isLoading"></uni-load-more>
					<block v-else>
						<home-list-item :class="'hot-list-item-' + tabIndex" v-for="(item, index) in listData[tabIndex]"
							:key="index" :data="item" :num="index + 1" @click="onItemClick(item)"></home-list-item>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { time } from 'console';
import { getNewsList } from '../../api/home.js';
export default {
	data() {
		return {
			tabData: [
				{
					"type": "top",
					"tabName": "热门",
				},
				{
					"type": "guonei",
					"tabName": "国内",
				},
				{
					'type': 'guoji',
					'tabName': '国际',
				},
				{
					'type': 'yule',
					'tabName': '娱乐',
				},
				{
					'type': 'tiyu',
					'tabName': '体育',
				},
				{
					'type': 'junshi',
					'tabName': '军事',
				},
				{
					'type': 'keji',
					'tabName': '科技',
				},
				{
					'type': 'caijing',
					'tabName': '财经',
				},
				{
					'type': 'youxi',
					'tabName': '游戏',
				},
				{
					'type': 'qiche',
					'tabName': '汽车',
				},
				{
					'type': 'jiankang',
					'tabName': '健康',
				}
			],
			// 当前的切换 index
			currentIndex: 0,
			// list列表数据加载
			isLoading: true,
			// 以index为key,对应的list为val
			listData: {},
			// 当前swiper的高度
			currentSwiperHeight: 0,
			// 以 index 为 key，对应的 swiper 的高度 为 val
			swiperHeightData: {},
			// 当前的滚动距离
			currentPageScrollTop: 0,
			page: 1,
			pageSize: 20
		};
	},
	// 实例在创建完成后被立即调用
	created() {
		// this.getList();
	},
	// 监听页面滚动
	onPageScroll(res) {
		this.currentPageScrollTop = res.scrollTop;
	},
	// 定义方法
	methods: {
		async getList() {
			// 展示loading
			this.isLoading = true;
			// 获取列表数据
			const type = this.tabData[this.currentIndex]['type'];
			const data = await getNewsList({
				'key': '41bccd916694739610667acfd4e18dc6',
				'type': type,
				'page': this.page,
				'page_size': this.pageSize,
				'is_filter': 1
			});
			// 放入数据存储
			this.listData[this.currentIndex] = data.result.data;
			this.isLoading = false;
			setTimeout(async () => {
				// 获取当前 swiper 的高度
				this.currentSwiperHeight = await this.getCurrentSwiperHeight();
				const hSwiperHeight = await this.getCurrentSwiperHeight();
				console.log("hSwiperHeight = " + hSwiperHeight)
				// 放入缓存
				this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight;
			}, 0);
		},
		// tab item 的点击事件
		tabClick(index) {
			this.currentIndex = index;
		},
		// 监听 swiper 的切换事件
		onSwiperChange(e) {
			if (this.currentPageScrollTop > 130) {
				// 控制列表滚动位置
				uni.pageScrollTo({
					scrollTop: 130
				});
			}
			// 解决官方 swiper 在 change 里改变 current 值无限左右抖动的 bug
			if (e.detail.source === 'touch') {
				this.currentIndex = e.detail.current;
			}
		},
		/**
		 * 解决卡顿问题；等待 swiper 动画完成之后，获取数据
		 */
		onSwiperEnd() {
			// 判断缓存是否有数据，不存在则重新获取数据
			if (!this.listData[this.currentIndex]) {
				this.getList();
				return;
			}
			// 未 return ，则证明存在缓存数据，即同时存在 height 的缓存数据
			this.currentSwiperHeight = this.swiperHeightData[this.currentIndex];
		},
		/**
		 * 计算当前 swiper 的高度
		 */
		getCurrentSwiperHeight() {
			return new Promise((resolve, reject) => {
				let sum = 0;
				const query = uni.createSelectorQuery().in(this);
				query
					.selectAll(`.hot-list-item-${this.currentIndex}`)
					.boundingClientRect((res) => {
						res.forEach((item) => {
							sum += item.height;
						});
						console.log("sum = " + sum)
						resolve(sum);
					})
					.exec();
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.home-container {
	background-color: $uni-bg-color;

	.text {
		font-size: $uni-font-size-base;
	}

	.logo {
		align-content: center;
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}

	.tab-sticky {
		// position: -webkit-sticky;
		// position: sticky;
		// z-index: 99;
		// top: 0;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		position: -webkit-sticky;
		/* #endif */
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		border-top: 1px #f9f9f9 solid;
		border-bottom: 1px #f9f9f9 solid;
		background: #fff;
	}

}
</style>
