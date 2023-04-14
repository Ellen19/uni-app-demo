// 封装网络请求对象
const BASE_URL = 'http://v.juhe.cn/';
function request({ url, data, method }) {
	return new Promise((resolve, rejects) => {
		uni.request({
			url: BASE_URL + url,
			data: data,
			method: method,
			success: ({ data }) => {

				console.log("reason = " + data.reason)
				console.log("error_code = " + data.error_code)

				if (data.error_code === 0) {
					resolve(data);
				} else {
					//{"resultcode":"112","reason":"超过每日可允许请求次数!","result":null,"error_code":10012}
					console.log("reason = " + data.reason)
					console.log("data = " + data)
					uni.showToast({
						title: data.reason,
						icon: "none",
						mask: true,
						duration: 3000
					});
					rejects(data);
				}
			},
			fail: ({ data }) => {
				//{"resultcode":"112","reason":"超过每日可允许请求次数!","result":null,"error_code":10012}
				console.log("reason = " + data.reason)
				console.log("data = " + data)
				uni.showToast({
					title: data.reason,
					icon: "none",
					mask: true,
					duration: 3000
				});
				rejects(data);

			},
			complete: () => {
				uni.hideLoading();
			}
		});

	});
}

export default request;