import React from 'react';
import { autobind } from 'core-decorators';
import { RouteComponentProps } from 'react-router-dom';
import { cartoonDeatilInfo } from '@services/cartoon';
import {
  CartoonDetail as ICartoonDetail,
  SectionBaseInfo
} from '@typings/cartoon';
import CartoonInfo from '@components/CartoonInfo';
import SectionList from '@components/SectionList';
import Scroll from '@components/Scroll';
import NormalPage from '@components/NormalPage';

type IProps = RouteComponentProps<{ detailPath: string }>;
type TState = {
  cartoonInfo: ICartoonDetail | null;
};

class CartoonDetail extends React.Component<IProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cartoonInfo: null
    };
  }

  public componentDidMount() {
    this.getDeatilInfo();
  }

  /** 获取动漫详情信息 */
  @autobind
  private async getDeatilInfo() {
    const cartoonPath = this.props.match.params.detailPath;
    const { data } = await cartoonDeatilInfo({
      cartoonPath: decodeURIComponent(cartoonPath)
    });

    if (data.isOk) {
      console.log(data.result);
      this.setState({
        cartoonInfo: data.result
      });
    }
  }

  /** 查看章节详情页 */
  @autobind
  private toCheckSection(sectionInfo: SectionBaseInfo) {
    console.log(sectionInfo);
    this.props.history.push({
      pathname: `/sectionDetail/${encodeURIComponent(sectionInfo.sectionHref)}`
    });
  }

  render() {
    const { cartoonInfo } = this.state;

    return (
      <NormalPage>
        <div className="CartoonDetail-Page-Wrapper">
          <CartoonInfo cartoonInfo={cartoonInfo as ICartoonDetail} />
          <Scroll>
            <SectionList
              sectionList={cartoonInfo?.sectionList}
              clickHandle={this.toCheckSection}
            />
          </Scroll>
        </div>
      </NormalPage>
    );
  }
}

export default CartoonDetail;
