/*
 * @Author: LiuYh
 * @Description: 漫画首页
 * @Date: 2020-07-01 16:34:39
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-09 11:35:10
 */

import React from 'react';
import { CartoonOtherRecommendInfo } from '@typings/cartoon';
import CartoonNormalList from '@components/CartoonNormalList';
import Scroll from '@components/Scroll';
import CartoonCover from '@components/CartoonCover';
import NormalPage from '@components/NormalPage';
import NavTab from '@components/NavTab';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICartoonReduceState } from '@redux/reducers/cartoon';
import {
  requestCartoonHomeInfo,
  requestCartoonDeatilInfo,
  requestSearchCartoon
} from '@redux/actions/cartoon';
import { AppState } from '@redux/reducers';
import { SearchBar } from 'antd-mobile';

type IProps = RouteComponentProps &
  ICartoonReduceState & {
    requestCartoonHomeInfo: typeof requestCartoonHomeInfo;
    requestCartoonDeatilInfo: typeof requestCartoonDeatilInfo;
    requestSearchCartoon: typeof requestSearchCartoon;
  };
class Cartoon extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  readonly state = {
    /** 搜索字符 */
    searchStr: ''
  };

  private serachBarRef = React.createRef<SearchBar>();

  public componentDidMount() {
    this.props.requestCartoonHomeInfo();
  }

  /** 是否展示搜索结果框 */
  get showSeach() {
    return this.state.searchStr !== '' && this.props.searchResultList.length;
  }
  @autobind
  public serachCartoon() {
    const { searchStr } = this.state;

    this.props.requestSearchCartoon({ searchStr });
  }

  /** 查看动漫详情 */
  @autobind
  public toCheckDetail(cartoonInfo: CartoonOtherRecommendInfo) {
    this.props.requestCartoonDeatilInfo(
      { cartoonPath: cartoonInfo.detailHref },
      () => {
        console.log('触发');
        this.props.history.push({
          pathname: 'cartoonDeatil'
        });
      }
    );
  }

  render() {
    const {
      hotCartoonRecommends,
      latestRecommends,
      otherRecommendList,
      searchResultList
    } = this.props;
    const { searchStr } = this.state;

    return (
      <NormalPage showHeader={false} customFooter={<NavTab />} showFooter>
        <div className="Cartoon-Page-Wrapper">
          <SearchBar
            value={searchStr}
            ref={this.serachBarRef}
            placeholder="请输入动漫名称查询"
            onSubmit={(value) => console.log(value, 'onSubmit')}
            onClear={(value) => console.log(value, 'onClear')}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            cancelText="搜索"
            onCancel={this.serachCartoon}
            onChange={(value) => {
              this.setState({
                searchStr: value
              });
            }}
          />
          {!this.showSeach ?
            <Scroll>
              <div className="bbbbbbb">
                <Scroll scrollX scrollY={false} stopPropagation>
                  <div className="aaaaaaa">
                    {hotCartoonRecommends.length &&
                      hotCartoonRecommends.map((cartoonInfo) => {
                        return (
                          <CartoonCover
                            key={cartoonInfo.detailHref}
                            cartoonInfo={cartoonInfo}
                            clickHandle={this.toCheckDetail}
                          />
                        );
                      })}
                  </div>
                </Scroll>
              </div>
              <div></div>
              <CartoonNormalList
                title="最近更新"
                cartoonList={latestRecommends}
                clickHandle={this.toCheckDetail}
              />
              {otherRecommendList.map((otherRecommend) => {
                return (
                  <CartoonNormalList
                    key={otherRecommend.recommend.title}
                    title={otherRecommend.recommend.title}
                    cartoonList={otherRecommend.recommend.recommendList}
                    clickHandle={this.toCheckDetail}
                  />
                );
              })}
            </Scroll> :
            <div className="search-popup">
              <CartoonNormalList
                cartoonList={searchResultList}
                clickHandle={this.toCheckDetail}
              />
            </div>
          }
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.cartoon,
  (dispatch) =>
    bindActionCreators(
      {
        requestCartoonHomeInfo,
        requestCartoonDeatilInfo,
        requestSearchCartoon
      },
      dispatch
    )
)(withRouter(Cartoon));
