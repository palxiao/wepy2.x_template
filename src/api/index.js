import { wxRequest } from '../common/wxRequest';
import { API_URL } from '../app_config';

// 审核开关接口
const audit = (params) => wxRequest(params, API_URL + 'mp/audit');
// 登录打卡
const login = (params) => wxRequest(params, API_URL + 'api/user/login', 'POST');

const makingData = (params) =>
  wxRequest(params, API_URL + 'mp/yanye/makingData');

const hitokoto = () => wxRequest({}, 'https://v1.hitokoto.cn/');

module.exports = {
  audit,
  hitokoto,
  makingData,
  login
};
