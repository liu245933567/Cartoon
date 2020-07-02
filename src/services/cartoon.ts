import { post } from './axios';
import { cartoonHomeInfoURL, cartoonDetailURL } from './url';
import {
  ICartoonHomeRes,
  CartoonDetail,
  ICartoonDeatilInfoReq
} from '@typings/cartoon';

/** 获取动漫首页信息 */
export function cartoonHomeInfo() {
  return post<undefined, ICartoonHomeRes>(cartoonHomeInfoURL);
}

/** 获取动漫详情信息 */
export function cartoonDeatilInfo(params: ICartoonDeatilInfoReq) {
  return post<ICartoonDeatilInfoReq, CartoonDetail>(cartoonDetailURL, params);
}
