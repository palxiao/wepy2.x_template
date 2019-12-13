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
  function signText(value) {
    if (value === 'invited') { // 被邀请
      return '已报名'
    } else if (value === 'apply') { //已报名
      return '待通过'
    } else if (value === 'reject') {
      return '被拒绝'
    }
  }
  function getConstant(param) {
    if (Constant[param]) return Constant[param]
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
  
  function objLength(input) {
    var type = toString(input);
    var length = 0;
    if (type != "[object Object]") {
      //throw "输入必须为对象{}！"
    } else {
      for (var key in input) {
        if (key != "number") {
          length++;
        }
  
      }
    }
    return length;
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
  //验证是否西班牙手机(6开头 9位数)
  function ifSpanish(number) {
    let flag = false;
    let myreg = /^([6|7|9]{1}(\d+){8})$/;
    if (number.length != 9) {
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
  //转换星星分数
  function convertStarArray(score) {
    //1 全星,0 空星,2半星
    var arr = []
    for (var i = 1; i <= 5; i++) {
      if (score >= i) {
        arr.push(1)
      } else if (score > i - 1 && score < i + 1) {
        arr.push(2)
      } else {
        arr.push(0)
      }
    }
    return arr
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
  /**
   * 跳转页面
   * @param {string} url 'order_detail'
   */
  function openPage(url, param) {
    param = param || {}
    var arr = [];
    if (!typeof (param) === Object) return false;
    for (var i in param) {
      arr.push(i + '=' + param[i]);
    }
    arr = arr.join('&');
    url = url + '?' + arr
    // console.log(url);
    // return url;
    wx.navigateTo({
      url: url
    })
  }
  //数据转化
  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
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
  
  
  /**
   * 本地数组搜索工具
   */
  function localSearch(groups, search) {
    // console.log(groups,search)
    //防止干扰，深拷贝对象
    groups = JSON.parse(JSON.stringify(groups))
  
    if (isArray(groups)) {
      //新的联系人组
      let newGroups = []
      groups.forEach(group => {
        //遍历联系人组
        let users = group.users
        //搜索后的联系人
        let newUsers = []
        if (isArray(users)) {
          //遍历联系人组中的联系人
          users.forEach(user => {
            //判断是否显示联系人
            if (isShowUser(user, search)) {
              newUsers.push(user)
            }
          })
          group.users = newUsers
        }
        //存在联系人添加到联系人组
        if (newUsers.length > 0) {
          newGroups.push(group)
        }
  
      })
      return newGroups
    }
    return groups
  }
  /**
   * 根据条件判断是否显示联系人
   */
  function isShowUser(user, search) {
    user.showTel1 = false
    user.showTel2 = false
    user.showTel3 = false
    if (!search.name) {
      return true
    }
    //name文字匹配
    if (search.name && search.name.length > 0 && user.name.indexOf(search.name) >= 0) {
      return true
    }
    //中文全拼字母匹配
    let pyletter = user.pingyin
    if (pyletter && pyletter.length > 0 && pyletter.toUpperCase().indexOf(search.name.toUpperCase()) >= 0) {
      return true
    }
    //中文全拼字母匹配
    pyletter = user.pyFirstLetter
    if (pyletter && pyletter.length > 0 && pyletter.toUpperCase().indexOf(search.name.toUpperCase()) >= 0) {
      return true
    }
    //手机号搜索
    if (user.tel1 && user.tel1.indexOf(search.name) >= 0) {
      user.showTel1 = true
      user.showTel2 = false
      user.showTel3 = false
      return true
    }
    if (user.tel2 && user.tel2.indexOf(search.name) >= 0) {
      user.showTel1 = false
      user.showTel2 = true
      user.showTel3 = false
      return true
    }
    if (user.tel3 && user.tel3.indexOf(search.name) >= 0) {
      user.showTel1 = false
      user.showTel2 = false
      user.showTel3 = true
      return true
    }
    return false
  }
  /**
   * 判断是否是数组
   */
  function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }
  
  module.exports = {
    getCurrentTime: getCurrentTime,
    objLength: objLength,
    displayProp: displayProp,
    sTrim: sTrim,
    replaceMaohao: replaceMaohao,
    vailPhone: vailPhone,
    ifSpanish: ifSpanish,
    div: div,
    mul: mul,
    accAdd: accAdd,
    convertStarArray: convertStarArray,
    timer: timer,
    openPage: openPage,
    formatTime: formatTime,
    clipBoard: clipBoard,
    fullImg: fullImg,
    getAsUriParameters,
    localSearch: localSearch,
    getConstant: getConstant,
    signText: signText
  }
  