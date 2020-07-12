import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HOST, WITHCREDENTIALS } from '@config/index';
import { ResponseData } from '@typings/api';
import store from '@redux/store';
import { createHashHistory } from 'history'; // hash路由
import { changeLoading } from '@redux/actions/global';
import { Modal } from 'antd-mobile';
import { needLogin } from './util';

const history = createHashHistory();

axios.defaults.baseURL = HOST;
axios.defaults.withCredentials = WITHCREDENTIALS;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.timeout = 180000;

/** request之前的处理 */
axios.interceptors.request.use(
  (config) => {
    store.dispatch(changeLoading({ isLoading: true }));
    return config;
  },
  (err) => {
    store.dispatch(changeLoading({ isLoading: false }));
    return Promise.reject(err);
  }
);

/** response之后的处理 AxiosRequestConfig<ResponseData<ResT>> */
axios.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    store.dispatch(changeLoading({ isLoading: false }));
    const { data } = response;

    if (
      !data.isOk &&
      data.code === 'REQUIER_LOGIN' &&
      needLogin(response.config.url || '')
    ) {
      Modal.alert('未登录', '大哥，给否给个面子去登录一下？', [
        {
          text: '不给',
          onPress: () => console.log('cancel'),
          style: 'default'
        },
        { text: '没毛病！', onPress: () => {
          history.push({pathname: '/login'});
        } }
      ]);
    }
    return response;
  },
  (err) => {
    store.dispatch(changeLoading({ isLoading: false }));
    return Promise.resolve({
      data: {
        // err,
        isOk: false,
        code: err.response && err.response.status || 'ERROR',
        message: err.message || '请求出错了',
        result: null
      }
    });
  }
);

/** Axios get请求 */
function get(url: string) {
  return (config?: AxiosRequestConfig) => axios.get(url, config);
}

/** Axios post请求 */
function post<ReqT, ResT>(
  url: string,
  data?: ReqT,
  config?: AxiosRequestConfig
) {
  return axios.post<ResponseData<ResT>>(url, data, config);
}

export { axios, get, post };
