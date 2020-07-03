/*
 * @Author: LiuYh
 * @Description: 用户首页
 * @Date: 2020-07-03 16:03:36
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 16:33:18
 */

import React from 'react';
import UserInfo from '@components/UserInfo';
class User extends React.Component {
  render() {
    return (
      <div className="User-Page-Wrapper">
        <UserInfo />
      </div>
    );
  }
}

export default User;
