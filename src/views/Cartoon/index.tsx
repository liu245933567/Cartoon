/*
 * @Author: LiuYh
 * @Description: 漫画首页
 * @Date: 2020-07-01 16:34:39
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-01 18:16:46
 */

import React from 'react';
import { cartoonHomeInfo } from '@services/cartoon';
import { ICartoonHomeRes, CartoonOtherRecommendInfo } from '@typings/cartoon';
import CartoonNormalList from '@components/CartoonNormalList';

class Cartoon extends React.Component<{}, { homeInfo: ICartoonHomeRes }> {
  constructor(props: any) {
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
    const { data } = await cartoonHomeInfo();

    console.log(data.result);
    if (data.isOk) {
      this.setState({
        homeInfo: data.result
      });
    }
  }
  /** 查看动漫详情 */
  public toCheckDetail(cartoonInfo: CartoonOtherRecommendInfo) {
    console.log(cartoonInfo);
  }
  render() {
    const { hotCartoonRecommends } = this.state.homeInfo;

    return (
      <div className="Cartoon_Page_Wrapper">
        <CartoonNormalList cartoonList={hotCartoonRecommends} clickHandle={this.toCheckDetail}/>
      </div>
    );
  }
}

export default Cartoon;
