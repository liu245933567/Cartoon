import {
  ICartoonHomeRes,
  CartoonDetail,
  SectionInfo,
  CartoonOtherRecommendInfo,
  ICartoonHistory
} from '@typings/cartoon';
import { ICartoonAction } from '../actions/cartoon';
import {
  REQUEST_CARTOON_HOMEINFO,
  REQUEST_CARTOON_DETAILINFO,
  REQUEST_CARTOON_SECTIONINFO,
  REQUEST_SEARCH_CARTOON
} from '../constants';
import { setCartoonHistory, getCartoonHistory } from '@store/cartoon';

const initState = {
  hotCartoonRecommends: [],
  latestRecommends: [],
  otherRecommendList: [],
  categorys: [],
  cartoonDetailInfo: null,
  sectionInfo: null,
  searchResultList: []
};

export type ICartoonReduceState = ICartoonHomeRes & {
  cartoonDetailInfo: CartoonDetail | null;
  sectionInfo: SectionInfo | null;
  searchResultList: CartoonOtherRecommendInfo[];
};

/** 动漫模块 reducer */
const cartoon = (
  state: ICartoonReduceState = initState,
  action: ICartoonAction
): ICartoonReduceState => {
  switch (action.type) {
    case REQUEST_CARTOON_HOMEINFO: {
      return {
        ...state,
        ...action.result
      };
    }

    case REQUEST_CARTOON_DETAILINFO: {
      const { detailHref, sectionList } = action.result;
      const cartoonHistory = getCartoonHistory(detailHref) as
        | ICartoonHistory
        | undefined;

      if (cartoonHistory) {
        const { watchedSections } = cartoonHistory;

        sectionList.forEach((section, sectionIndex) => {
          for (let i = 0; i < watchedSections.length; i++) {
            if (section.sectionId === watchedSections[i].sectionId) {
              action.result.sectionList[sectionIndex].isWatched = true;
            }
          }
        });
      }
      return {
        ...state,
        cartoonDetailInfo: action.result
      };
    }
    case REQUEST_CARTOON_SECTIONINFO: {
      setCartoonHistory(
        state.cartoonDetailInfo as CartoonDetail,
        action.result
      );
      return {
        ...state,
        sectionInfo: action.result
      };
    }

    case REQUEST_SEARCH_CARTOON: {
      return {
        ...state,
        searchResultList: action.result
      };
    }

    default:
      return state;
  }
};

export default cartoon;
