import React from 'react';
import CartoonCover from '@components/CartoonCover';
import {
  CartoonRecommendInfo,
  CartoonOtherRecommendInfo,
  ICartoonHistory
} from '@typings/cartoon';

interface Iprops {
  /** 动漫列表 */
  cartoonList:
    | CartoonRecommendInfo[]
    | CartoonOtherRecommendInfo[]
    | ICartoonHistory[];
  /** 标题 */
  title?: string;
  /** 动漫点击回调 */
  clickHandle: (
    cartoonInfo: CartoonOtherRecommendInfo | CartoonRecommendInfo | ICartoonHistory
  ) => void;
}

const CartoonNormalList: React.FC<Iprops> = ({
  cartoonList,
  title,
  clickHandle
}: Iprops) => {
  return (
    <div className="CartoonNormalList-Component-Wrapper">
      {title && <h2 className="List-type">{title}</h2>}
      <div className="List-wrapper">
        {/* @ts-ignore */}
        {cartoonList.map((cartoonInfo) => {
          return (
            <CartoonCover
              key={cartoonInfo.detailHref}
              cartoonInfo={cartoonInfo}
              clickHandle={clickHandle}
            />
          );
        })}
      </div>
    </div>
  );
};

CartoonNormalList.defaultProps = {
  cartoonList: [],
  clickHandle: () => ({})
};

export default CartoonNormalList;
