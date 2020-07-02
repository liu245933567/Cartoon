import {post} from './axios';
import {
  cartoonHomeInfoURL
} from './url';
import {ICartoonHomeRes} from '@typings/cartoon';

/** 获取动漫首页信息 */
export function cartoonHomeInfo() {
  return post<undefined, ICartoonHomeRes>(cartoonHomeInfoURL);
}
