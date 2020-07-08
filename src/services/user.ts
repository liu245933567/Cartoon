import { post } from './axios';
import { loginRegisterURL, loginStatusURL } from './url';
import { IUserResInfo, ILoginParam } from '@typings/user';

/** 注册登录 */
export function loginRegister(params: ILoginParam) {
  return post<ILoginParam, IUserResInfo | null>(loginRegisterURL, params);
}

/** 校验登录 */
export function loginStatus() {
  return post<undefined, IUserResInfo | null>(loginStatusURL);
}
