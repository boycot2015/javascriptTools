/**
 * @description 导出全局默认消息提示配置
 **/
const msgConfig = {
	title: '温馨提示',
    //加载时显示文字
    loadingText: '数据加载中...',
	//删除时显示文字
    deleteText: '确定删除？',
	//提交中显示文字
    submitText: '提交中...',
	confirmColor: '',
	cancelColor: '',
	//删除时显示文字
	order: {
		error: '订单提交失败，请重试！',
		warning: '获取订单信息异常！',
		success: '订单提交成功！',
	},
	error: {
		'13503': {
			title: '网站已停用',
			showModal: true,
			showCancel: false,
			disabled: true,
			text: '网站已停用,请联系管理员!'
		},
		'11111': {
			title: '登录',
			turnPage: true,
			showModal: true,
			showCancel: false,
			text: '登录信息已失效,请重新登录!',
			path: '/pages/public/login'
		},
		'11112': {
			title: '温馨提示',
			showModal: true,
			showCancel: false,
			disabled: false,
			turnPage: true,
			text: '该账号已在其他终端登录!',
			path: '/pages/public/login'
		},
		'11113': {
			title: '温馨提示',
			showModal: true,
			showCancel: false,
			disabled: false,
			text: '该账号已被冻结，暂时无法登录!'
		},
	}
}
export default msgConfig
