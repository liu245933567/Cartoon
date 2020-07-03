import { ICartoonHomeRes } from '@typings/cartoon';
import { ICartoonAction } from '../actions/cartoon';
import { REQUEST_CARTOON_HOMEINFO } from '../constants';

const initState = {
  hotCartoonRecommends: [],
  latestRecommends: [],
  otherRecommendList: []
};

export type ICartoonReduceState = ICartoonHomeRes;

const cartoon = (state: ICartoonReduceState = initState, action: ICartoonAction): ICartoonReduceState => {
  switch (action.type) {
    case REQUEST_CARTOON_HOMEINFO:
      return {
        ...state,
        ...action.result
      };
    default:
      return state;
  }
};

export default cartoon;
