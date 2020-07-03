import axios, {AxiosRequestConfig} from 'axios';
import { HOST, WITHCREDENTIALS } from '@config/index';
import {ResponseData} from '@typings/api';


axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = WITHCREDENTIALS;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 180000;


/**
 * request之前的处理
 */
axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err)
);

/**
 * response之后的处理
 */
axios.interceptors.response.use(
  response => response,
  err => Promise.resolve({
    data: {
      // err,
      isOk: false,
      code: err.response && err.response.status || 'ERROR',
      message: err.message || '请求出错了',
      result: null
    }
  })
);

/** Axios get请求 */
function get(url:string) {
  return (config?: AxiosRequestConfig) => axios.get(url, config);
}

// post请求
function post<ReqT, ResT>(url:string, data?: ReqT) {
  return axios.post<ResponseData<ResT>>(url, data);
}

export {
  axios,
  get,
  post
};