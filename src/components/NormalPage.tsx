/*
 * @Author: LiuYh
 * @Description: 公共页面模板组件
 * @Date: 2020-06-26 11:45:27
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-01 11:13:07
 */

import React from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { INormalPageProps } from '@typings/normalPage';

class NormalPage extends React.Component<INormalPageProps> {
  constructor(props: any) {
    super(props);
  }
  static defaultProps = {
    showHeader: true
  }

  render() {
    const { showHeader, showFooter, customFooter, children } = this.props;

    return (
      <div className="NormalPage_Component_Wrapper">
        {/* 头部 */}
        {showHeader &&
          <header className="NormalPage_Header_wrapper">
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                <Icon key="1" type="ellipsis" />
              ]}
            >
              烟雨阁
            </NavBar>
          </header>
        }
        <main className="NormalPage_Content_wrapper">{children}</main>
        {showFooter && customFooter &&
          <footer className="NormalPage_Footer_wrapper">{customFooter}</footer>
        }
      </div>
    );
  }
}

export default NormalPage;
