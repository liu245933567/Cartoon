import { post } from './axios';
import {
  cartoonHomeInfoURL,
  cartoonDetailURL,
  sectionDetailURL,
  searchCartoonlURL
} from './url';
import {
  ICartoonHomeRes,
  CartoonDetail,
  SectionInfo,
  ICartoonDeatilInfoReq,
  ISectionDeatilInfoReq,
  ISearchCartonReq,
  // ISearchPageInfo,
  CartoonOtherRecommendInfo
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

/** 查询动漫 */
export function searchCartoon(params: ISearchCartonReq) {
  return post<ISearchCartonReq, CartoonOtherRecommendInfo[]>(searchCartoonlURL, params);
}
