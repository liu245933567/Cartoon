import axios from 'axios';
import { HOST, WITHCREDENTIALS } from 'config';


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
      err,
      isOk: false,
      code: (err.response && err.response.status) || 'ERROR',
      message: err.message || '请求出错了'
    }
  })
);

//get请求
function get(url) {
  return body => axios.get(url, body);
}

// post请求
function post(url, params) {
  return axios.post(url, params);
}

export {
  axios,
  get,
  post
};