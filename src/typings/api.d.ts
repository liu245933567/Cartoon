// import { ICartoonHomeRes } from './cartoon';

// 请求接口数据
export interface ResponseData<T = any> {
  /** 是否成功 */
  isOk: boolean;
  /** 状态码 */
  code: string | number;
  /** 数据 */
  result: T
  /** 消息 */
  message: string
}
