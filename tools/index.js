// import Cookies from 'js-cookie'
import config from '@/config'
// import CryptoJS from 'crypto-js'

// 获取url参数
export const getUrlParam = () => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
}

// cookie保存的天数
const {
    cookieExpires
} = config

/**
 * @description 设置token, 更新token refresh
 */
export const TOKEN_KEY = 'token'
export const REFRESH_KEY = 'refresh'

// 设置token
/*
    设置cookie
    @description token在Cookie中存储的天数，默认1天
*/
export const setToken = (token) => {
    // Cookies.set(TOKEN_KEY, token, {
    //     expires: cookieExpires
    // })
	uni.setStorageSync(TOKEN_KEY, token);
}

export const getToken = () => {
    // const token = Cookies.get(TOKEN_KEY)
	const token = uni.getStorageSync(TOKEN_KEY);
    if (token) return token
    else return false
}
export function removeToken () {
    // return Cookies.remove(TOKEN_KEY)
	return uni.removeStorageSync(TOKEN_KEY)
}

// 更新 refresh
export const setRefresh = (refresh) => {
    // Cookies.set(REFRESH_KEY, refresh, {
    //     expires: 1
    // })
	uni.setStorageSync(REFRESH_KEY, refresh);
}
export const getRefresh = () => {
    // const refresh = Cookies.get(REFRESH_KEY)
	const refresh = uni.getStorageSync(REFRESH_KEY);
    if (refresh) return refresh
    else return false
}
export function removeRefresh () {
    // return Cookies.remove(REFRESH_KEY)
	return uni.removeStorageSync(REFRESH_KEY)
}

/*
 * 判断微信浏览器
 *  @returns {Boolean}
 */
export const isWeiXin = () => {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        return true
    } else {
        return false
    }
}

/* 过滤非法字符串 */
export const illegalFilter = (str) => {
    //  let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
    let regEn = /[`~!@#$%^&*()_+<>?:"{},./;'[\]]/im
    let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
    if (regEn.test(str) || regCn.test(str)) return false
    return true
}

/**
 * 浏览器判断
 * 用法示例——多套页面判断是否显示移动端：
 *   let ua = parseUA();
 *   if (!ua.mobile) {
 *       location.href = './pc.html';
 *   }
 */
export const parseUA = () => {
    let u = navigator.userAgent
    let u2 = navigator.userAgent.toLowerCase()
    return {
        // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1,
        // IE内核
        presto: u.indexOf('Presto') > -1,
        // opera内核
        webKit: u.indexOf('AppleWebKit') > -1,
        // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
        // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/),
        // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1,
        // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1,
        // 是否iPad
        webApp: u.indexOf('Safari') === -1,
        // 是否web应该程序，没有头部与底部
        iosv: u.substr(u.indexOf('iPhone OS') + 9, 3),
        weixin: u2.match(/MicroMessenger/i) === 'micromessenger',
        ali: u.indexOf('AliApp') > -1
    }
}
export const yzphone = (text) => {
    if (!/^\d{11}$/.test(text)) {
        return false
    }
    return true
}

/** created by zch 2019-08-09
 * @description 采用DES对密码进行加密及解密
 */

// // DES加密 Pkcs7填充方式
// export const encryptByDES = (message, key) => {
//     const keyHex = CryptoJS.enc.Utf8.parse(key)
//     const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return encrypted.ciphertext.toString()
// }
// // DES解密
// export const decryptByDES = (ciphertext, key) => {
//     var keyHex = CryptoJS.enc.Utf8.parse(key)
//     // direct decrypt ciphertext
//     const decrypted = CryptoJS.DES.decrypt({
//         ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
//     }, keyHex, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     })
//     return decrypted.toString(CryptoJS.enc.Utf8)
// }

/** 密码加密解密示例
 * example
 */

// const _key = 'abcdefghijklmn'
// const _password = '123456'
// 加密
// console.log(this.encryptByDES(_password, _key))
// 解密
// console.log(this.decryptByDES(_password, _key))

/**
 * 计算价格向上取整
 * @param {*} num 数字
 * @param {*} fix 保留位数
 */
export const fixNum = (num, fix) => {
    let f = parseFloat(num)
    if (isNaN(f)) {
        return false
    }
    if (f === 0) return 0
    f = Math.ceil(num * (10 ** fix)) / (10 ** fix)
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
        rs = s.length
        s += '.'
    }
    while (s.length <= rs + fix) {
        s += '0'
    }
    return s
}

// 将参数对象的key排序，避免因参数object中的key顺序不同，导致stringify后key不同
export const  sortedObjectByKeys = (obj = {}) => {
  return Object.keys(obj)
    .sort()
    .reduce((prev, cur) => {
      prev[cur] = obj[cur];
      return prev;
    }, {});
}

export const getCacheKey = (config = {}) => {
  let reqParams = {};
  const { method, params, data } = config;
  const reqData = method === 'get' ? params : data;
  if (typeof reqData === 'string') {
    try {
      reqParams = JSON.parse(reqData);
    } catch (err) {
      console.error('parse cacheKey error:: ', err);
    }
  } else {
    reqParams = reqData;
  }
  const reqKey = {
    url: config.url,
    params: sortedObjectByKeys(reqParams),
    method,
  };

  let key;
  try {
    key = btoa(JSON.stringify(reqKey));
  } catch (err) {
    console.error('btoa error::', err);
    key = JSON.stringify(reqKey);
  }

  return key;
}

let _debounceTimeout = null,
	_throttleRunning = false

/**
 * 防抖
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms   
 */
export const debounce = (fn, delay=500) => {
	clearTimeout(_debounceTimeout);
	_debounceTimeout = setTimeout(() => {
		fn();
	}, delay);
}
/**
 * 节流
 * @param {Function} 执行函数
 * @param {Number} delay 延时ms  
 */
export const throttle = (fn, delay=500) => {
	if(_throttleRunning){
		return;
	}
	_throttleRunning = true;
	fn();
	setTimeout(() => {
	    _throttleRunning = false;
	}, delay);
}
/**
 * toast
 */
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}
/**
 * 检查登录
 * @return {Boolean}
 */
export const isLogin = (options={}) => {
	const token = uni.getStorageSync('uniIdToken');
	if(token){
		return true;
	}
	if(options.nav !== false){
		uni.navigateTo({
			url: '/pages/auth/login'
		})
	}
	return false;
}
/**
 * 获取页面栈
 * @param {Number} preIndex为1时获取上一页
 * @return {Object} 
 */
export const prePage = (preIndex = 1) => {
	const pages = getCurrentPages();
	const prePage = pages[pages.length - (preIndex + 1)];

	return prePage.$vm;
}
/**
 * 格式化时间戳 Y-m-d H:i:s
 * @param {String} format Y-m-d H:i:s
 * @param {Number} timestamp 时间戳   
 * @return {String}
 */
export const date = (format, timeStamp) => {
	if('' + timeStamp.length <= 10){
		timeStamp = + timeStamp * 1000;
	}else{
		timeStamp = + timeStamp;
	}
	let _date = new Date(timeStamp),
		Y = _date.getFullYear(),
		m = _date.getMonth() + 1,
		d = _date.getDate(),
		H = _date.getHours(),
		i = _date.getMinutes(),
		s = _date.getSeconds();
	
	m = m < 10 ? '0' + m : m;
	d = d < 10 ? '0' + d : d;
	H = H < 10 ? '0' + H : H;
	i = i < 10 ? '0' + i : i;
	s = s < 10 ? '0' + s : s;

	return format.replace(/[YmdHis]/g, key=>{
		return {Y,m,d,H,i,s}[key];
	});
}
//二维数组去重
export const getUnique = array => {
	let obj = {}
    return array.filter((item, index) => {
		let newItem = item + JSON.stringify(item)
		return obj.hasOwnProperty(newItem) ? false : obj[newItem] = true
	})
}
// 判断类型集合
export const checkStr = (str, type) => {
	switch (type) {
		case 'mobile': //手机号码
			return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
		case 'tel': //座机
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'card': //身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
		case 'mobileCode': //6位数字验证码
			return /^[0-9]{6}$/.test(str)
		case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
			return /^([a-zA-Z0-9_]){6,18}$/.test(str)
		case 'payPwd': //支付密码 6位纯数字
			return /^[0-9]{6}$/.test(str)
		case 'postal': //邮政编码
			return /[1-9]\d{5}(?!\d)/.test(str);
		case 'QQ': //QQ号
			return /^[1-9][0-9]{4,9}$/.test(str);
		case 'email': //邮箱
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'money': //金额(小数点2位)
			return /^\d*(?:\.\d{0,2})?$/.test(str);
		case 'URL': //网址
			return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
		case 'IP': //IP
			return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
		case 'date': //日期时间
			return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
				.test(str)
		case 'number': //数字
			return /^[0-9]$/.test(str);
		case 'english': //英文
			return /^[a-zA-Z]+$/.test(str);
		case 'chinese': //中文
			return /^[\\u4E00-\\u9FA5]+$/.test(str);
		case 'lower': //小写
			return /^[a-z]+$/.test(str);
		case 'upper': //大写
			return /^[A-Z]+$/.test(str);
		case 'HTML': //HTML标记
			return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
		default:
			return true;
	}
}

export const getSystemInfo = function() {
	let data = {};
	uni.getSystemInfo({
		success: function (res) {
			data = res;
		}
	})	
	return data;
}

export const px2Rpx = function(px) {
  let screenWidth = getSystemInfo().screenWidth;
  let factor = 750 / screenWidth;
  return factor * px;
}

export const isNotEmpty = function(str) {
  if (str != "" && str != undefined && str != "undefined" && str != null && str != 'null') {
    return true;
  } else {
    return false;
  }
}

// 处理返回的结果工具类
export class returnsErrorClass {
	constructor(props) {
	    this.data = props
	}
	returnFun () {
		if (config.msgConfig.error[this.data.code]) {
			let errObj = config.msgConfig.error[this.data.code]
			errObj.showModal && uni.showModal({
				title: errObj.title,
				content: errObj.text,
				showCancel: errObj.showCancel,
				success: (res) => {
					errObj.disabled && this.returnFun()
					let url = errObj.path || `/pages/error?code=${this.data.code}`
					errObj.turnPage && uni.redirectTo({
						url
					})
				}
			})
			console.log(this.data.code, errObj.showModal, 'dataprops')
		}
		return Promise.resolve(this.data)
	}
}

// 图片压缩工具类
export class zipFileClass {
	constructor(props) {
	    this.obj = props
	}
	readFile(obj) {
	      let file = this.obj
	      //判断类型是不是图片 
	      if (!/image\/\w+/.test(file.type)) {
	        alert("请确保文件为图像类型");
	        return false;
	      }
	     let reader = new FileReader();
	     reader.readAsDataURL(file);
		let _this = this
		return new Promise((resolve, reject) => {
	      	reader.onload = function(e) {
		        _this.dealImage(this.result, { quality: 0.1 }, function(base) {
		          //调用
		          let blob = _this.dataURLtoBlob(base);
		          let newFile = new File([blob], file.name, { type: file.type });
		          console.log(newFile)
		          let r = new FileReader(); //本地预览
		          r.readAsDataURL(newFile); //Base64
					resolve(newFile)
		//            _this.upload(newFile);
		        });
		      }
		})
	    }
    //将base64转换为blob
    dataURLtoBlob(dataurl) {
      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
    /**
     * 图片压缩，默认同比例压缩
     * @param {Object} path
     * pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
     * @param {Object} obj
     * obj 对象 有 width， height， quality(0-1)
     * @param {Object} callback
     * 回调函数有一个参数，base64的字符串数据
     */
	dealImage(path, obj, callback) {
	      let img = new Image();
	      img.src = path;
	      img.onload = function() {
	        let that = this;
	        // 默认按比例压缩
	        let w = that.width,
	          h = that.height,
	          scale = w / h;
	        w = obj.width || w;
	        h = obj.height || (w / scale);
	        let quality = obj.quality || 0.7; // 默认图片质量为0.7
	        //生成canvas
	        let canvas = document.createElement('canvas');
	        let ctx = canvas.getContext('2d');
	        // 创建属性节点
	        var anw = document.createAttribute("width");
	        anw.nodeValue = w;
	        var anh = document.createAttribute("height");
	        anh.nodeValue = h;
	        canvas.setAttributeNode(anw);
	        canvas.setAttributeNode(anh);
	        ctx.drawImage(that, 0, 0, w, h);
	        // 图像质量
	        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
	          quality = obj.quality;
	        }
	        // quality值越小，所绘制出的图像越模糊
	        var base64 = canvas.toDataURL('image/jpeg', quality);
	        // 回调函数返回base64的值
	        callback(base64);
	      }
	 }
	upload(file) {
	      var that = this;
	      // 创建form对象
	      let param = new FormData();
	      // 通过append向form对象添加数据
	      param.append('file', file);
	      // 文件大小
	      param.append('size', file.size);
	      for (var n in that.params) {
	        param.append(n, that.params[n]);
	      }
	      // 创建ajax
	      var xhr = new XMLHttpRequest();
	      xhr.onload = function() {
	        console.log(xhr.responseText)
	      }
	      xhr.open("POST", "https://gatewaytest.haoxiny.com/api/file/yzh/file/upload", true);
	      // 发送表单数据
	      xhr.send(param);
	}
}