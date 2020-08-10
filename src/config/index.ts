import { getRootHost } from '@utils/url';

/** 接口请求 */
let HOST = getRootHost();
/** 七牛云地址 */
let QINIUHOST = 'http://qiniu.yanyuge.xyz/';
/** 静态资源请求 */
let STATICHOST = 'http://dev.yanyuge.xyz:3000';
let WITHCREDENTIALS = true;

export { HOST, STATICHOST, WITHCREDENTIALS, QINIUHOST };
