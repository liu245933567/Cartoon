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
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';
type IProps = RouteComponentProps & {};
class Cartoon extends React.Component<IProps, { homeInfo: ICartoonHomeRes }> {
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
  @autobind
  public toCheckDetail(cartoonInfo: CartoonOtherRecommendInfo) {
    console.log(cartoonInfo);
    this.props.history.push({
      pathname: `/cartoonDeatil/${encodeURIComponent(cartoonInfo.detailHref)}`
    });
  }
  render() {
    const { hotCartoonRecommends } = this.state.homeInfo;

    return (
      <div className="Cartoon_Page_Wrapper">
        <CartoonNormalList
          cartoonList={hotCartoonRecommends}
          clickHandle={this.toCheckDetail}
        />
      </div>
    );
  }
}

export default withRouter(Cartoon);
