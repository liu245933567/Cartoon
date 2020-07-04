import { ICartoonHomeRes, CartoonDetail, SectionInfo } from '@typings/cartoon';
import { ICartoonAction } from '../actions/cartoon';
import {
  REQUEST_CARTOON_HOMEINFO,
  REQUEST_CARTOON_DETAILINFO,
  REQUEST_CARTOON_SECTIONINFO
} from '../constants';

const initState = {
  hotCartoonRecommends: [],
  latestRecommends: [],
  otherRecommendList: [],
  cartoonDetailInfo: null,
  sectionInfo: null
};

export type ICartoonReduceState = ICartoonHomeRes & {
  cartoonDetailInfo: CartoonDetail | null;
  sectionInfo: SectionInfo | null;
};

/** 动漫模块 reducer */
const cartoon = (
  state: ICartoonReduceState = initState,
  action: ICartoonAction
): ICartoonReduceState => {
  switch (action.type) {
    case REQUEST_CARTOON_HOMEINFO:
      return {
        ...state,
        ...action.result
      };
    case REQUEST_CARTOON_DETAILINFO:
      return {
        ...state,
        cartoonDetailInfo: action.result
      };
    case REQUEST_CARTOON_SECTIONINFO:
      return {
        ...state,
        sectionInfo: action.result
      };
    default:
      return state;
  }
};

export default cartoon;
