import { post } from './axios';
import {
  loginRegisterURL,
  loginStatusURL,
  uploaderURL,
  logOutURL,
  getHeadPortraitURL,
  modifyUserInfoURL
} from './url';
import { IUserResInfo, ILoginParam, ModifyUserInfoParam } from '@typings/user';
import { IUploadResult } from '@typings/upload';

/** 注册登录 */
export function loginRegister(params: ILoginParam) {
  return post<ILoginParam, IUserResInfo | null>(loginRegisterURL, params);
}

/** 退出登录 */
export function logOut() {
  return post(logOutURL);
}

/** 获取头像列表 */
export function getHeadPortrait() {
  return post<undefined, string[]>(getHeadPortraitURL);
}

/** 修改用户资料 */
export function modifyUserInfo(params: ModifyUserInfoParam) {
  return post<ModifyUserInfoParam, any>(modifyUserInfoURL, params);
}

/** 校验登录 */
export function loginStatus() {
  return post<undefined, IUserResInfo | null>(loginStatusURL);
}

/** 上传接口 */
export function uploader(
  param: FormData,
  onUploadProgress?: (progressEvent: any) => void
) {
  return post<FormData, IUploadResult | null>(uploaderURL, param, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress
  });
}
