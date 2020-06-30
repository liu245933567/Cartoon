import {post} from './axios';
import {
  cartoonListURL,
  cartoonDetailURL,
  sectionDetailURL
} from './url';

// 动漫列表
export function cartoonList(params) {
  return post(cartoonListURL, params);
}

// 章节列表
export function cartoonDetail(params) {
  return post(cartoonDetailURL, params);
}

// 章节详情
export function sectionDetail(params) {
  return post(sectionDetailURL, params);
}
