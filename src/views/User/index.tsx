/*
 * @Author: LiuYh
 * @Description: 用户首页
 * @Date: 2020-07-03 16:03:36
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-09 12:17:59
 */

import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '@redux/reducers';
import UserInfo from '@components/UserInfo';
import NormalPage from '@components/NormalPage';
import NavTab from '@components/NavTab';
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
  /** 去头像编辑页 */
  @autobind
  public editHeaderPortrait() {
    console.log(33333);
    this.props.history.push({
      pathname: '/imageUploader'
    });
  }
  render() {
    const { isLogin, userInfo } = this.props;

    console.log(isLogin);
    return (
      <NormalPage showHeader={false} customFooter={<NavTab />} showFooter>
        <div className="User-Page-Wrapper">
          <UserInfo
            userInfo={userInfo}
            toLogin={this.login}
            toEditHeaderPortrait={this.editHeaderPortrait}
          />
        </div>
      </NormalPage>
    );
  }
}

export default connect((state: AppState) => state.global)(withRouter(User));
