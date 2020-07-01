import {post} from './axios';
import {
  cartoonHomeInfoURL
} from './url';

/** 获取动漫首页信息 */
export function cartoonHomeInfo() {
  return post(cartoonHomeInfoURL);
}
