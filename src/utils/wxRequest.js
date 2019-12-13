import util from './index';
const wxRequest = (params = {}, url, type = 'GET') => {

    let token = wx.getStorageSync('token') || "";
    let data = {}
    // console.log(util.getAsUriParameters(data))
    if (type === "GET" || type === "DELETE") {
        url += "?" + util.getAsUriParameters(params)
    } else {
        data = params;
    }
    // data.sign = SIGN;
    // data.time = TIMESTAMP;

    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: type,
            data: data,
            header: {
                // 'Authorization': 'Bearer ' + token
            },
            success(res) {
                if (res) {
                    // execute some code here
                    if (res.data.status) { // let's say this is a boolean value from line above
                        if (res.data.data && res.data.data.current_page) {
                            return resolve(res.data.data.data);
                        } else return resolve(res.data.data);
                    } else {
                        return resolve(res.data); // this can be anything, preferably an Error object to catch the stacktrace from this function
                    }
                } else {

                }
            }
        });
    }).catch((e) => { });
};


module.exports = {
    wxRequest
}
