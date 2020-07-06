/*
 * @Author: LiuYh
 * @Description: 底部导航栏
 * @Date: 2020-06-26 14:43:33
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-03 15:41:29
 */

import React from 'react';
import { INavTabProps } from '@typings/navtab';
import { TabBar } from 'antd-mobile';

const TabBarData = [
  // { title: '首页', key: 'home' },
  // { title: '视频', key: 'movie' },
  { title: '动漫', key: 'cartoon' },
  { title: '我', key: 'user' }
];

const NavTab: React.FC<INavTabProps> = ({ curNavTab, pressCallBack }: INavTabProps) => {
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#33A3F4"
      barTintColor="white"
      tabBarPosition="bottom"
      hidden={false}
    >
      {TabBarData.map((tabItem) => {
        const { title, key } = tabItem;

        return (
          <TabBar.Item
            title={title}
            key={key}
            icon={<div className={`Nav_Tab_Item Nav_Tab_Item_${key}`} />}
            selectedIcon={
              <div className={`Nav_Tab_Item Nav_Tab_Item_${key}_active`} />
            }
            selected={key === curNavTab}
            // badge={1}
            onPress={() => {
              if (curNavTab !== key) {
                pressCallBack(key);
              }
            }}
            data-seed="logId"
          />
        );
      })}
    </TabBar>
  );
};

NavTab.defaultProps = {
  curNavTab: 'home',
  pressCallBack: () => ({})
};

export default NavTab;
