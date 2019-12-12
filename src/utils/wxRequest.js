import wepy from 'wepy';

const wxRequest = async (params = {}, url, type = 'GET') => {
  let token = wepy.getStorageSync('token') || "";
  let data = {}
  // console.log(util.getAsUriParameters(data))
//   if (type === "GET" || type === "DELETE") {
//     url += "?" + util.getAsUriParameters(params)
//   } else {
//     data = params;
//   }
  // data.sign = SIGN;
  // data.time = TIMESTAMP;
  let res

  try {
    res = await wepy.request({
      url: url,
      method: type,
      data: data,
      header: {
        'Authorization': 'Bearer ' + token
      }
    });
  } catch (e) {
    console.log('request catch', e)
  }


  if (res) {
    return new Promise((resolve, reject) => {
      // execute some code here
      if (res.data.status) { // let's say this is a boolean value from line above
        if (res.data.data && res.data.data.current_page) {
          return resolve(res.data.data.data);
        } else return resolve(res.data.data);
      } else {
        return reject(res.data); // this can be anything, preferably an Error object to catch the stacktrace from this function
      }
    });
  } else {
      
  }
};


module.exports = {
  wxRequest
}
