import {
  IMG_URL, API_URL
} from '../config';
import * as Constant from '../config'

function fullImg(value, custom) {
  let prefix;
  custom ? prefix = custom : prefix = IMG_URL
  if (
    value &&
    value.indexOf("http://") != 0 &&
    value.indexOf("https://") != 0
  ) {
    if (value.indexOf("base64,") == -1) {
      return prefix + value
    } else return value
  } else return value;
}

function getCurrentTime() {
  var keep = '';
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  var rand = Math.round(Math.random() * 899 + 100);
  keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
  return keep; //20160614134947
}

//验证是否是手机号码
function vailPhone(number) {
  let flag = false;
  let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
  if (number.length != 11) {
    flag = flag;
  } else if (!myreg.test(number)) {
    flag = flag;
  } else {
    flag = true;
  }
  return flag;
}
//浮点型除法
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) { }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) { }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
//浮点型加法函数
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//浮点型乘法
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) { }
  try {
    c += e.split(".")[1].length;
  } catch (f) { }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

// 遍历对象属性和值
function displayProp(obj) {
  var names = "";
  for (var name in obj) {
    names += name + obj[name];
  }
  return names;
}
// 去除字符串所有空格
function sTrim(text) {
  return text.replace(/\s/ig, '')
}
//去除所有:
function replaceMaohao(txt) {
  return txt.replace(/\:/ig, '')
}
/**
 * 倒计时
 * @param {int} intDiff
 */
function timer(intDiff) {
  var day = 0,
    hour = 0,
    minute = 0,
    second = 0;//时间默认值
  if (intDiff > 0) {
    day = Math.floor(intDiff / (60 * 60 * 24));
    hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
    minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
    second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    var res_day = day > 0 ? day + '天' : '',
      res_hour = hour > 0 ? hour + '时' : '',
      res_minute = minute >= 0 ? minute + '分' : "",
      res_second = second + '秒';
  }
  if (minute <= 9) res_minute = '0' + res_minute;
  if (second <= 9) res_second = '0' + res_second;
  var left_time = '剩余' + res_day + res_hour + res_minute + res_second;
  return left_time
}
//格式化时间戳
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}
//系统剪贴板
function clipBoard(data, method, callback) {
  method = method || 'GET';
  if (method && method.toUpperCase() == 'SET') {
    wx.setClipboardData({
      data: data,
      success: function (res) {
        callback(res);
      }
    })
  } else if (method && method.toUpperCase() == 'GET') {
    obj = wx.getClipboardData({
      success: function (res) {
        callback(res);
      }
    });
  }
}

function getAsUriParameters(data) {
  var uri = ''
  for (var i in data) {
    if (data[i] instanceof Array) {
      var keyE = encodeURIComponent(i + '[]');
      for (var j in data[i]) {
        uri += keyE + '=' + encodeURIComponent(data[i][j]) + '&'
      }
    } else if (data[i] instanceof Object) {
      for (var j in data[i]) {
        var keyE = encodeURIComponent(i + '[' + j + ']');
        uri += keyE + '=' + encodeURIComponent(data[i][j]) + '&'
      }
    } else {
      uri += i + '=' + encodeURIComponent(data[i]) + '&'
    }
  }
  return uri
};
function savePhoto(url) {
  wx.saveImageToPhotosAlbum({
    filePath: url,
    success: () => {
      wx.showToast({
        title: title || '保存成功',
        icon: 'success',
      })
    },
    fail: res => {
      if (res.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
        return;
      }
      authorize(() => {
        openSetting() // 失败打开设置
      })
    }
  })
}
function authorize(cb) {
  wx.authorize({
    scope: "scope.writePhotosAlbum",
    success() {
      savePhoto()
    },
    fail() {
      if (cb) { cb() } // 失败回调
    }
  })
}
function openSetting() {
  wx.showModal({
    title: '确定提示',
    content: '需要打开小程序授权保存到相册',
    success(res) {
      if (res.confirm) {
        wx.openSetting({})
      }
    }
  })
}
function dateConversion(date) {
  const o_month = (date.getMonth() + 1).toString().length <= 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const o_date = date.getDate().toString().length <= 1 ? '0' + date.getDate() : date.getDate()
  let numStr = date.getFullYear() + '' + o_month + '' + o_date + ''
  // let numStr = str.replace(/[^0-9]+/g, '');
  const chinese = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  var cc = ["日", "一", "二", "三", "四", "五", "六"];
  let year = chinese[numStr[0]] + chinese[numStr[1]] + chinese[numStr[2]] + chinese[numStr[3]];
  let month = numStr[4] === '0' ? chinese[numStr[5]] : chinese[10] + chinese[numStr[5]];
  let dateStr = numStr[6] === '0' ? chinese[numStr[7]] : chinese[10] + chinese[numStr[7]];
  const day = cc[date.getDay()]
  return {
    year, month, day, date: dateStr
  }
}
function getImageInfo(path) {
  return new Promise(resolve => {
    wx.getImageInfo({
      src: path,
      success(res) {
        resolve(res)
      }
    })
  })
}

/**
 * 判断是否是数组
 */
// function isArray(o) {
//   return Object.prototype.toString.call(o) == '[object Array]';
// }

module.exports = {
  getCurrentTime: getCurrentTime,
  displayProp: displayProp,
  sTrim: sTrim,
  replaceMaohao: replaceMaohao,
  vailPhone: vailPhone,
  div: div,
  mul: mul,
  accAdd: accAdd,
  timer: timer,
  formatTime: formatTime,
  clipBoard: clipBoard,
  fullImg: fullImg,
  getAsUriParameters,
  savePhoto,
  dateConversion,
  getImageInfo
}
