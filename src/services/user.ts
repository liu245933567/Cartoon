import { post } from './axios';
import { loginRegisterURL } from './url';
import { IUserResInfo, ILoginParam } from '@typings/user';

/** 注册登录 */
export function loginRegister(params: ILoginParam) {
  return post<ILoginParam, IUserResInfo>(loginRegisterURL, params);
}
