import {getRootHost} from '../utils';

/** 接口请求 */
let HOST = getRootHost();
/** 静态资源请求 */
let STATICHOST = 'http://192.168.31.71:3000'
let WITHCREDENTIALS = true;

export {
  HOST,
  STATICHOST,
  WITHCREDENTIALS
};