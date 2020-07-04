import { Dispatch } from 'redux';
import {
  REQUEST_CARTOON_HOMEINFO,
  REQUEST_CARTOON_DETAILINFO,
  REQUEST_CARTOON_SECTIONINFO
} from '../constants';
import {
  ICartoonHomeRes,
  ICartoonDeatilInfoReq,
  CartoonDetail,
  ISectionDeatilInfoReq,
  SectionInfo
} from '@typings/cartoon';
import {
  cartoonHomeInfo,
  cartoonDeatilInfo,
  sectionDeatilInfo
} from '@services/cartoon';

export interface IRequestCartoonHomeInfoAction {
  type: REQUEST_CARTOON_HOMEINFO;
  result: ICartoonHomeRes;
}

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

export interface IRequestCartoonDeatilInfoAction {
  type: REQUEST_CARTOON_DETAILINFO;
  result: CartoonDetail;
}

/** 请求获取漫画详情信息接口 */
export const requestCartoonDeatilInfo = (
  params: ICartoonDeatilInfoReq,
  callback?: () => void
) => async (dispatch: Dispatch<IRequestCartoonDeatilInfoAction>) => {
  const { data } = await cartoonDeatilInfo(params);

  if (data.isOk) {
    dispatch({
      type: REQUEST_CARTOON_DETAILINFO,
      result: data.result
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
};

export interface IRequestCartoonSectionDeatilAction {
  type: REQUEST_CARTOON_SECTIONINFO;
  result: SectionInfo;
}
/** 请求获取漫画章节详情信息接口 */
export const requestCartoonSectionDeatilInfo = (
  params: ISectionDeatilInfoReq,
  callback?: () => void
) => async (dispatch: Dispatch<IRequestCartoonSectionDeatilAction>) => {
  const { data } = await sectionDeatilInfo(params);

  if (data.isOk) {
    dispatch({
      type: REQUEST_CARTOON_SECTIONINFO,
      result: data.result
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
};

/** 总类型 */
export type ICartoonAction =
  | IRequestCartoonHomeInfoAction
  | IRequestCartoonDeatilInfoAction
  | IRequestCartoonSectionDeatilAction;
