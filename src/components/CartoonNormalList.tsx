import React from 'react';
import CartoonCover from '@components/CartoonCover';
import {
  CartoonRecommendInfo,
  CartoonOtherRecommendInfo
} from '@typings/cartoon';

interface Iprops {
  cartoonList: CartoonRecommendInfo[];
  clickHandle: (cartoonInfo: CartoonOtherRecommendInfo) => void;
}

const CartoonNormalList: React.FC<Iprops> = ({
  cartoonList,
  clickHandle
}: Iprops) => {
  return (
    <div className="CartoonNormalList-Component-Wrapper">
      <h2 className="List-type">热门动漫</h2>
      <div className="List-wrapper">
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
  cartoonList: []
};

export default CartoonNormalList;
