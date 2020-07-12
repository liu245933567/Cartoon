/*
 * @Author: LiuYh
 * @Description: 底部导航栏
 * @Date: 2020-06-26 14:43:33
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-09 11:51:34
 */

import React from 'react';
// import { INavTabProps } from '@typings/navtab';
import { TabBar } from 'antd-mobile';
import { withRouter, RouteComponentProps } from 'react-router-dom';

type IProps = RouteComponentProps;

class NavTab extends React.Component<IProps> {
  TabBarData = [
    // { title: '首页', key: 'home' },
    // { title: '视频', key: 'movie' },
    { title: '动漫', key: 'cartoon', path: '/' },
    { title: '我', key: 'user', path: '/user' }
  ];
  render() {
    const curPath = this.props.location.pathname;

    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        tabBarPosition="bottom"
        hidden={false}
      >
        {this.TabBarData.map((tabItem) => {
          const { title, key, path } = tabItem;

          return (
            <TabBar.Item
              title={title}
              key={key}
              icon={<div className={`Nav_Tab_Item Nav_Tab_Item_${key}`} />}
              selectedIcon={
                <div className={`Nav_Tab_Item Nav_Tab_Item_${key}_active`} />
              }
              selected={curPath === path}
              // badge={1}
              onPress={() => {
                if (curPath !== path) {
                  this.props.history.replace({
                    pathname: path
                  });
                  console.log(1111);
                }
              }}
              data-seed="logId"
            />
          );
        })}
      </TabBar>
    );
  }
}

export default withRouter(NavTab);
