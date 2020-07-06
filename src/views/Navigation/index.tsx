/*
 * @Author: LiuYh
 * @Description: 首页导航页
 * @Date: 2020-07-01 14:27:14
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-04 22:48:40
 */

import * as React from 'react';
import NormalPage from '@components/NormalPage';
import NavTab from '@components/NavTab';
// import Home from '@views/Home';
// import Movie from '@views/Movie';
// import User from '@views/User';
import Cartoon from '@views/Cartoon';


type IProps = {};

class Navigation extends React.Component<IProps, { curNavTab: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      curNavTab: 'cartoon'
    };
    this.chooseTab = this.chooseTab.bind(this);
  }

  /** 切换tab */
  public chooseTab(tabId: string) {
    this.setState({
      curNavTab: tabId
    });
  }

  render() {
    const { curNavTab } = this.state;
    // const Content = () => {
    //   switch (curNavTab) {
    //     case 'home':
    //       return <Home />;
    //     case 'movie':
    //       return <Movie />;
    //     case 'cartoon':
    //       return <Cartoon />;
    //     case 'user':
    //       return <User />;
    //     default:
    //       return <Home />;
    //   }
    // };

    return (
      <NormalPage
        customFooter={
          <NavTab curNavTab={curNavTab} pressCallBack={this.chooseTab} />
        }
        showFooter
        showHeader={false}
      >
        {/* <Content /> */}
        <Cartoon />
      </NormalPage>
    );
  }
}

export default Navigation;
