/*
 * @Author: LiuYh
 * @Description: 漫画首页
 * @Date: 2020-07-01 16:34:39
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-01 18:16:46
 */

import React from 'react';
import { cartoonHomeInfo } from '@services/cartoon';
import {ICartoonHomeRes} from '@typings/cartoon';
class Cartoon extends React.Component<{}, {homeInfo: ICartoonHomeRes}> {
  constructor(props:any) {
    super(props);
    this.state = {
      homeInfo: {
        hotCartoonRecommends: [],
        latestRecommends: [],
        otherRecommendList: []
      }
    };
  }
  public componentDidMount() {
    this.getInfo();
  }

  /** 获取首页信息接口 */
  private async getInfo() {
    const {data} = await cartoonHomeInfo();

    console.log(data);
  }
  render() {
    return <div className="Cartoon_Page_Wrapper">漫画</div>;
  }
}

export default Cartoon;
