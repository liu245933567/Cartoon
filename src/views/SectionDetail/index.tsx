import React, { Component } from 'react';
import { SectionInfo } from '@typings/cartoon';
import { RouteComponentProps } from 'react-router-dom';
import NormalPage from '@components/NormalPage';
import Scroll from '@components/Scroll';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ICartoonReduceState } from '@redux/reducers/cartoon';
import { requestCartoonSectionDeatilInfo } from '@redux/actions/cartoon';
import { AppState } from '@redux/reducers';

type Props = RouteComponentProps &
  ICartoonReduceState & {
    requestCartoonSectionDeatilInfo: typeof requestCartoonSectionDeatilInfo;
  };
interface State {
  imageLoadArr: any[];
}

export class SectionDetail extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageLoadArr: []
    };
  }

  /** 跳入下一章 */
  @autobind
  private toNextSection() {
    const nextSectionHref = this.props.sectionInfo?.nextSectionHref;

    if (nextSectionHref) {
      this.props.requestCartoonSectionDeatilInfo({
        sectionPath: nextSectionHref
      });
    }
  }

  render() {
    const { imageLoadArr } = this.state;
    const { sectionInfo } = this.props;

    return (
      <NormalPage
        headerText={sectionInfo ? sectionInfo.sectionTitle : '章节详情'}
      >
        <div className="SectionDetail-Page-Wrapper">
          <Scroll data={imageLoadArr}>
            <div className="section-images-wrapper">
              {sectionInfo?.sectionImages?.map((image) =>
                <img
                  key={image}
                  className="section-image"
                  src={image}
                  onLoad={() => {
                    this.setState({ imageLoadArr: imageLoadArr.concat(['1']) });
                  }}
                />
              )}
            </div>
          </Scroll>
          <div className="next-section" onClick={this.toNextSection} />
        </div>
      </NormalPage>
    );
  }
}

export default connect(
  (state: AppState) => state.cartoon,
  (dispatch) =>
    bindActionCreators({ requestCartoonSectionDeatilInfo }, dispatch)
)(SectionDetail);
