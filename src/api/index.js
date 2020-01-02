import { wxRequest } from '../utils/wxRequest';
import { API_URL } from '../config'

const audit = (params) => wxRequest(params, API_URL + 'miniProgram/audit');

const hitokoto = () => wxRequest({}, 'https://v1.hitokoto.cn/')

module.exports = {
    audit,
    hitokoto
}