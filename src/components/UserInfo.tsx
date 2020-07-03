/*
 * @Author: LiuYh
 * @Description: 用户信息展示
 * @Date: 2020-07-03 15:21:50
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 16:39:18
 */

import React from 'react';
import userCoverImage from '@images/user-default-cover-image.png';

const UserInfo = () => {
  return (
    <div className="UserInfo-Component-Wrapper">
      <div className="brief-info-wrapper">
        <div className="info-area">
          <div className="user-name">大象无形</div>
          <div className="user-personalized-signature">
            见自己，见天地，见众生
          </div>
          <div className="use-info-btn">
            <div className="user-btn-item user-btn-item-signIn">签到有奖</div>
            <div className="user-btn-item user-btn-item-message">消息</div>
          </div>
        </div>
        <div className="user-picture">
          <img src={userCoverImage}></img>
        </div>
      </div>

      <div className="user-tab-info-wrapper">
        <div className="user-tab-item">
          <div className="user-tab-text">VIP会员</div>
          <div className="user-tab-name">开通享会员</div>
        </div>
        <div className="user-tab-item">
          <div className="user-tab-text">VIP会员</div>
          <div className="user-tab-name">开通享会员</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
