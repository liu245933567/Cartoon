/*
 * @Author: LiuYh
 * @Description: 全局状态管理参数
 * @Date: 2020-07-03 23:28:42
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-24 14:23:09
 */

import { IGlobalAction } from '../actions/global';
import { IUserAction } from '../actions/user';
import { IUserResInfo } from '@typings/user';
import {
  CHANGE_LOADING_STATUS,
  REQUEST_LOGIN_REGISTER,
  REQUEST_LOGIN_OUT
} from '../constants';

const initState = {
  /** 当前页面是否有post请求 */
  isLoading: false,
  /** 是否处于登陆状态 */
  isLogin: false,
  userInfo: null
};

export type IGlobalReduceState = {
  isLoading: boolean;
  isLogin: boolean;
  userInfo: IUserResInfo | null;
};

/** 全局 reducer */
const global = (
  state: IGlobalReduceState = initState,
  action: IGlobalAction | IUserAction
): IGlobalReduceState => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case REQUEST_LOGIN_REGISTER: {
      return {
        ...state,
        isLogin: true,
        userInfo: action.result
      };
    }
    case REQUEST_LOGIN_OUT: {
      return {
        ...state,
        isLogin: false,
        userInfo: null
      };
    }

    default:
      return state;
  }
};

export default global;
