import {post} from './axios';
import {
    loginURL
} from './url';

// 登录
export function login(params) {
  return post(loginURL, params);
}
