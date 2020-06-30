import { post } from './axios';
import {
  videoListURL,
  videoCategoriesURL
} from './url';

/** 
 * 获取视频列表
 * @param {Object} params 请求参数
 * @param {String} params.category 请求的种类key
 */
export function videoList(params) {
  return post(videoListURL, params);
}

/** 获取视频种类列表 */
export function videoCategories(params) {
  return post(videoCategoriesURL, params);
}