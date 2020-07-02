import { post } from './axios';
import { cartoonHomeInfoURL, cartoonDetailURL, sectionDetailURL } from './url';
import {
  ICartoonHomeRes,
  CartoonDetail,
  SectionInfo,
  ICartoonDeatilInfoReq,
  ISectionDeatilInfoReq
} from '@typings/cartoon';

/** 获取动漫首页信息 */
export function cartoonHomeInfo() {
  return post<undefined, ICartoonHomeRes>(cartoonHomeInfoURL);
}

/** 获取动漫详情信息 */
export function cartoonDeatilInfo(params: ICartoonDeatilInfoReq) {
  return post<ICartoonDeatilInfoReq, CartoonDetail>(cartoonDetailURL, params);
}

/** 获取章节详情信息 */
export function sectionDeatilInfo(params: ISectionDeatilInfoReq) {
  return post<ISectionDeatilInfoReq, SectionInfo>(sectionDetailURL, params);
}
