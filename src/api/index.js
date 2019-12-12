import { wxRequest } from '../utils/wxRequest';
const prefix = 'https://www.madcoder.cn/tests/sleep.php'

const test = (params) => wxRequest(params, prefix + 'login');

module.exports = {
    test
}