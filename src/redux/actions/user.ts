import { Dispatch } from 'redux';
import { REQUEST_LOGIN_REGISTER } from '../constants';
import { IUserResInfo, ILoginParam } from '@typings/user';
import { loginRegister, loginStatus } from '@services/user';

export interface IRequestLoginRegisterAction {
  type: REQUEST_LOGIN_REGISTER;
  result: IUserResInfo | null;
}

/** 请求登陆注册接口 */
export const requestLoginRegister = (
  params: ILoginParam,
  callback?: () => void
) => async (dispatch: Dispatch<IRequestLoginRegisterAction>) => {
  const { data } = await loginRegister(params);

  if (data.isOk) {
    dispatch({
      type: REQUEST_LOGIN_REGISTER,
      result: data.result
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
};

/** 请求登陆注册接口 */
export const requestLoginStatus = (
  callback?: () => void
) => async (dispatch: Dispatch<IRequestLoginRegisterAction>) => {
  const { data } = await loginStatus();

  if (data.isOk) {
    dispatch({
      type: REQUEST_LOGIN_REGISTER,
      result: data.result
    });
    if (typeof callback === 'function') {
      callback();
    }
  }
};

/** 总类型 */
export type IUserAction = IRequestLoginRegisterAction;
