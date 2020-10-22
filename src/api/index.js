import { wxRequest } from '../common/wxRequest';
import { API_URL } from '../app_config';

/**
 * 图签
 */
const audit = (params) => wxRequest(params, API_URL + 'mp/audit'); // 审核开关接口
const makingData = (params) => wxRequest(params, API_URL + 'mp/yanye/makingData'); // 图签数据接口
const hitokoto = () => wxRequest({}, 'https://v1.hitokoto.cn/'); // 一言

/**
 * 青蛙打卡🐸
 */
const login = (params) => wxRequest(params, API_URL + 'api/user/login', 'POST'); // 登录
const getEventList = (params) => wxRequest(params, API_URL + 'api/event/list'); // 获取打卡事件(任务标签列表)
const addRecord = (params) => wxRequest(params, API_URL + 'api/record/add', 'POST'); // 新增打卡记录
const getRecord = (p) => wxRequest(p, API_URL + 'api/record/one'); // 获取最新一条打卡记录
const deleteRecord = (p) => wxRequest(p, API_URL + 'api/record/delete', 'POST'); // 删除记录

module.exports = {
  audit,
  hitokoto,
  makingData,
  login,
  getEventList,
  addRecord,
  getRecord,
  deleteRecord
};
