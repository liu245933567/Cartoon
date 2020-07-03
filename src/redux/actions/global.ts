import { CHANGE_LOADING_STATUS } from '../constants';

export interface IChangeLoadingAction {
  type: CHANGE_LOADING_STATUS;
  payload: {
    isLoading: boolean;
  };
}

/** 总类型 */
export type IGlobalAction = IChangeLoadingAction;

/** 改变Loading状态 */
export const changeLoading = (payload: {isLoading: boolean}): IChangeLoadingAction => ({
  type: CHANGE_LOADING_STATUS,
  payload
});
