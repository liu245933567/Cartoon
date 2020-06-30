/*
 * @Author: LiuYh
 * @Description: 公共页面模板组件
 * @Date: 2020-06-26 11:45:27
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-06-30 18:07:10
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'antd-mobile';

class NormalPage extends React.Component {
  constructor(props:any) {
    super(props);
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

NormalPage.propTypes = {
  /** 是否显示头部 */
  showHeader: PropTypes.bool,
  /** 自定义头部组件 */
  customHeader: PropTypes.elementType,
  /** 是否显示底部组件 */
  showFooter: PropTypes.bool,
  /** 自定义底部组件 */
  customFooter: PropTypes.object,
  /** 子元素 */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
};
NormalPage.defaultProps = {
  showHeader: true
};

export default NormalPage;
