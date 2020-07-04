/*
 * @Author: LiuYh
 * @Description: 公共页面模板组件
 * @Date: 2020-06-26 11:45:27
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-04 11:21:46
 */

import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { INormalPageProps } from '@typings/normalPage';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loading from '@components/Loading';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { IGlobalReduceState } from '@redux/reducers/global';
import { AppState } from '@redux/reducers';

type IProps = RouteComponentProps & INormalPageProps & IGlobalReduceState;
class NormalPage extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }
  static defaultProps = {
    showHeader: true,
    headerText: '烟雨阁'
  };

  render() {
    const {
      showHeader,
      headerText,
      showFooter,
      customFooter,
      children
    } = this.props;

    return (
      <div className="NormalPage_Component_Wrapper">
        {/* 头部 */}
        {showHeader &&
          <header className="NormalPage_Header_wrapper">
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              onLeftClick={() => {
                this.props.history.go(-1);
              }}
              // rightContent={[
              //   <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              //   <Icon key="1" type="ellipsis" />
              // ]}
            >
              {headerText}
            </NavBar>
          </header>
        }
        <Loading isLoading={this.props.isLoading} />
        <main className="NormalPage_Content_wrapper">{children}</main>
        {showFooter && customFooter &&
          <footer className="NormalPage_Footer_wrapper">{customFooter}</footer>
        }
      </div>
    );
  }
}

export default connect((state: AppState) => state.global)(
  withRouter(NormalPage)
);
