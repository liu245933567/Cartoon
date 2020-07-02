import React, { Component } from 'react';
import { SectionInfo } from '@typings/cartoon';
import { RouteComponentProps } from 'react-router-dom';
import { sectionDeatilInfo } from '@services/cartoon';
import NormalPage from '@components/NormalPage';
import Scroll from '@components/Scroll';
import { autobind } from 'core-decorators';

type Props = RouteComponentProps<{ detailPath: string }>;
interface State {
  sectionInfo: SectionInfo | null;
  imageLoadArr: any[];
}

export class SectionDetail extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      sectionInfo: null,
      imageLoadArr: []
    };
  }

  public componentDidMount() {
    const sectionPath = decodeURIComponent(this.props.match.params.detailPath);

    this.getSectionInfo(sectionPath);
  }

  /** 请求章节信息 */
  private async getSectionInfo(sectionPath:string) {
    this.setState({
      sectionInfo: null,
      imageLoadArr: []
    });
    const { data } = await sectionDeatilInfo({ sectionPath });

    if (data.isOk) {
      this.setState({
        sectionInfo: data.result
      });
    }
  }

  /** 跳入下一章 */
  @autobind
  private toNextSection() {
    const nextSectionHref = this.state.sectionInfo?.nextSectionHref;

    if (nextSectionHref) {
      this.getSectionInfo(nextSectionHref);
    }
  }

  render() {
    const { sectionInfo, imageLoadArr } = this.state;

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

export default SectionDetail;
