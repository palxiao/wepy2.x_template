import { wxRequest } from '../common/wxRequest';
import { API_URL } from '../app_config';

const audit = (params) => wxRequest(params, API_URL + 'mp/audit');

const makingData = (params) =>
  wxRequest(params, API_URL + 'mp/yanye/makingData');

const hitokoto = () => wxRequest({}, 'https://v1.hitokoto.cn/');

module.exports = {
  audit,
  hitokoto,
  makingData,
};
