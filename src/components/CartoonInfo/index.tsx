/*
 * @Author: LiuYh
 * @Description: 章节详情页，章节列表组件
 * @Date: 2020-07-02 21:15:39
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-02 21:43:53
 */

import React from 'react';
import { CartoonDetail } from '@typings/cartoon';

type IPorps = {
  cartoonInfo: CartoonDetail;
};

const CartoonInfo: React.FC<IPorps> = ({ cartoonInfo }: IPorps) => {
  if (!cartoonInfo) {
    return null;
  }
  return (
    <div className="CartoonInfo-Component-Wrapper">
      <div className="Cartoon-Image-Cover">
        <img className="Cartoon-Image" src={cartoonInfo.coverPictureSrc} />
      </div>
      <div className="cartoon-info">
        <h4 className="cartoon-name">
          <span>《{cartoonInfo.cartoonName}》</span>
          <span className="cartoon-status">{cartoonInfo.state}</span>
        </h4>
        <div className="cartoon-autor">作者: {cartoonInfo.cartoonAuthor}</div>
        <div className="cartoon-updata">
          更新时间： {cartoonInfo.upDataTime}
        </div>
        <div className="cartoon-description">
          简介：{cartoonInfo.introduction}
        </div>
      </div>
    </div>
  );
};

export default CartoonInfo;
