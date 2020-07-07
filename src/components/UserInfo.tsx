/*
 * @Author: LiuYh
 * @Description: 用户信息展示
 * @Date: 2020-07-03 15:21:50
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 16:39:18
 */

import React from 'react';
import userCoverImage from '@images/user-default-cover-image.png';
import { IUserInfo } from '@typings/user';

type IProps = {
  userInfo: IUserInfo | null;
  /** 去登录 */
  toLogin: () => void;
  /** 编辑头像 */
  toEditHeaderPortrait: () => void;
};

const UserInfo: React.FC<IProps> = ({
  userInfo,
  toLogin,
  toEditHeaderPortrait
}: IProps) => {
  return (
    <div className="UserInfo-Component-Wrapper">
      <div className="brief-info-wrapper">
        <div className="info-area">
          <div className="user-name" onClick={toLogin}>
            {userInfo?.nickname || '登录/注册'}
          </div>
          <div className="user-personalized-signature">
            {userInfo?.nickname || '是兄弟，就来砍我！'}
          </div>
          <div className="use-info-btn">
            <div className="user-btn-item user-btn-item-signIn">签到有奖</div>
            <div className="user-btn-item user-btn-item-message">消息</div>
          </div>
        </div>
        <div className="user-picture">
          <img
            onClick={toEditHeaderPortrait}
            src={userInfo?.headPortrait || userCoverImage}
          ></img>
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
