/*
 * @Author: LiuYh
 * @Description: 漫画首页
 * @Date: 2020-07-01 16:34:39
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-04 11:15:28
 */

import React from 'react';
import { CartoonOtherRecommendInfo } from '@typings/cartoon';
// import CartoonNormalList from '@components/CartoonNormalList';
// import Scroll from '@components/Scroll';
import Slider from '@components/Slider';
import CartoonCover from '@components/CartoonCover';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { chunk } from 'lodash-es';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICartoonReduceState } from '@redux/reducers/cartoon';
import {
  requestCartoonHomeInfo,
  requestCartoonDeatilInfo
} from '@redux/actions/cartoon';
import { AppState } from '@redux/reducers';

type IProps = RouteComponentProps &
  ICartoonReduceState & {
    requestCartoonHomeInfo: typeof requestCartoonHomeInfo;
    requestCartoonDeatilInfo: typeof requestCartoonDeatilInfo;
  };
class Cartoon extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.requestCartoonHomeInfo();
  }

  /** 查看动漫详情 */
  @autobind
  public toCheckDetail(cartoonInfo: CartoonOtherRecommendInfo) {
    this.props.requestCartoonDeatilInfo(
      { cartoonPath: cartoonInfo.detailHref },
      () => {
        this.props.history.push({
          pathname: 'cartoonDeatil'
        });
      }
    );
  }

  render() {
    const { hotCartoonRecommends } = this.props;

    /** 分割后的热门推荐列表 */
    const hotArr = chunk(hotCartoonRecommends, 3);

    return (
      <div className="Cartoon-Page-Wrapper">
        <Slider loop autoPlay interval={5000} data={hotArr}>
          {hotArr.map((hotArrItem, hotArrItemIndex) => {
            return (
              <div key={Number(new Date()) + hotArrItemIndex} className="test">
                {hotArrItem.map((cartoonInfo) => {
                  return (
                    <CartoonCover
                      key={cartoonInfo.detailHref}
                      cartoonInfo={cartoonInfo}
                      clickHandle={this.toCheckDetail}
                    />
                  );
                })}
              </div>
            );
          })}
        </Slider>
        {/* <Scroll>
          <CartoonNormalList
            cartoonList={hotCartoonRecommends}
            clickHandle={this.toCheckDetail}
          />
        </Scroll> */}
      </div>
    );
  }
}

export default connect(
  (state: AppState) => state.cartoon,
  (dispatch) =>
    bindActionCreators(
      { requestCartoonHomeInfo, requestCartoonDeatilInfo },
      dispatch
    )
)(withRouter(Cartoon));
