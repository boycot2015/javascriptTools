/**
 * @description 导出自定义配置
 **/
const config = {
    layout: 'vertical',
    donation: false,
    templateFolder: 'mobile',
	/**
	 * @description token在Cookie中存储的天数，默认1天
	 */
	cookieExpires: 1,
	/**
	 * @description 默认打开的首页的路由name值，默认为home
	 */
	homeName: '云中鹤积分商城',
	/**
	 * @description 需要加载的插件
	 */
	plugin: {
	    'error-store': {
	        showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
	        developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
	    }
	}
}
export default config
