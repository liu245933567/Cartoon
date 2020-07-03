/*
 * @Author: LiuYh
 * @Description: 全局状态管理参数
 * @Date: 2020-07-03 23:28:42
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 23:29:02
 */

import { IGlobalAction } from '../actions/global';
import { CHANGE_LOADING_STATUS } from '../constants';

const initState = {
  isLoading: false
};

export type IGlobalReduceState = typeof initState;

const global = (
  state: IGlobalReduceState = initState,
  action: IGlobalAction
): IGlobalReduceState => {
  switch (action.type) {
    case CHANGE_LOADING_STATUS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default global;
