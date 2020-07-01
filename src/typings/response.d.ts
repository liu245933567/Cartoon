import { ICartoonHomeRes } from './cartoon';

declare namespace Api {
  interface IBaseRes {
    isOk: boolean;
    code: string | number;
    message: string;
  }
  export interface ICartoonHomeInfoAPIRes extends IBaseRes {
    homeInfo: ICartoonHomeRes;
  }
}
