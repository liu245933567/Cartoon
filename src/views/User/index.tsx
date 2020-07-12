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
import { Grid } from 'antd-mobile';
import UserInfo from '@components/UserInfo';
import NormalPage from '@components/NormalPage';
import NavTab from '@components/NavTab';
import { IGlobalReduceState } from '@redux/reducers/global';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';

type IProps = IGlobalReduceState & RouteComponentProps & {};
class User extends React.Component<IProps> {
  /** 九宫格数据 */
  private readonly gridData = [
    {
      icon: 'history',
      text: '历史记录'
    }
  ];
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
          <Grid
            data={this.gridData}
            renderItem={(item) => {
              return (
                <div className={`gird-item gird-item-${item?.icon}`}>
                  <div className="gird-text">{item?.text}</div>
                </div>
              );
            }}
            onClick={(item) => {
              this.props.history.push({
                pathname: '/history'
              });
            }}
            activeStyle={false}
            hasLine={false}
          />
        </div>
      </NormalPage>
    );
  }
}

export default connect((state: AppState) => state.global)(withRouter(User));
