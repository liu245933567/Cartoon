import { post } from './axios';
import { loginRegisterURL, loginStatusURL, uploaderURL } from './url';
import { IUserResInfo, ILoginParam } from '@typings/user';
import { IUploadResult } from '@typings/upload';

/** 注册登录 */
export function loginRegister(params: ILoginParam) {
  return post<ILoginParam, IUserResInfo | null>(loginRegisterURL, params);
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
