import request from '../utils/request'

const KEY = '41bccd916694739610667acfd4e18dc6'

// 新闻列表
export function getNewsList(data) {
	return request({
		url: 'toutiao/index',
		data
	});
}

// 新闻详情
export function getNewsDetail(data) {
	return request({
		url: 'toutiao/content',
		data
	});
}