/*
 * @Author: LiuYh
 * @Description: 用户首页
 * @Date: 2020-07-03 16:03:36
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 16:33:18
 */

import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '@redux/reducers';
import UserInfo from '@components/UserInfo';
import { IGlobalReduceState } from '@redux/reducers/global';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

type IProps = IGlobalReduceState & RouteComponentProps & {};
class User extends React.Component<IProps> {
  /** 去登录 */
  @autobind
  public login() {
    console.log(2222);
    this.props.history.push({
      pathname: '/login'
    });
  }
  public editHeaderPortrait() {
    console.log(33333);
  }
  render() {
    const { isLogin } = this.props;

    console.log(isLogin);
    return (
      <div className="User-Page-Wrapper">
        <UserInfo
          userInfo={null}
          toLogin={this.login}
          toEditHeaderPortrait={this.editHeaderPortrait}
        />
      </div>
    );
  }
}

export default connect((state: AppState) => state.global)(withRouter(User));
