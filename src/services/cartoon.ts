import {post} from './axios';
import {
  cartoonHomeInfoURL
} from './url';
import { Api } from '@/typings/response';

/** 获取动漫首页信息 */
export async function cartoonHomeInfo(): Promise<Api.ICartoonHomeInfoAPIRes> {
  const {data} = await post(cartoonHomeInfoURL);

  return data;
}
