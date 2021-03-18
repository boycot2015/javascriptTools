/**
 * @description 3个子配置，通用配置|主题配置|网络配置，建议在当前目录下修改config.js修改配置，会覆盖默认配置，也可以直接修改默认配置
 */
//默认配置
import { setting, theme, network, msgConfig } from './default'
//自定义配置
import customConfig from './config'
//导出配置（以自定义配置为主）
export default {
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
    },
	theme,
	network,
	msgConfig,
	customConfig,
	...setting
}

