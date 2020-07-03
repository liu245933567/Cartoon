import { Dispatch } from 'redux';
import { REQUEST_CARTOON_HOMEINFO } from '../constants';
import { ICartoonHomeRes } from '@typings/cartoon';
import { cartoonHomeInfo } from '@services/cartoon';

export interface IRequestCartoonHomeInfoAction {
  type: REQUEST_CARTOON_HOMEINFO;
  result: ICartoonHomeRes;
}

/** 总类型 */
export type ICartoonAction = IRequestCartoonHomeInfoAction;

/** 请求获取漫画首页信息接口 */
export const requestCartoonHomeInfo = () => async (
  dispatch: Dispatch<IRequestCartoonHomeInfoAction>
) => {
  const { data } = await cartoonHomeInfo();

  if (data.isOk) {
    dispatch({
      type: REQUEST_CARTOON_HOMEINFO,
      result: data.result
    });
  }
};

export default {
  requestCartoonHomeInfo
};
