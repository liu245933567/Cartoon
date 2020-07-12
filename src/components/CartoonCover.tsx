/*
 * @Author: LiuYh
 * @Description: 动漫单个组件，带预览图
 * @Date: 2020-06-26 14:43:33
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-04 23:20:58
 */

import React from 'react';
import { CartoonOtherRecommendInfo, ICartoonHistory } from '@typings/cartoon';

interface IProps {
  /** 动漫信息 */
  cartoonInfo: CartoonOtherRecommendInfo | ICartoonHistory;
  /** 点击回调 */
  clickHandle: (cartoonInfo: CartoonOtherRecommendInfo) => void;
}

const CartoonCover: React.FC<IProps> = ({
  cartoonInfo,
  clickHandle
}: IProps) => {
  return (
    <div
      className="CartoonCover-Component-Wrapper"
      onClick={() => {
        clickHandle(cartoonInfo);
      }}
    >
      <div className="Cover-wrapper">
        <img className="Cover-Image" src={cartoonInfo.coverPictureSrc} />
        <div className="Cover-last-section">{cartoonInfo.latestChapter}</div>
      </div>
      <div className="cartoon-name">{cartoonInfo.cartoonName}</div>
    </div>
  );
};

export default CartoonCover;
