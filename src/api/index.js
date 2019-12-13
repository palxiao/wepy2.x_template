import { wxRequest } from '../utils/wxRequest';
import {API_URL} from '../config'
const prefix = API_URL

const test = (params) => wxRequest(params, prefix + 'sleep.php?time=1&t=css&c=');

module.exports = {
    test
}