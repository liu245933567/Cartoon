import React from 'react';
import { autobind } from 'core-decorators';
import { RouteComponentProps } from 'react-router-dom';
import {
  CartoonDetail as ICartoonDetail,
  SectionBaseInfo
} from '@typings/cartoon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICartoonReduceState } from '@redux/reducers/cartoon';
import { requestCartoonSectionDeatilInfo } from '@redux/actions/cartoon';
import { AppState } from '@redux/reducers';
import CartoonInfo from '@components/CartoonInfo';
import SectionList from '@components/SectionList';
import Scroll from '@components/Scroll';
import NormalPage from '@components/NormalPage';

type IProps = RouteComponentProps &
  ICartoonReduceState & {
    requestCartoonSectionDeatilInfo: typeof requestCartoonSectionDeatilInfo;
  };

class CartoonDetail extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  /** 查看章节详情页 */
  @autobind
  private toCheckSection(sectionInfo: SectionBaseInfo) {
    this.props.requestCartoonSectionDeatilInfo(
      { sectionPath: sectionInfo.sectionHref },
      () => {
        this.props.history.push({
          pathname: '/sectionDetail'
        });
      }
    );
  }

  render() {
    const { cartoonDetailInfo } = this.props;

    return (
      <NormalPage headerText={cartoonDetailInfo?.cartoonName}>
        <div className="CartoonDetail-Page-Wrapper">
          <CartoonInfo cartoonInfo={cartoonDetailInfo as ICartoonDetail} />
          <Scroll>
            <SectionList
              sectionList={cartoonDetailInfo?.sectionList}
              clickHandle={this.toCheckSection}
            />
          </Scroll>
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.cartoon,
  (dispatch) =>
    bindActionCreators({ requestCartoonSectionDeatilInfo }, dispatch)
)(CartoonDetail);
